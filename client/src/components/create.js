import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    year: "",
    instrument: "",
    leadership: "",
    portrait: null,
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Use FormData for multipart/form-data
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('year', form.year);
    formData.append('instrument', form.instrument);
    formData.append('leadership', form.leadership);
    formData.append('portrait', form.portrait); // Append file

    try {
      await fetch("http://localhost:5050/member", {
        method: "POST",
        body: formData, // Send formData
      });
      navigate("/");
    } catch (error) {
      window.alert(error);
      return;
    }
  }

  
  // Update form handling for file input:
  function handleFileChange(e) {
    setForm({ ...form, portrait: e.target.files[0] });
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year in Polytechnic</label>
          <select
            className="form-control"
            id="year"
            value={form.year}
            onChange={(e) => updateForm({ year: e.target.value })}
            required
          >
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="instrument">Instrument</label>
          <select
            className="form-control"
            id="instrument"
            value={form.instrument}
            onChange={(e) => updateForm({ instrument: e.target.value })}
            required
          >
            <option value="">Select Instrument</option>
            <option value="Trumpet">Trumpet</option>
            <option value="Flute">Flute</option>
            <option value="Clarinet">Clarinet</option>
            <option value="Oboe">Oboe</option>
            <option value="Saxophone">Saxophone</option>
            <option value="French Horn">French Horn</option>
            <option value="Bassoon">Bassoon</option>
            <option value="Trombone">Trombone</option>
            <option value="Baritone">Baritone</option>
            <option value="Drums">Drums</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="leadership">Leadership Position</label>
          <select
            className="form-control"
            id="leadership"
            value={form.leadership}
            onChange={(e) => updateForm({ leadership: e.target.value })}
            required
          >
            <option value="">Select Leadership Position</option>
            <option value="Drum Major">Drum Major</option>
            <option value="Section Leader">Section Leader</option>
            <option value="Percussion Section Leader">Percussion Section Leader</option>
            <option value="Color Guard Captain">Color Guard Captain</option>
            <option value="Field Crew Captain">Field Crew Captain</option>
            <option value="Librarians">Librarians</option>
            <option value="Truck Crew Captain">Truck Crew Captain</option>
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="portrait">Portrait</label>
          <input
            type="file"
            className="form-control"
            id="portrait"
            onChange={handleFileChange}
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
