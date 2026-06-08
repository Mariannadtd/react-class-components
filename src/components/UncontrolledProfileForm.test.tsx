import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFormStore } from '../store/formStore';
import { UncontrolledProfileForm } from './UncontrolledProfileForm';

const createImage = () => new File(['avatar'], 'avatar.png', { type: 'image/png' });

describe('UncontrolledProfileForm', () => {
  beforeEach(() => {
    useFormStore.setState({ submissions: [] });
  });

  it('validates only after submit', async () => {
    const user = userEvent.setup();
    render(<UncontrolledProfileForm onSubmitted={vi.fn()} />);

    expect(screen.queryByText('Name is required.')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Submit uncontrolled form' }));

    expect(await screen.findByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Image is required.')).toBeInTheDocument();
    expect(screen.getByText('You must accept Terms and Conditions.')).toBeInTheDocument();
  });

  it('stores a valid submission', async () => {
    const user = userEvent.setup();
    const onSubmitted = vi.fn();
    render(<UncontrolledProfileForm onSubmitted={onSubmitted} />);

    await user.type(screen.getByLabelText('Name'), 'Anna');
    await user.type(screen.getByLabelText('Age'), '24');
    await user.type(screen.getByLabelText('Email'), 'anna@example.com');
    await user.click(screen.getByLabelText('Female'));
    await user.upload(screen.getByLabelText('Profile image'), createImage());
    await user.type(screen.getByLabelText('Password'), 'Password1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Password1!');
    await user.type(screen.getByLabelText('Country'), 'Canada');
    await user.click(screen.getByLabelText('I accept Terms and Conditions'));
    await user.click(screen.getByRole('button', { name: 'Submit uncontrolled form' }));

    await waitFor(() => {
      expect(onSubmitted).toHaveBeenCalledTimes(1);
    });

    const [submission] = useFormStore.getState().submissions;
    expect(submission).toMatchObject({
      name: 'Anna',
      age: 24,
      email: 'anna@example.com',
      source: 'uncontrolled',
      country: 'Canada',
    });
    expect(submission.image).toContain('data:image/png;base64,');
  });
});
