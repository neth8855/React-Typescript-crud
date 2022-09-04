import * as React from 'react';
import Notes from './Notes';
import { Note } from '../models/note.model';

interface INotesListProps {
    note: Note,
    notes: Note[],
    setNote: React.Dispatch<React.SetStateAction<Note>>
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const NotesList: React.FC<INotesListProps> = ({ note, setNote, notes, setNotes }) => {
    const handleDelete = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    }
   
    const renderNotes = ():JSX.Element[] => {
        return notes.map(data => {
            return <Notes key={data.id} data={data} handleDelete={ handleDelete } setNote={ setNote }/>
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
