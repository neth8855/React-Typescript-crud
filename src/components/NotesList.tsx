import * as React from 'react';
import Notes from './Notes';
import { Note } from '../models/note.model';

interface INotesListProps {
    notes: Note[],
    setNote: React.Dispatch<React.SetStateAction<Note>>
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const NotesList: React.FC<INotesListProps> = ({ setNote, notes, setNotes }) => {
    const handleDelete = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    }
    const handleEdit = (note: Note) => {
        setNote(note);
    }
   
    const renderNotes = ():JSX.Element[] => {
        return notes.map(note => {
            return <Notes key={note.id} note={note} handleDelete={ handleDelete } handleEdit={ handleEdit } />
        })
    }
    return (
        <>
            <h2 className="mt-3">Notes</h2>
            <div>{ renderNotes() }</div>
        </>
  );
};

export default NotesList;
