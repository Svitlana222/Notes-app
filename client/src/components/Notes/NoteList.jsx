import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ notes, onEdit, onDelete }) => (
    <div className="row">
        {notes.map((note) => (
            <div className="col-md-4" key={note.id}>
                <NoteCard note={note} onEdit={onEdit} onDelete={onDelete} />
            </div>
        ))}
    </div>
);

export default NoteList;
