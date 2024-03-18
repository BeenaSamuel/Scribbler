
import React, { useState } from "react";
import { Editor } from "primereact/editor";

export default function TextEditor() {
    const [text, setText] = useState('<div>Enter your content here</div>');

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };

    const header = renderHeader();

    return (
        <div className="card" >
            <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} headerTemplate={header} style={{ height: '320px' }} />
        </div>
    )
}
        