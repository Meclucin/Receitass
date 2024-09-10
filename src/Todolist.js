import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Todolist = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksArray);
    } catch (err) {
      setError(err.message);
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    try {
      await addDoc(collection(db, 'tasks'), { text: newTask });
      setNewTask('');
      fetchTasks(); // Atualiza a lista de tarefas após adicionar
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      fetchTasks(); // Atualiza a lista de tarefas após excluir
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redireciona para a página de login após logout
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Todolist</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
      <div style={{ margin: '20px 0' }}>
        <TextField
          label="Nova tarefa"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addTask} style={{ marginTop: '10px' }}>Adicionar Tarefa</Button>
      </div>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {tasks.map(task => (
          <ListItem
            key={task.id}
            secondaryAction={
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteTask(task.id)}
              >
                Excluir
              </Button>
            }
          >
            <ListItemText primary={task.text} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Todolist;