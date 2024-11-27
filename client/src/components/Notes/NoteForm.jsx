import React, { useState, useEffect } from "react";

const NoteForm = ({ initialData = null, onSubmit, onCancel }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id: initialData?.id, title, content });
        setTitle("");
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">
                    Content
                </label>
                <textarea
                    className="form-control"
                    id="content"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {initialData ? "Update Note" : "Create Note"}
            </button>
            {onCancel && (
                <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default NoteForm;
