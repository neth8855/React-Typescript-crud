<<<<<<< Updated upstream
import React, { useState } from 'react';
import Header from './components/Header';
import NotesList from './components/NotesList';
import CreateNotes from './components/CreateNotes';
import { Note } from './models/note.model';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    text: "",
    color: "#dfdfdf",
    date: ""
  } as Note)
  const [notes, setNotes] = useState<Note[]>([{
    id: (new Date).toString(),
    title: "Meetings",
    text: "Schedule meeting with UI/UX Team",
    color: "#dfdfdf",
    date: (new Date).toString()
  }]);

=======
import React, { useState } from "react";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import CreateNotes from "./components/CreateNotes";
import { Note } from "./models/note.model";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";

const App = () => {
  const [note, setNote] = useState<Note>({} as Note);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: new Date().toString(),
      title: "Meetings",
      text: " Schedule meeting with UI/UX Team",
      color: "#dfdfdf",
      date: new Date().toString(),
    },
  ]);

>>>>>>> Stashed changes
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col>
<<<<<<< Updated upstream
            <NotesList setNote={ setNote } notes={notes} setNotes={ setNotes}/>
=======
            <NotesList
              note={note}
              setNote={setNote}
              notes={notes}
              setNotes={setNotes}
            />
>>>>>>> Stashed changes
          </Col>
        </Row>
        <Row>
          <Col>
            <CreateNotes
              note={note}
              setNote={setNote}
              notes={notes}
              setNotes={setNotes}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
