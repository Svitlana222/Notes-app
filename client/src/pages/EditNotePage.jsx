import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NoteEditForm from "../components/Notes/NoteEditForm";

const EditNotePage = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);

    const fetchNote = async () => {
        const fetchedNote = { id, title: "Example Title", content: "Example Content" };
        setNote(fetchedNote);
    };

    useState(() => {
        fetchNote();
    }, [id]);

    if (!note) return <p>Loading...</p>;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "32rem" }}>
                <h1 className="text-center">Edit Note</h1>
                <NoteEditForm note={note} onUpdate={() => {}} onCancel={() => {}} />
            </div>
        </div>
    );
};

export default EditNotePage;
