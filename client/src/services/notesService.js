import API from "./api";

const getNotes = async () => {
    const { data } = await API.get("/notes");
    return data;
};

const createNote = async (note) => {
    const { data } = await API.post("/notes", note);
    return data;
};

const updateNote = async (id, note) => {
    try {
        const { data } = await API.put(`/notes/${id}`, {
            id: id,             
            title: note.title,  
            content: note.content, 
        });
        return data;
    } catch (error) {
        console.error('Error updating note:', error);
        throw error; 
    }
};



const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
};

const notesService = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
};

export default notesService;
