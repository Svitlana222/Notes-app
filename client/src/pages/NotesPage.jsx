import React, { useEffect, useState } from "react";
import notesService from "../services/notesService";
import NoteCard from "../components/Notes/NoteCard";
import NoteForm from "../components/Notes/NoteForm";
import Modal from "../components/Modal/Modal";

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Завантаження нотатків
    const fetchNotes = async () => {
        try {
            const fetchedNotes = await notesService.getNotes();
            setNotes(fetchedNotes);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // Додавання нової нотатки
    const handleCreate = async (note) => {
        try {
            await notesService.createNote(note);
            fetchNotes();
        } catch (error) {
            console.error("Failed to create note:", error);
        }
    };

    // Редагування нотатки
    const handleEdit = async (note) => {
        try {
            await notesService.updateNote(note.id, note);
            fetchNotes();
            closeEditModal();
        } catch (error) {
            console.error("Failed to update note:", error);
        }
    };

    // Видалення нотатки
    const handleDelete = async (id) => {
        try {
            await notesService.deleteNote(id);
            fetchNotes();
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    // Відкрити модальне вікно для редагування
    const openEditModal = (note) => {
        setEditingNote(note);
        setIsModalOpen(true);
    };

    // Закрити модальне вікно
    const closeEditModal = () => {
        setEditingNote(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container my-4">
            <h1 className="text-center">My Notes</h1>
            <NoteForm onSubmit={handleCreate} />

            <div className="row mt-4">
                {notes.map((note) => (
                    <div key={note.id} className="col-md-4 mb-4">
                        <NoteCard
                            note={note}
                            onEdit={() => openEditModal(note)}
                            onDelete={() => handleDelete(note.id)}
                        />
                    </div>
                ))}
            </div>

            {/* Модальне вікно для редагування */}
            <Modal isOpen={isModalOpen} onClose={closeEditModal}>
                {editingNote && (
                    <NoteForm
                        initialData={editingNote}
                        onSubmit={handleEdit}
                        onCancel={closeEditModal}
                    />
                )}
            </Modal>
        </div>
    );
};

export default NotesPage;
