import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react';
import { useFormStore } from '../store/formStore';
import { fileToBase64, isAllowedImageSize, isAllowedImageType } from '../utils/formUtils';
import { collectZodErrors, type FormErrors } from '../utils/validationErrors';
import { createProfileSchema } from '../validation/profileSchema';
import { FieldError } from './FieldError';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

type UncontrolledProfileFormProps = {
  onSubmitted: (id: string) => void;
};

const genders = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Other', value: 'other' },
] as const;

const getTextField = (formData: FormData, fieldName: string) =>
  String(formData.get(fieldName) ?? '').trim();

const getImageData = async (form: HTMLFormElement) => {
  const input = form.elements.namedItem('imageFile');

  if (!(input instanceof HTMLInputElement)) {
    return { image: '', error: 'Image is required.' };
  }

  const file = input.files?.[0];

  if (!file) {
    return { image: '', error: 'Image is required.' };
  }

  if (!isAllowedImageType(file)) {
    return { image: '', error: 'Image must be PNG or JPEG.' };
  }

  if (!isAllowedImageSize(file)) {
    return { image: '', error: 'Image must be 1 MB or smaller.' };
  }

  return { image: await fileToBase64(file), error: undefined };
};

export const UncontrolledProfileForm = ({ onSubmitted }: UncontrolledProfileFormProps) => {
  const countries = useFormStore((state) => state.countries);
  const addSubmission = useFormStore((state) => state.addSubmission);
  const schema = useMemo(() => createProfileSchema({ countries }), [countries]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const imageResult = await getImageData(form);
    const result = schema.safeParse({
      name: getTextField(formData, 'name'),
      age: getTextField(formData, 'age'),
      email: getTextField(formData, 'email'),
      gender: getTextField(formData, 'gender'),
      terms: formData.get('terms') === 'on',
      image: imageResult.image,
      password: getTextField(formData, 'password'),
      confirmPassword: getTextField(formData, 'confirmPassword'),
      country: getTextField(formData, 'country'),
    });

    if (!result.success || imageResult.error) {
      setErrors({
        ...(!result.success ? collectZodErrors(result.error.issues) : {}),
        ...(imageResult.error ? { image: imageResult.error } : {}),
      });
      setIsSubmitting(false);
      return;
    }

    const id = addSubmission(result.data, 'uncontrolled');
    form.reset();
    setErrors({});
    setPassword('');
    setIsSubmitting(false);
    onSubmitted(id);
  };

  return (
    <form className="profile-form" noValidate onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field" htmlFor="uncontrolled-name">
          <span>Name</span>
          <input
            aria-describedby="uncontrolled-name-error"
            id="uncontrolled-name"
            name="name"
            type="text"
          />
          <FieldError id="uncontrolled-name-error" message={errors.name} />
        </label>

        <label className="field" htmlFor="uncontrolled-age">
          <span>Age</span>
          <input
            aria-describedby="uncontrolled-age-error"
            id="uncontrolled-age"
            min="0"
            name="age"
            type="number"
          />
          <FieldError id="uncontrolled-age-error" message={errors.age} />
        </label>
      </div>

      <label className="field" htmlFor="uncontrolled-email">
        <span>Email</span>
        <input
          aria-describedby="uncontrolled-email-error"
          id="uncontrolled-email"
          name="email"
          type="email"
        />
        <FieldError id="uncontrolled-email-error" message={errors.email} />
      </label>

      <fieldset className="field-set" aria-describedby="uncontrolled-gender-error">
        <legend>Gender</legend>
        <div className="choice-row">
          {genders.map((gender) => (
            <label className="choice" htmlFor={`uncontrolled-gender-${gender.value}`} key={gender.value}>
              <input
                id={`uncontrolled-gender-${gender.value}`}
                name="gender"
                type="radio"
                value={gender.value}
              />
              <span>{gender.label}</span>
            </label>
          ))}
        </div>
        <FieldError id="uncontrolled-gender-error" message={errors.gender} />
      </fieldset>

      <label className="field" htmlFor="uncontrolled-image">
        <span>Profile image</span>
        <input
          accept="image/png,image/jpeg"
          aria-describedby="uncontrolled-image-error"
          id="uncontrolled-image"
          name="imageFile"
          type="file"
        />
        <FieldError id="uncontrolled-image-error" message={errors.image} />
      </label>

      <div className="form-grid">
        <label className="field" htmlFor="uncontrolled-password">
          <span>Password</span>
          <input
            aria-describedby="uncontrolled-password-error"
            id="uncontrolled-password"
            name="password"
            onChange={handlePasswordChange}
            type="password"
          />
          <FieldError id="uncontrolled-password-error" message={errors.password} />
        </label>

        <label className="field" htmlFor="uncontrolled-confirm-password">
          <span>Confirm password</span>
          <input
            aria-describedby="uncontrolled-confirm-password-error"
            id="uncontrolled-confirm-password"
            name="confirmPassword"
            type="password"
          />
          <FieldError id="uncontrolled-confirm-password-error" message={errors.confirmPassword} />
        </label>
      </div>

      <PasswordStrengthIndicator password={password} />

      <label className="field" htmlFor="uncontrolled-country">
        <span>Country</span>
        <input
          aria-describedby="uncontrolled-country-error"
          id="uncontrolled-country"
          list="uncontrolled-countries"
          name="country"
          type="text"
        />
        <datalist id="uncontrolled-countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <FieldError id="uncontrolled-country-error" message={errors.country} />
      </label>

      <label className="terms" htmlFor="uncontrolled-terms">
        <input
          aria-describedby="uncontrolled-terms-error"
          id="uncontrolled-terms"
          name="terms"
          type="checkbox"
        />
        <span>I accept Terms and Conditions</span>
      </label>
      <FieldError id="uncontrolled-terms-error" message={errors.terms} />

      <button className="primary-button" disabled={isSubmitting} type="submit">
        Submit uncontrolled form
      </button>
    </form>
  );
};
