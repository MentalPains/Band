import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Edit() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/member/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const member = await response.json();

      if (!member) {
        window.alert(`Member with id ${params.id} not found`);
        navigate('/');
        return;
      }

      setForm(member);
    }

    fetchData();
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      email: form.email,
      mobile: form.mobile,
    };

    await fetch(`http://localhost:5050/member/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    navigate('/');
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Member</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile: </label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            value={form.mobile}
            onChange={(e) => updateForm({ mobile: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update Member"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
