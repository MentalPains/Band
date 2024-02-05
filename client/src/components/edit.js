import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Edit() {
  const [form, setForm] = useState({
    name: '',
    year: '',
    instrument: '',
    leadership: '',
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

      setForm(member); // Make sure the member object has the same structure as your form state
    }

    fetchData();
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedMember = {
      name: form.name,
      year: form.year,
      instrument: form.instrument,
      leadership: form.leadership,
    };

    await fetch(`http://localhost:5050/member/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedMember),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    navigate('/');
  }

  //This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Member Information</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year in Polytechnic: </label>
          <input
            type="text"
            className="form-control"
            id="year"
            value={form.year}
            onChange={(e) => updateForm({ year: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instrument">Instrument: </label>
          <input
            type="text"
            className="form-control"
            id="instrument"
            value={form.instrument}
            onChange={(e) => updateForm({ instrument: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="leadership">Leadership Position: </label>
          <input
            type="text"
            className
            ="form-control"
            id="leadership"
            value={form.leadership}
            onChange={(e) => updateForm({ leadership: e.target.value })}
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
