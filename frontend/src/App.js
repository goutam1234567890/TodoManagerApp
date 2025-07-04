import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api';
import { signup, signin } from './authApi';
import './App.css';



function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));


  useEffect(() => {
    if (isLoggedIn) fetchTodos();
  }, [isLoggedIn]);


  async function fetchTodos() {
    setLoading(true);
    const data = await getTodos();
    setTodos(data);
    setLoading(false);
  }

  async function handleSignup(e) {
    e.preventDefault();
    setAuthError('');
    const res = await signup(email, password);
    if (res.error) setAuthError(res.error);
    else setAuthMode('signin');
  }

  async function handleSignin(e) {
    e.preventDefault();
    setAuthError('');
    const res = await signin(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    } else {
      setAuthError(res.error || 'Login failed');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTodos([]);
  }

  async function handleAddTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await createTodo(newTodo);
    setNewTodo('');
    fetchTodos();
  }

  async function handleToggleComplete(todo) {
    await updateTodo(todo._id, { completed: !todo.completed });
    fetchTodos();
  }

  async function handleDelete(todo) {
    await deleteTodo(todo._id);
    fetchTodos();
  }

  function startEditing(todo) {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingTitle('');
  }

  async function saveEditing(todo) {
    if (!editingTitle.trim()) return;
    await updateTodo(todo._id, { title: editingTitle });
    setEditingId(null);
    setEditingTitle('');
    fetchTodos();
  }


  if (!isLoggedIn) {
    return (
      <div className="auth-app-container">
        {authMode === 'signin' ? (
          <>
            <h2 className="center" style={{ marginBottom: 24 }}>Sign In</h2>
            <form onSubmit={handleSignin} className='auth-form'>
              <input
                id="auth-email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                id="auth-password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <div className='auth-btn-container'>
                <button type="submit" className="auth-btn">Sign In</button>
              </div>
            </form>
            <div className="center">
              <span>Don't have an account? </span>
              <button onClick={() => { setAuthMode('signup'); setAuthError(''); }} className="switch-btn">Sign Up</button>
            </div>
            {authError && <p className="error-msg">{authError}</p>}
          </>
        ) : (
          <>
            <h2 className="center" style={{ marginBottom: 24 }}>Sign Up</h2>
            <form onSubmit={handleSignup} className='auth-form'>
              <input
                id="auth-email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                id="auth-password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <div className='auth-btn-container'>
                <button type="submit" className="auth-btn">Sign Up</button>
              </div>
            </form>
            <div className="center">
              <span>Already have an account? </span>
              <button onClick={() => { setAuthMode('signin'); setAuthError(''); }} className="switch-btn">Sign In</button>
            </div>
            {authError && <p className="error-msg">{authError}</p>}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className='header-container'>
        <h1 className='header-title'>Todo Manager</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <form onSubmit={handleAddTodo}>
        <input
          id="new-todo"
          name="newTodo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo._id} className="todo-item">
              <input
                id={`todo-${todo._id}`}
                name={`todo-${todo._id}`}
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
                className="todo-checkbox"
              />
              {editingId === todo._id ? (
                <>
                  <input
                    value={editingTitle}
                    onChange={e => setEditingTitle(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => saveEditing(todo)} className="save-btn">Save</button>
                  <button onClick={cancelEditing} className="cancel-btn">Cancel</button>
                </>
              ) : (
                <>
                  <span className={`todo-title${todo.completed ? ' completed' : ''}`}>{todo.title}</span>
                  <button onClick={() => startEditing(todo)} style={{ marginLeft: 8, marginRight: 4, width: '60px', height: '30px' }}>Edit</button>
                  <button onClick={() => handleDelete(todo)} style={{ marginLeft: 0, width: '60px', height: '30px' }}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
