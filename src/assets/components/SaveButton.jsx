export function SaveButton({ onSave }) {

  return (
    <>
      <button 
        className="save-button js-button" 
        onClick={onSave}
      >
       
        <span className="button-icon">💾</span>
        Save Configuration
      </button>
    </>
  );
}