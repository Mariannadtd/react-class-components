import type { PasswordStrength } from '../types/form';

export const MAX_IMAGE_SIZE_BYTES = 1024 * 1024;

export const isBasicEmailValid = (email: string): boolean => {
  const parts = email.split('@');

  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  if (!localPart || !domain) {
    return false;
  }

  return domain.includes('.') && !domain.startsWith('.') && !domain.endsWith('.');
};

export const getPasswordStrength = (password: string): PasswordStrength => ({
  hasNumber: password.split('').some((character) => character >= '0' && character <= '9'),
  hasUppercase: password.split('').some((character) => character >= 'A' && character <= 'Z'),
  hasLowercase: password.split('').some((character) => character >= 'a' && character <= 'z'),
  hasSpecialCharacter: password.split('').some((character) => !/[A-Za-z0-9]/.test(character)),
});

export const isAllowedImageType = (file: File): boolean =>
  (file.type === 'image/png' || file.type === 'image/jpeg') &&
  (file.name.toLowerCase().endsWith('.png') ||
    file.name.toLowerCase().endsWith('.jpg') ||
    file.name.toLowerCase().endsWith('.jpeg'));

export const isAllowedImageSize = (file: File): boolean => file.size <= MAX_IMAGE_SIZE_BYTES;

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
        return;
      }

      reject(new Error('Could not convert file to base64.'));
    });

    reader.addEventListener('error', () => {
      reject(new Error('Could not read file.'));
    });

    reader.readAsDataURL(file);
  });
