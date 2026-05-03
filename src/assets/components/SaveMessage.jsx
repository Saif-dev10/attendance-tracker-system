export function SaveMessage({ showMessage }) {
  if (!showMessage) {
    return null;
  }

  return (
    <div className="popup-message save-message js-save-message">
      ✅ Configuration Saved Successfully!
    </div>
  );
}