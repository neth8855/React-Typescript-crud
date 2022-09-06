import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { Note } from '../models/note.model';
import { Alert, Form } from 'react-bootstrap';

interface ICreateNotesProps {
    note: Note,
    notes: Note[],
    setNote: React.Dispatch<React.SetStateAction<Note>>
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const CreateNotes: React.FC<ICreateNotesProps> = ({note, setNote, notes, setNotes}) => {
    const [ error, setError ] = React.useState<string>(""); 
    const [ title, setTitle ] = useState<string>("");
    const [ text, setText ] = useState<string>("");
    const [ color, setColor ] = useState<string>("#dfdfdf");

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (title === "" || text === "") {
            return setError("All fields are mandatory");
        }
        
        if(note.id === undefined || note.id === null || note.id === ""){
            // add
            setNotes([...notes, {
                id: (new Date()).toString(),
                title: title,
                text: text,
                color: color,
                date: (new Date()).toString()
            }]);

        }else {
            // edit            
            setNotes(notes.map(data => {
                return data.id === note.id ? { 
                    id: note.id,
                    title: title,
                    text: text,
                    color: color,
                    date: (new Date()).toString()
                } : data
            })); 
        }
        
        setError("");
        setTitle("") 
        setText("") 
        setColor("#dfdfdf") 
        setNote({
            id: "",
            title: "",
            text: "",
            color: "#dfdfdf",
            date: "",
        })
    }

    useEffect(() => { 
        setTitle(note.title) 
        setText(note.text) 
        setColor(note.color) 
    },[note.id])

    return (
        <>
            <h2>Create Notes: {note.id}</h2>
            {error && <Alert variant="danger">{ error }</Alert>}
            <Form className="mt-3 mb-3"  onSubmit={(e) => handleSubmit(e) }>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Title for the Note" 
                        name="title"
                        value={title} 
                        onChange={ (e) => setTitle(e.target.value) }  
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control 
                        placeholder="Enter your notes" 
                        as="textarea" 
                        rows={3} 
                        name="text"
                        value={text} 
                        onChange={ (e) => setText(e.target.value) }  
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="colorInput">Notes Color</Form.Label>
                    <Form.Control 
                        type="color" 
                        id="colorInput"  
                        title="Choose your color" 
                        name="color"
                        value={color} 
                        onChange={ (e) => setColor(e.target.value) }  
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
        </>
  );
};

export default CreateNotes;
