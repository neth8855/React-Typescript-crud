import * as React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Note } from '../models/note.model';

interface INotesProps {
    data: Note,
    setNote: React.Dispatch<React.SetStateAction<Note>>,
    handleDelete: (id: string) => void 
}

const Notes: React.FC<INotesProps> = ({data, setNote, handleDelete}) => {
    return (
        <div className="mb-3">
            <Card style={{backgroundColor: data.color}}>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.text}</Card.Text>
                    <Card.Subtitle className="text-muted">{ data.date}</Card.Subtitle>
                    <Button className="mt-3" variant="danger" onClick={ () => handleDelete(data.id)}>Delete</Button>
                    <Button className="mt-3" variant="success" onClick={ () => setNote(data)}>Edit</Button>
                </Card.Body>
            </Card>
            </div>
  );
};

export default Notes;
