import React, { useState, useRef, useEffect } from "react";
import "./drawingArea.css";

export default function StickyNote({ onClose }) {
  const [allowMove, setAllowMove] = useState(false);
  const stickyNoteRef = useRef();
  const textareaRef = useRef();

  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  useEffect(() => {

    adjustStickyNoteSize();
  }, []);

  function handleMouseDown(e) {
    setAllowMove(true);
    const dimensions = stickyNoteRef.current.getBoundingClientRect();
    setDx(e.clientX - dimensions.x);
    setDy(e.clientY - dimensions.y);
  }

  function handleMouseMove(e) {
    if (allowMove) {
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNoteRef.current.style.left = x + "px";
      stickyNoteRef.current.style.top = y + "px";
    }
  }

  function handleMouseUp() {
    setAllowMove(false);
  }

  function adjustStickyNoteSize() {
     
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    
    const initialWidth = 200;
    const minHeight = 200;
    stickyNoteRef.current.style.width = initialWidth + "px";

     
    let height = textarea.scrollHeight;
    if (height < minHeight) {
      height = minHeight;
    }
    stickyNoteRef.current.style.height = height + "px";
  }

  return (
    <div
      className="sticky-note"
      ref={stickyNoteRef}
      onMouseMove={handleMouseMove}
    >
      
      <div>
      <div
        className="sticky-note-header"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* <h6>Sticky Note</h6> */}
        <div className="close" onClick={onClose}>
          &times;
        </div>
      </div>
      
        <textarea
          ref={textareaRef}
          onInput={adjustStickyNoteSize}
          placeholder="Type here..."
        ></textarea>
      </div>

    </div>
  );
}
