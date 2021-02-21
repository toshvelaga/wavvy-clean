import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { getDescription } from "../../store/actions/actions";
import "./TextEditor.css";

// CKEditor: https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html

class TextEditor extends Component {
  render() {
    return (
      <div className="text-editor-container">
        <label
          style={{ display: "block", marginBottom: "8px", color: "black" }}
          className="label"
          htmlFor="description"
        >
          Description
        </label>
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: [
              "|",
              "bold",
              "italic",
              "link",
              "numberedList",
              "bulletedList",
              "|",
              "undo",
              "redo",
            ],
          }}
          // data={"<p>Create a description for your podcast...</p>"}
          data={this.props.data}
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            this.props.getTextEditorData(data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTextEditorData: (description) => dispatch(getDescription(description)),
});

export default connect(null, mapDispatchToProps)(TextEditor);
