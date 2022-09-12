import * as React from 'react';
import Notes from './Notes';
import { Note } from '../models/note.model'; 
import { InputGroup, Form, Col, Alert } from 'react-bootstrap';

interface INotesListProps {
    notes: Note[],
    setNote: React.Dispatch<React.SetStateAction<Note>>
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const NotesList: React.FC<INotesListProps> = ({ setNote, notes, setNotes }) => {
    
    const [ error, setError ] = React.useState<string>(""); 
    const [filteredList, setFilteredList] = React.useState(notes);
    const [filterText, setFilterText] = React.useState("");
    const [selectedBy, setSelectedBy] = React.useState("title");

    const filterBySearch = (valueText: string, filterText: string) => {
        var updatedList = [...notes];
        updatedList = updatedList.filter((note) => {

            const filterBy = filterText === "title" ?  note.title :  note.text
            const filteredData = filterBy.toLowerCase().indexOf(valueText.toLowerCase()) !== -1;
            // return note.title.toLowerCase().includes(query.toLowerCase()); // This is working too
            return filteredData
        });
        
        updatedList.length <= 0 ? setError("No records found.") : setError("")
        setFilteredList(updatedList) 
    };

    const handleDelete = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    }    
    const handleEdit = (note: Note) => {
      setNote(note);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterText(event.target.value);
    };
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBy(event.target.value);
    };
   
    const renderNotes = ():JSX.Element[] => {
        return filteredList.map(note => {
            return <Notes key={note.id} note={note} handleDelete={ handleDelete } handleEdit={ handleEdit } />
        })
    }

    React.useEffect(() => {
        filterBySearch(filterText, selectedBy)
    }, [filterText, selectedBy, notes])
    
    return (
        <>  
        <h2 className="mt-3">Notes</h2>
        
        <InputGroup className="mb-3">
            <Col xs={12} md={2}>
                <InputGroup>
                <InputGroup.Text  className="mb-2">Search by: </InputGroup.Text>
                    <Form.Select 
                        className="me-1 mb-2"
                        aria-label="Default select example"
                        onChange={handleFilterChange}
                    >
                        <option value="title">Title</option>
                        <option value="text">Text</option> 
                    </Form.Select>
                </InputGroup> 
            </Col>
            <Col xs={12} md={10}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2  mb-2"
                    aria-label="Search"
                    value={filterText}
                    onChange={handleSearchChange}
                />
            </Col>
        </InputGroup> 
        {error && <Alert variant="danger">{ error }</Alert>}
        <div>{ renderNotes() }</div>  
        </>
  );
};

export default NotesList;
