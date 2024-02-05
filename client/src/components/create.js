import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [form, setForm] = useState({
    name: "",           
    year: "",           
    instrument: "",     
    leadership: "",     
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newMember = { ...form };

    try {
      await fetch("http://localhost:5050/member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });
      setForm({ name: "", year: "", instrument: "", leadership: "" });
      navigate("/");
    } catch (error) {
      window.alert(error);
      return;
    }
  }

  return (
    <div>
      <h3>Add New Member</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year in Polytechnic</label>
          <input
            type="text"
            className="form-control"
            id="year"
            value={form.year}
            onChange={(e) => updateForm({ year: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instrument">Instrument</label>
          <input
            type="text"
            className="form-control"
            id="instrument"
            value={form.instrument}
            onChange={(e) => updateForm({ instrument: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="leadership">Leadership Position</label>
          <input
            type="text"
            className="form-control"
            id="leadership"
            value={form.leadership}
            onChange={(e) => updateForm({ leadership: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Member"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}