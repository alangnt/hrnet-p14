import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  /** Whether the modal is displayed */
  isOpen: boolean;
  /** Called when the user asks to close the modal (close button, Escape key, overlay click) */
  onClose: () => void;
  children: ReactNode;
  /** Accessible name of the dialog, used when no `ariaLabelledBy` is provided */
  ariaLabel?: string;
  /** Id of the element labelling the dialog */
  ariaLabelledBy?: string;
  /** Close when clicking outside the modal (default: true) */
  closeOnOverlayClick?: boolean;
  /** Close when pressing Escape (default: true) */
  closeOnEscape?: boolean;
  /** Display the × close button (default: true) */
  showCloseButton?: boolean;
  /** Extra class names for the modal box */
  className?: string;
  /** Extra class names for the overlay */
  overlayClassName?: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel,
  ariaLabelledBy,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = "",
  overlayClassName = "",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const modal = modalRef.current;
    const firstFocusable = modal?.querySelector<HTMLElement>(FOCUSABLE);
    (firstFocusable ?? modal)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && closeOnEscape) {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      // Keep focus inside the modal
      if (event.key === "Tab" && modal) {
        const focusables = Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, closeOnEscape]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`hrnet-modal-overlay ${overlayClassName}`.trim()}
      data-testid="hrnet-modal-overlay"
      onMouseDown={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabelledBy ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledBy}
        tabIndex={-1}
        className={`hrnet-modal ${className}`.trim()}
      >
        {showCloseButton && (
          <button type="button" aria-label="Close" className="hrnet-modal-close" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
