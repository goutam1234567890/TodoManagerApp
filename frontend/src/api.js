// src/api.js
const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;



function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function getTodos() {
  const res = await fetch(API_URL, {
    headers: { ...getAuthHeaders() }
  });
  return res.json();
}

export async function createTodo(title) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ title })
  });
  return res.json();
}

export async function updateTodo(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() }
  });
  return res.json();
}
