import React from "react";

const NoteCard = ({ note, onEdit, onDelete }) => (
    <div className="card shadow-sm mb-4">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.content}</p>
            <button className="btn btn-warning me-2" onClick={() => onEdit(note)}>
                Редагувати
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(note.id)}>
                Видалити
            </button>
        </div>
    </div>
);

export default NoteCard;
