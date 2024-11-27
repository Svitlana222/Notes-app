import React, { useState } from "react";
import notesService from "../../services/notesService";

const NoteEditForm = ({ note, onUpdate, onCancel }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedNote = await notesService.updateNote(note.id, { title, content });
            onUpdate(updatedNote);
        } catch (err) {
            console.error("Failed to update note", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Note</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default NoteEditForm;
