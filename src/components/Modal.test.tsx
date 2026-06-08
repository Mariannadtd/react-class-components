import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { Modal } from './Modal';

const ModalHost = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button">
        Open modal
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title="Example modal">
          <button type="button">First action</button>
          <button type="button">Last action</button>
        </Modal>
      )}
    </>
  );
};

describe('Modal', () => {
  it('renders through a portal, closes with Escape, and restores focus', async () => {
    const user = userEvent.setup();
    render(<ModalHost />);

    const trigger = screen.getByRole('button', { name: 'Open modal' });
    await user.click(trigger);

    expect(screen.getByRole('dialog', { name: 'Example modal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close modal' })).toHaveFocus();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });

  it('closes when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    render(<ModalHost />);

    await user.click(screen.getByRole('button', { name: 'Open modal' }));

    const backdrop = document.querySelector('.modal-backdrop');

    if (!(backdrop instanceof HTMLElement)) {
      throw new Error('Backdrop was not rendered.');
    }

    await user.click(backdrop);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps tab focus inside the dialog', async () => {
    const user = userEvent.setup();
    render(<ModalHost />);

    await user.click(screen.getByRole('button', { name: 'Open modal' }));
    await user.tab({ shift: true });

    expect(screen.getByRole('button', { name: 'Last action' })).toHaveFocus();
  });
});
