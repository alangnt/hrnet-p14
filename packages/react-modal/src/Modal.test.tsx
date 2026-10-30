/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<Modal isOpen={false} onClose={() => {}}>Hello</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders an accessible dialog when open', () => {
    render(<Modal isOpen onClose={() => {}} ariaLabel="Info">Hello</Modal>);
    const dialog = screen.getByRole('dialog', { name: 'Info' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveTextContent('Hello');
  });

  it('closes with the close button, Escape and overlay click', async () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose}>Hello</Modal>);

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByTestId('hrnet-modal-overlay'));
    await userEvent.click(screen.getByRole('dialog'));

    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('respects closeOnEscape and closeOnOverlayClick', async () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} closeOnEscape={false} closeOnOverlayClick={false}>Hello</Modal>);

    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByTestId('hrnet-modal-overlay'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('moves focus into the modal and restores it on close', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(<Modal isOpen onClose={() => {}}>Hello</Modal>);
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();

    rerender(<Modal isOpen={false} onClose={() => {}}>Hello</Modal>);
    expect(trigger).toHaveFocus();
    trigger.remove();
  });
});
