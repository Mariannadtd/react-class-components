import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFormStore } from '../store/formStore';
import { ReactHookFormProfileForm } from './ReactHookFormProfileForm';

const createImage = () => new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });

describe('ReactHookFormProfileForm', () => {
  beforeEach(() => {
    useFormStore.setState({ submissions: [] });
  });

  it('disables submit while live validation has errors', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormProfileForm onSubmitted={vi.fn()} />);

    const submitButton = screen.getByRole('button', { name: 'Submit React Hook Form' });
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByLabelText('Name'), 'anna');

    expect(await screen.findByText('Name must start with an uppercase letter.')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('stores a valid submission', async () => {
    const user = userEvent.setup();
    const onSubmitted = vi.fn();
    render(<ReactHookFormProfileForm onSubmitted={onSubmitted} />);

    await user.type(screen.getByLabelText('Name'), 'Bella');
    await user.type(screen.getByLabelText('Age'), '31');
    await user.type(screen.getByLabelText('Email'), 'bella@example.com');
    await user.click(screen.getByLabelText('Other'));
    await user.upload(screen.getByLabelText('Profile image'), createImage());
    await user.type(screen.getByLabelText('Password'), 'Password1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Password1!');
    await user.type(screen.getByLabelText('Country'), 'Poland');
    await user.click(screen.getByLabelText('I accept Terms and Conditions'));

    const submitButton = screen.getByRole('button', { name: 'Submit React Hook Form' });

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmitted).toHaveBeenCalledTimes(1);
    });

    expect(useFormStore.getState().submissions[0]).toMatchObject({
      name: 'Bella',
      age: 31,
      email: 'bella@example.com',
      source: 'react-hook-form',
      country: 'Poland',
    });
  });

  it('shows image size errors during live validation', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormProfileForm onSubmitted={vi.fn()} />);

    await user.upload(
      screen.getByLabelText('Profile image'),
      new File([new Uint8Array(1024 * 1024 + 1)], 'large.png', { type: 'image/png' }),
    );

    expect(await screen.findByText('Image must be 1 MB or smaller.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit React Hook Form' })).toBeDisabled();
  });
});
