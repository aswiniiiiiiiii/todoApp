import React, { useEffect, useState } from 'react';
import './History.css';
import { getCompletedTasksAPI,deleteTaskAPI } from '../services/allAPI';

const History = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [deleteUserTaskHistory,setUserDeleteHistory] = useState()

    useEffect(() => {
        fetchCompletedTasks();
        
    }, [deleteUserTaskHistory]);

    // Fetch completed tasks from server
    const fetchCompletedTasks = async () => {
        try {
            const response = await getCompletedTasksAPI();
            setCompletedTasks(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    //delete history
    const deleteTaskHistory = async(id)=>{
     const response = await deleteTaskAPI(id)
    //  console.log(response);
     
     setUserDeleteHistory(response)
    } 

    // const today =new Date()
    // console.log(today);
    
    return (
        <div style={{ height: '100vh' }} className='body container-fluid'>
            <div className='d-flex pt-5  '>
               {
                completedTasks?.length>0?
                <table className='table shadow  fs-4 m-5 text-center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Task Title</th>
                        <th>Completed Time</th>
                        <th>Delete History</th>
                    </tr>
                </thead>
                <tbody>
                    {completedTasks.map((task, index) => (
                        <tr key={task.id}>
                            <td>{index + 1}</td>
                            <td>{task.tasks}</td>
                            <td>{task.completedAt}</td>
                            <td><span style={{cursor:"pointer"}} onClick={()=>deleteTaskHistory(task?.id)}><i className="fa-solid fa-trash text-danger"></i></span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
                :
                <div className="text-warning d-flex justify-content-center align-items-center fw-bolder fs-1">
                  <h1>No Task Completed!!</h1>
                </div>
               }
            </div>
        </div>
    );
};

export default History;
