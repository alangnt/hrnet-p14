# hrnet-p14-modal

An accessible React modal with no dependencies. It replaces the `jquery.modal.js` plugin used in the HRnet application.

- Renders in a portal on `document.body`
- `role="dialog"` and `aria-modal="true"`, with an accessible name
- Closes on Escape, on an overlay click or with the × button (each one can be turned off)
- Moves focus into the modal, keeps it there with Tab, and gives it back to the previous element on close
- Locks body scroll while open
- Ships plain CSS, so no Tailwind or CSS-in-JS is needed

## Installation

```bash
npm install hrnet-p14-modal
```

Peer dependencies: `react` and `react-dom` 18 or newer.

## Usage

```tsx
import { useState } from "react";
import { Modal } from "hrnet-p14-modal";
import "hrnet-p14-modal/style.css";

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Save</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} ariaLabel="Confirmation">
        Employee Created!
      </Modal>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | — | Shows or hides the modal |
| `onClose` | `() => void` | — | Called when the user asks to close it |
| `children` | `ReactNode` | — | Modal content |
| `ariaLabel` | `string` | — | Accessible name of the dialog |
| `ariaLabelledBy` | `string` | — | Id of the element that labels the dialog (takes priority over `ariaLabel`) |
| `closeOnOverlayClick` | `boolean` | `true` | Close when clicking outside the modal |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |
| `showCloseButton` | `boolean` | `true` | Show the × button |
| `className` | `string` | `""` | Extra classes for the modal box |
| `overlayClassName` | `string` | `""` | Extra classes for the overlay |

## Styling

Override the provided classes: `.hrnet-modal-overlay`, `.hrnet-modal`, `.hrnet-modal-close`.

## License

MIT
