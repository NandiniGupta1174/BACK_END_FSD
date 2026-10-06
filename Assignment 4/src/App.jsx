import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    description: "",
    priority: ""
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3000/api/requests";

  // Fetch all requests
  const fetchRequests = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
    }

    setForm({
      name: "",
      email: "",
      category: "",
      description: "",
      priority: ""
    });

    setEditId(null);
    fetchRequests();
  };

  // Delete
  const deleteRequest = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    fetchRequests();
  };

  // Edit
  const editRequest = (request) => {
    setForm(request);
    setEditId(request.id);
  };

  return (
    <div className="container">

      <h1>Campus Help Desk</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Problem Description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          required
        >
          <option value="">Select Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button type="submit">
          {editId ? "Update Request" : "Submit Request"}
        </button>

      </form>

      <h2>Submitted Requests</h2>

      {requests.map((request) => (
        <div className="card" key={request.id}>

          <h3>{request.name}</h3>

          <p><b>Email:</b> {request.email}</p>

          <p><b>Category:</b> {request.category}</p>

          <p><b>Description:</b> {request.description}</p>

          <p><b>Priority:</b> {request.priority}</p>

          <button onClick={() => editRequest(request)}>
            Edit
          </button>

          <button
            className="delete"
            onClick={() => deleteRequest(request.id)}
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default App;