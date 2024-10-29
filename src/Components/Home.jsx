import React, { useEffect, useState } from 'react';
import './Home.css';
import { addNotesAPI, getCompletedTasksAPI, saveCompletedTaskAPI, editNotesAPI, getNotesAPi, deleteNotesAPI } from '../services/allAPI';
import square from '../assets/boxs.png';
import { Link } from 'react-router-dom';

const Home = () => {
    const [input, setInputs] = useState({tasks:""});
    const [allNotes, setAllNotes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [time, setTime] = useState(new Date());
    const [username, setUsername] = useState(null);
    
    useEffect(() => {
        displayNotes();
        fetchCompletedTasksCount(); // Fetch the count on component mount
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);

        return () => clearInterval(timer);
    }, []);

    const handleNotes = async () => {
        const { tasks } = input;
        if (tasks) {
            try {
                if (editingId) {
                    await editNotesAPI(editingId, input);
                    setEditingId(null);
                } else {
                    await addNotesAPI(input);
                }
                setInputs({ tasks: "" });
                displayNotes();
            } catch (err) {
                console.error(err);
            }
        } else {
            alert("Please add a Task!!");
        }
    };

    const displayNotes = async () => {
        try {
            const response = await getNotesAPi();
            setAllNotes(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCompletedTasksCount = async () => {
        try {
            const response = await getCompletedTasksAPI();
            setCompletedTasksCount(response.data.length);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNotes = async (id) => {
        try {
            await deleteNotesAPI(id);
            displayNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const startEditNote = (id, task) => {
        setInputs({ tasks: task });
        setEditingId(id);
    };

    const markAsCompleted = async (note) => {
        try {
            const completedTask = {
                ...note,
                completedAt: new Date().toLocaleString()
            };

            await saveCompletedTaskAPI(completedTask);
            await deleteNotesAPI(note.id);
            displayNotes();
            fetchCompletedTasksCount(); // Update count after marking as completed
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className='main-section'>
                <div style={{ height: "100vh" }} className=" d-flex justify-content-center">
                    <div className='second-section'>
                        <div className='second-sub-section d-flex flex-column mt-5 justify-content-center align-items-center ps-3'>
                            <h1 className='fw-bolder fs-1'>TODO APP</h1>
                            <h4>{time.toLocaleTimeString('en-us', {
                                day: 'numeric',
                                weekday: 'long',
                                year: 'numeric'
                            })}</h4>
                            <div className='search-box d-flex justify-content-center align-items-center'>
                                <div style={{ width: '50%' }} className='search'>
                                    <input
                                        value={input.tasks}
                                        onChange={(e) => setInputs({ ...input, tasks: e.target.value })}
                                        className='form-control py-2'
                                        placeholder='Enter your task..'
                                        type="text"
                                    />
                                </div>
                                <button onClick={handleNotes} className='btn btn-primary ms-3 shadow'>
                                    {editingId ? "Update Task" : "Add Task"}
                                </button>
                            </div>
                        </div>
                        <div className='main-section  d-flex justify-content-center align-items-center'>
                            <div className='third-section'>
                                <div className='firstbtn d-flex justify-content-between align-items-center m-3'>
                                    <Link to={'History'} style={{ textDecoration: 'none' }} className='text-light'>
                                        <h5 className='p-2'><i className="fa-solid fa-list-check pe-3"></i>Completed Tasks</h5>
                                    </Link>
                                    <p className='fs-5 text-light mt-1 pe-2 me-3'>{completedTasksCount}</p> {/* Displaying Completed Task Count */}
                                </div>
                                <ul className='my-3 mb-5 me-4'>
                                    {allNotes?.length > 0 ?
                                        allNotes?.map(notes => (
                                            <li className='d-flex justify-content-between shadow border fs-4 mt-3 p-1'>
                                                <span onClick={() => markAsCompleted(notes)} className='pe-3' style={{ cursor: "pointer" }}>
                                                    <img width={'25px'} src={square} alt="Complete" /> {notes?.tasks}
                                                </span>
                                                <div className='me-4 d-flex justify-content-center align-items-center'>
                                                    <span onClick={() => startEditNote(notes.id, notes.tasks)} style={{ cursor: "pointer" }} className='pe-3'>
                                                        <i className="fa-solid fa-edit text-success fs-5"></i>
                                                    </span>
                                                    <span onClick={() => deleteNotes(notes?.id)} style={{ cursor: "pointer" }}>
                                                        <i className="fa-solid fa-trash text-danger fs-5"></i>
                                                    </span>
                                                </div>
                                            </li>
                                        ))
                                        :
                                        <div className="schedule text-center">Schedule your Day!!</div>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
