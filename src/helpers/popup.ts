export const createPopup = (name: string, tekst: string) =>
  WA.ui.openPopup(name, tekst, [
    {
      label: 'OK',
      className: 'primary',
      callback: (popup) => {
        // Close the popup when the "Close" button is pressed.
        popup.close()
      }
    }
  ])
