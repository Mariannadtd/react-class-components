import { describe, expect, it } from 'vitest';
import {
  MAX_IMAGE_SIZE_BYTES,
  fileToBase64,
  getPasswordStrength,
  isAllowedImageSize,
  isAllowedImageType,
  isBasicEmailValid,
} from './formUtils';

describe('formUtils', () => {
  it('validates basic email structure without strict pattern matching', () => {
    expect(isBasicEmailValid('anna@example.com')).toBe(true);
    expect(isBasicEmailValid('annaexample.com')).toBe(false);
    expect(isBasicEmailValid('anna@@example.com')).toBe(false);
    expect(isBasicEmailValid('@example.com')).toBe(false);
    expect(isBasicEmailValid('anna@example')).toBe(false);
    expect(isBasicEmailValid('anna@example.')).toBe(false);
  });

  it('checks password strength requirements', () => {
    expect(getPasswordStrength('Password1!')).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecialCharacter: true,
    });

    expect(getPasswordStrength('password')).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: true,
      hasSpecialCharacter: false,
    });
  });

  it('validates image file type and size', () => {
    const image = new File(['image'], 'avatar.png', { type: 'image/png' });
    const jpeg = new File(['image'], 'avatar.jpg', { type: 'image/jpeg' });
    const text = new File(['text'], 'notes.txt', { type: 'text/plain' });
    const missingExtension = new File(['image'], 'avatar', { type: 'image/png' });
    const largeImage = new File([new Uint8Array(MAX_IMAGE_SIZE_BYTES + 1)], 'large.png', {
      type: 'image/png',
    });

    expect(isAllowedImageType(image)).toBe(true);
    expect(isAllowedImageType(jpeg)).toBe(true);
    expect(isAllowedImageType(text)).toBe(false);
    expect(isAllowedImageType(missingExtension)).toBe(false);
    expect(isAllowedImageSize(image)).toBe(true);
    expect(isAllowedImageSize(largeImage)).toBe(false);
  });

  it('converts a file to base64 data url', async () => {
    const image = new File(['image'], 'avatar.png', { type: 'image/png' });

    await expect(fileToBase64(image)).resolves.toContain('data:image/png;base64,');
  });
});
