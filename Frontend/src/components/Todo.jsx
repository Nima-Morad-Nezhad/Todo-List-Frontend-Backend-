import React from "react";
import axios from "axios";
import { useEffect , useState } from "react";

function Todo(){
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");
useEffect(()=>{
    axios.get('http://localhost:8000')
    .then(result => {
        setTodoList(result.data)
    })
    .catch(err => console.log(err))
}, [])
const toggleEditable = (id) => {
    const rowData = todoList.find((data) => data._id === id);
    if (rowData) {
        setEditableId(id);
        setEditedTask(rowData.task);
        setEditedStatus(rowData.status);
        setEditedDeadline(rowData.deadline || "");
    } else {
        setEditableId(null);
        setEditedTask("");
        setEditedStatus("");
        setEditedDeadline("");
    }
};
const addTask = (e) => {
    e.preventDefault();
    if(!newTask || !newStatus || !newDeadline){
        alert("All fields must be filled out.");
        return;
    }
    axios.post("http://localhost:8000/add", {
        task: newTask, status:newStatus, deadline: newDeadline
    }).then(res => {
        console.log(res);
        window.location.reload();
    }).catch(err => console.log(err));
}
const saveEditedTask = (id) => {
    const editedData = {
        task: editedTask,
        status: editedStatus,
        deadline: editedDeadline
    };

    
    if (!editedTask || !editedStatus || !editedDeadline) {
        alert("All fields must be filled out.");
        return;
    }

 
    axios.post('http://localhost:8000/update/' + id, editedData)
        .then(result => {
            console.log(result);
            setEditableId(null);
            setEditedTask("");
            setEditedStatus("");
            setEditedDeadline("");
            
            window.location.reload();
        })
        .catch(err => console.log(err));
}
const deleteTask = (id) => {
    axios.delete('http://localhost:8000/delete/' + id)
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err =>
            console.log(err)
        )
}


    return(
        <div className="container mt-5">
        <div className="row">
            <div className="col-md-7">
                <h2 className="text-center">Todo List</h2>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="table-primary">
                            <tr>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {Array.isArray(todoList) ? (
                            <tbody>
                                {todoList.map((data) => (
                                    <tr key={data._id}>
                                        <td>
                                            {editableId === data._id ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editedTask}
                                                    onChange={(e) => setEditedTask(e.target.value)}
                                                />
                                            ) : (
                                                data.task
                                            )}
                                        </td>
                                        <td>
                                            {editableId === data._id ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editedStatus}
                                                    onChange={(e) => setEditedStatus(e.target.value)}
                                                />
                                            ) : (
                                                data.status
                                            )}
                                        </td>
                                        <td>
                                            {editableId === data._id ? (
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    value={editedDeadline}
                                                    onChange={(e) => setEditedDeadline(e.target.value)}
                                                />
                                            ) : (
                                                data.deadline ? new Date(data.deadline).toLocaleString() : ''
                                            )}
                                        </td>

                                        <td>
                                            {editableId === data._id ? (
                                                <button className="btn btn-success btn-sm" onClick={() => saveEditedTask(data._id)}>
                                                    Save
                                                </button>
                                            ) : (
                                                <button className="btn btn-primary btn-sm" onClick={() => toggleEditable(data._id)}>
                                                    Edit
                                                </button>
                                            )}
                                            <button className="btn btn-danger btn-sm ml-1" onClick={() => deleteTask(data._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="4">Loading products...</td>
                                </tr>
                            </tbody>
                        )}


                    </table>
                </div>
            </div>
            <div className="col-md-5">
                <h2 className="text-center">Add Task</h2>
                <form className="bg-light p-4">
                    <div className="mb-3">
                        <label>Task</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Task"
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Status</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Status"
                            onChange={(e) => setNewStatus(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Deadline</label>
                        <input
                            className="form-control"
                            type="datetime-local"
                            onChange={(e) => setNewDeadline(e.target.value)}
                        />
                    </div>
                    <button onClick={addTask} className="btn btn-success btn-sm">
                        Add Task
                    </button>
                </form>
            </div>

        </div>
    </div>
    )
}
export default Todo;