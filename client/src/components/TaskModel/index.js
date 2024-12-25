import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const TaskModal = ({ show, onHide, task, refreshTasks, token }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState('');

  // Reset form fields when task is null (for adding a new task)
  useEffect(() => {
    if (task) {
      // Set fields with existing task details for editing
      setTaskName(task.taskName);
      setDescription(task.description);
      setDueDate(new Date(task.dueDate).toISOString().slice(0, 10));
      setStatus(task.status);
      setPriority(task.priority);
    } else {
      // Clear fields when opening modal to add a new task
      setTaskName('');
      setDescription('');
      setDueDate('');
      setStatus('Pending');
      setPriority('Low');
    }
  }, [task]); // Trigger reset when task changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const newTask = { taskName, description, dueDate, status, priority };

    try {
      const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        };
      if (task) {
        // Update existing task
        await axios.put(`https://task-track-app.onrender.com/tasks/${task._id}`, newTask, config);
      } else {
        // Add new task
        await axios.post('https://task-track-app.onrender.com/tasks', newTask, config);
      }
      refreshTasks(); // Refresh task list after adding or editing
      onHide(); // Close modal
    } catch (error) {
      console.error('Error submitting task:', error);
      setError('Error submitting task. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Control>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {task ? 'Update Task' : 'Add Task'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
