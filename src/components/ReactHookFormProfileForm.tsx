import { zodResolver } from '@hookform/resolvers/zod';
import { type ChangeEvent, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useFormStore } from '../store/formStore';
import { fileToBase64, isAllowedImageSize, isAllowedImageType } from '../utils/formUtils';
import {
  createProfileSchema,
  type ProfileSchemaData,
  type ProfileSchemaInput,
} from '../validation/profileSchema';
import { FieldError } from './FieldError';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

type ReactHookFormProfileFormProps = {
  onSubmitted: (id: string) => void;
};

const defaultValues: Partial<ProfileSchemaInput> = {
  name: '',
  age: '',
  email: '',
  terms: false,
  image: '',
  password: '',
  confirmPassword: '',
  country: '',
};

const genders = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Other', value: 'other' },
] as const;

export const ReactHookFormProfileForm = ({ onSubmitted }: ReactHookFormProfileFormProps) => {
  const countries = useFormStore((state) => state.countries);
  const addSubmission = useFormStore((state) => state.addSubmission);
  const schema = useMemo(() => createProfileSchema({ countries }), [countries]);
  const [imageError, setImageError] = useState('');

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
    control,
  } = useForm<ProfileSchemaInput, undefined, ProfileSchemaData>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const password = String(useWatch({ control, name: 'password' }) ?? '');

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageError('');
    setValue('image', '', { shouldDirty: true, shouldValidate: true });

    if (!file) {
      await trigger('image');
      return;
    }

    if (!isAllowedImageType(file)) {
      setImageError('Image must be PNG or JPEG.');
      await trigger('image');
      return;
    }

    if (!isAllowedImageSize(file)) {
      setImageError('Image must be 1 MB or smaller.');
      await trigger('image');
      return;
    }

    const image = await fileToBase64(file);
    setValue('image', image, { shouldDirty: true, shouldValidate: true });
    await trigger('image');
  };

  const submitForm = (data: ProfileSchemaData) => {
    const id = addSubmission(data, 'react-hook-form');
    reset(defaultValues);
    setImageError('');
    onSubmitted(id);
  };

  return (
    <form className="profile-form" noValidate onSubmit={handleSubmit(submitForm)}>
      <div className="form-grid">
        <label className="field" htmlFor="rhf-name">
          <span>Name</span>
          <input
            aria-describedby="rhf-name-error"
            id="rhf-name"
            type="text"
            {...register('name')}
          />
          <FieldError id="rhf-name-error" message={errors.name?.message} />
        </label>

        <label className="field" htmlFor="rhf-age">
          <span>Age</span>
          <input
            aria-describedby="rhf-age-error"
            id="rhf-age"
            min="0"
            type="number"
            {...register('age')}
          />
          <FieldError id="rhf-age-error" message={errors.age?.message} />
        </label>
      </div>

      <label className="field" htmlFor="rhf-email">
        <span>Email</span>
        <input
          aria-describedby="rhf-email-error"
          id="rhf-email"
          type="email"
          {...register('email')}
        />
        <FieldError id="rhf-email-error" message={errors.email?.message} />
      </label>

      <fieldset className="field-set" aria-describedby="rhf-gender-error">
        <legend>Gender</legend>
        <div className="choice-row">
          {genders.map((gender) => (
            <label className="choice" htmlFor={`rhf-gender-${gender.value}`} key={gender.value}>
              <input
                id={`rhf-gender-${gender.value}`}
                type="radio"
                value={gender.value}
                {...register('gender')}
              />
              <span>{gender.label}</span>
            </label>
          ))}
        </div>
        <FieldError id="rhf-gender-error" message={errors.gender?.message} />
      </fieldset>

      <label className="field" htmlFor="rhf-image">
        <span>Profile image</span>
        <input
          accept="image/png,image/jpeg"
          aria-describedby="rhf-image-error"
          id="rhf-image"
          type="file"
          onChange={handleImageChange}
        />
        <FieldError id="rhf-image-error" message={imageError || errors.image?.message} />
      </label>

      <div className="form-grid">
        <label className="field" htmlFor="rhf-password">
          <span>Password</span>
          <input
            aria-describedby="rhf-password-error"
            id="rhf-password"
            type="password"
            {...register('password')}
          />
          <FieldError id="rhf-password-error" message={errors.password?.message} />
        </label>

        <label className="field" htmlFor="rhf-confirm-password">
          <span>Confirm password</span>
          <input
            aria-describedby="rhf-confirm-password-error"
            id="rhf-confirm-password"
            type="password"
            {...register('confirmPassword')}
          />
          <FieldError id="rhf-confirm-password-error" message={errors.confirmPassword?.message} />
        </label>
      </div>

      <PasswordStrengthIndicator password={password} />

      <label className="field" htmlFor="rhf-country">
        <span>Country</span>
        <input
          aria-describedby="rhf-country-error"
          id="rhf-country"
          list="rhf-countries"
          type="text"
          {...register('country')}
        />
        <datalist id="rhf-countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <FieldError id="rhf-country-error" message={errors.country?.message} />
      </label>

      <label className="terms" htmlFor="rhf-terms">
        <input
          aria-describedby="rhf-terms-error"
          id="rhf-terms"
          type="checkbox"
          {...register('terms')}
        />
        <span>I accept Terms and Conditions</span>
      </label>
      <FieldError id="rhf-terms-error" message={errors.terms?.message} />

      <button
        className="primary-button"
        disabled={!isValid || Boolean(imageError) || isSubmitting}
        type="submit"
      >
        Submit React Hook Form
      </button>
    </form>
  );
};
