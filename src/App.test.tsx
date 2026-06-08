import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import { useFormStore } from './store/formStore';

describe('App', () => {
  beforeEach(() => {
    useFormStore.setState({ submissions: [] });
  });

  it('opens and closes the uncontrolled form modal', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Open uncontrolled form' }));

    expect(screen.getByRole('dialog', { name: 'Uncontrolled form' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays submissions from the store', () => {
    useFormStore.setState({
      submissions: [
        {
          id: 'submission-1',
          name: 'Mira',
          age: 28,
          email: 'mira@example.com',
          gender: 'female',
          terms: true,
          image: 'data:image/png;base64,aW1hZ2U=',
          country: 'Georgia',
          source: 'react-hook-form',
          createdAt: new Date().toISOString(),
          isNew: true,
        },
      ],
    });

    render(<App />);

    expect(screen.getByText('Mira')).toBeInTheDocument();
    expect(screen.getByText('mira@example.com')).toBeInTheDocument();
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();
  });
});
