export type Gender = 'female' | 'male' | 'other';

export type FormSource = 'uncontrolled' | 'react-hook-form';

export type PasswordStrength = {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecialCharacter: boolean;
};

export type ProfileFormData = {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  terms: boolean;
  image: string;
  password: string;
  confirmPassword: string;
  country: string;
};

export type Submission = Omit<ProfileFormData, 'password' | 'confirmPassword'> & {
  id: string;
  source: FormSource;
  createdAt: string;
  isNew: boolean;
};
