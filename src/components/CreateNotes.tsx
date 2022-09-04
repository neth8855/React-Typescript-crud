import React from 'react';
import Button from 'react-bootstrap/Button'
import { Note } from '../models/note.model';
import { Alert, Form } from 'react-bootstrap';

interface ICreateNotesProps {
    note: Note,
    notes: Note[],
    setNote: React.Dispatch<React.SetStateAction<Note>>
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const CreateNotes: React.FunctionComponent<ICreateNotesProps> = ({note, setNote, notes, setNotes}) => {
    const [error, setError] = React.useState<string>("");
    const titleRef = React.useRef<HTMLInputElement | null>(null);
    const textRef = React.useRef<HTMLTextAreaElement | null>(null);
    const colorRef = React.useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (titleRef.current?.value === "" || textRef.current?.value === "") {
            return setError("All fields are mandatory");
        }
        
        if(note.id === undefined || note.id === null || note.id === ""){
            // add
            setError("");
            setNotes([...notes, {
                id: (new Date()).toString(),
                title: (titleRef.current as HTMLInputElement).value,
                text: (textRef.current as HTMLTextAreaElement).value,
                color: (colorRef.current as HTMLInputElement).value,
                date: (new Date()).toString()
            }]);
            
            (titleRef.current as HTMLInputElement).value = "";
            (textRef.current as HTMLTextAreaElement).value = ""; 

        }else {
            // edit
            setError("");
            
            setNotes(notes.map(data => {
                return data.id === note.id ? note : data
            })); 
            
            (titleRef.current as HTMLInputElement).value = "";
            (textRef.current as HTMLTextAreaElement).value = ""; 

        }
        
        setNote({
            id: "",
            title: "",
            text: "",
            color: "",
            date: "",
        })

    }

    return (
        <>
            <h2>Create Notes: {note.id}</h2>
            {error && <Alert variant="danger">{ error}</Alert>}
            <Form className="mt-3 mb-3" onSubmit={(e) => handleSubmit(e) }>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title for the Note" ref={ titleRef } value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value }) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control placeholder="Enter your notes" as="textarea" rows={3} ref={ textRef } value={note.text} onChange={(e) => setNote({ ...note, text: e.target.value }) }/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="colorInput">Notes Color</Form.Label>
                    <Form.Control type="color" id="colorInput" defaultValue="#dfdfdf" title="Choose your color" ref={ colorRef }  value={note.color} onChange={(e) => setNote({ ...note, color: e.target.value }) }/>
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
        </>
  );
};

export default CreateNotes;
