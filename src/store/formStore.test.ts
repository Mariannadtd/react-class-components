import { beforeEach, describe, expect, it } from 'vitest';
import type { ProfileFormData } from '../types/form';
import { useFormStore } from './formStore';

const profile: ProfileFormData = {
  name: 'Anna',
  age: 24,
  email: 'anna@example.com',
  gender: 'female',
  terms: true,
  image: 'data:image/png;base64,aW1hZ2U=',
  password: 'Password1!',
  confirmPassword: 'Password1!',
  country: 'Canada',
};

describe('formStore', () => {
  beforeEach(() => {
    useFormStore.setState({ submissions: [] });
  });

  it('stores submissions and keeps the newest item first', () => {
    const firstId = useFormStore.getState().addSubmission(profile, 'uncontrolled');
    const secondId = useFormStore.getState().addSubmission(
      { ...profile, name: 'Bella' },
      'react-hook-form',
    );

    const submissions = useFormStore.getState().submissions;

    expect(submissions).toHaveLength(2);
    expect(submissions[0]).toMatchObject({
      id: secondId,
      name: 'Bella',
      source: 'react-hook-form',
      isNew: true,
    });
    expect(submissions[1].id).toBe(firstId);
    expect(submissions[0]).not.toHaveProperty('password');
  });

  it('marks a submission as seen', () => {
    const id = useFormStore.getState().addSubmission(profile, 'uncontrolled');

    useFormStore.getState().markSubmissionAsSeen(id);

    expect(useFormStore.getState().submissions[0].isNew).toBe(false);
  });

  it('does not mark other submissions as seen', () => {
    const firstId = useFormStore.getState().addSubmission(profile, 'uncontrolled');
    useFormStore.getState().addSubmission({ ...profile, name: 'Bella' }, 'react-hook-form');

    useFormStore.getState().markSubmissionAsSeen(firstId);

    const submissions = useFormStore.getState().submissions;
    expect(submissions[0].isNew).toBe(true);
    expect(submissions[1].isNew).toBe(false);
  });
});
