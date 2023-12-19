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
    // Adjust the size of the sticky note based on textarea content
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    // Set the initial width and minimum height of the sticky note
    const initialWidth = 200;
    const minHeight = 200;
    stickyNoteRef.current.style.width = initialWidth + "px";

    // Update the sticky note's height based on the textarea content
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
      <div
        className="sticky-note-header"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div>Sticky Note</div>
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
  );
}
