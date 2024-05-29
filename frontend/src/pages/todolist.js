import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/todos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(res.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch todos');
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:3000/api/todos',
        { task: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, res.data]);
      setInput('');
    } catch (error) {
      console.error(error);
      setError('Failed to add todo');
    }
  };

  const updateTodo = async (id, task, completed) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `http://localhost:3000/api/todos/${id}`,
        { task, completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
    } catch (error) {
      console.error(error);
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
      setError('Failed to delete todo');
    }
  };

  return (
    <Container>
      <h1>To-Do List</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formTodo">
        <Form.Control
          type="text"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="primary" onClick={addTodo} className="w-100 mt-2">
          Add
        </Button>
      </Form.Group>
      <Row className="mt-4">
        {todos.map((todo) => (
          <Col key={todo.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Body>
                <Form.Check
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => updateTodo(todo.id, todo.task, e.target.checked)}
                  label={todo.task}
                />
                <Button variant="danger" onClick={() => deleteTodo(todo.id)} className="mt-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button onClick={() => {
        localStorage.removeItem('token');
        router.push('/login');
      }} className="mt-4">
        Logout
      </Button>
    </Container>
  );
};

export default TodoList;
