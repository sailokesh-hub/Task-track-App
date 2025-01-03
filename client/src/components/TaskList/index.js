import React, { useState } from 'react';
import { Button, Dropdown, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const TaskList = ({ tasks, setShowModal, setCurrentTask, refreshTasks, token }) => {
  const [statusFilter, setStatusFilter] = useState('All'); // Filter state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true); // Open modal for editing
  };

  const handleDeleteTask = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    };
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true); // Show loading state during deletion
      try {
        await axios.delete(`https://task-track-app.onrender.com/tasks/${id}`, config); // Delete task
        refreshTasks(); // Refresh task list after deleting
      } catch (err) {
        setError('Error deleting task. Please try again later.');
      } finally {
        setLoading(false); // Hide loading state
      }
    }
  };

  const isOverdue = (dueDate) => new Date(dueDate) <= new Date();

  const getRowStyle = (dueDate) => {
    return isOverdue(dueDate) ? true : false;
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="success" id="status-filter">
          {statusFilter || 'All'} Tasks
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setStatusFilter('All')}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setStatusFilter('Pending')}>Pending</Dropdown.Item>
          <Dropdown.Item onClick={() => setStatusFilter('In Progress')}>In Progress</Dropdown.Item>
          <Dropdown.Item onClick={() => setStatusFilter('Completed')}>Completed</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Display loading state */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter(task => statusFilter === 'All' || task.status === statusFilter) // Apply filter
              .map((task) => (
                <tr key={task._id} style={{
                  border: getRowStyle(task.dueDate) ? "2px solid red" : "1px solid gray",
                  backgroundColor: getRowStyle(task.dueDate) ? "#f54949" : "white",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                }}>
                  <td>{task.taskName}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEditTask(task)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteTask(task._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TaskList;
