import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'; // Import js-cookie
import TaskList from "../TaskList";
import TaskModal from "../TaskModel";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const token = Cookies.get('jwt_token');
  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      
      const response = await axios.get("https://task-track-app.onrender.com/tasks", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTaskClick = () => {
    setCurrentTask(null); // Reset current task to null when adding task
    setShowModal(true); // Open modal
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  // Filter tasks based on search query
// Filter tasks based on search query
const filteredTasks = tasks.filter((task) =>
  (task.task?.toLowerCase().includes(searchQuery.toLowerCase())) || 
  (task.description?.toLowerCase().includes(searchQuery.toLowerCase()))
);


  return (
    <Container>
      {/* Search Bar */}
      <Row className="mt-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search tasks by name or description"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          {/* Add Task button aligned to the right with padding */}
          <Button
            variant="primary"
            onClick={handleAddTaskClick} // Trigger add task
            className="me-3" // Add margin-right for spacing
          >
            Add Task
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <h1 className="my-4 text-center">Task Manager</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="task-list-container">
            <TaskList
              tasks={filteredTasks} // Use filtered tasks instead of all tasks
              setShowModal={setShowModal}
              setCurrentTask={setCurrentTask}
              refreshTasks={fetchTasks}
              token={token}
            />
          </div>
        </Col>
      </Row>

      {/* Task Modal */}
      <TaskModal
        show={showModal}
        onHide={() => setShowModal(false)}
        task={currentTask}
        refreshTasks={fetchTasks}
        token={token}
      />
    </Container>
  );
};

export default HomePage;
