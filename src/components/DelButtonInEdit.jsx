import React from "react";
function DelButtonInEdit(props) {
  return (
    <div>
      <div className="members-line_line" />
      <div onClick={props.clickDel} className="delete-line">
        <div className="nmeet-container nmeet-container_delete">
          <a className="delete_button">Удалить встречу</a>
        </div>
      </div>
      <div className="members-line_line" />
    </div>
  );
}
export default DelButtonInEdit;
