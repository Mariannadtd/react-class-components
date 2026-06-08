import type { ZodIssue } from 'zod';
import type { ProfileFormData } from '../types/form';

const profileFields = [
  'name',
  'age',
  'email',
  'gender',
  'terms',
  'image',
  'password',
  'confirmPassword',
  'country',
] as const satisfies readonly (keyof ProfileFormData)[];

type ProfileField = (typeof profileFields)[number];

export type FormErrors = Partial<Record<ProfileField, string>>;

const isProfileField = (field: unknown): field is ProfileField =>
  typeof field === 'string' && (profileFields as readonly string[]).includes(field);

export const collectZodErrors = (issues: ZodIssue[]): FormErrors =>
  issues.reduce<FormErrors>((errors, issue) => {
    const field = issue.path[0];

    if (isProfileField(field) && !errors[field]) {
      return { ...errors, [field]: issue.message };
    }

    return errors;
  }, {});
