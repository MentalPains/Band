import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Member = (props) => (
  <tr>
    <td>{props.member.name}</td>
    <td>{props.member.year}</td> {/* Adjusted to show year in polytechnic */}
    <td>{props.member.instrument}</td> {/* Adjusted to show instrument */}
    <td>{props.member.leadership}</td> {/* Adjusted to show leadership position */}
    <td>
      <Link className="btn btn-link" to={`/edit/${props.member._id}`}>Edit</Link>
      <button className="btn btn-link"
       onClick={() => {
        props.deleteMember(props.member._id);
       }}
     >
        Delete
      </button>
    </td>
  </tr>
);

export default function MemberList() {
  const [members, setMembers] = useState([]);

  // This method fetches the members from the database.
  useEffect(() => {
    async function getMembers() {
      const response = await fetch('http://localhost:5050/member/');

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const members = await response.json();
      setMembers(members);
    } 

    getMembers();

    return;
  }, [members.length]);

  // This method will delete a member
  async function deleteMember(id) {
    await fetch(`http://localhost:5050/member/${id}`, {
      method: "DELETE"
    });

    const newMembers = members.filter((el) => el._id !== id);
    setMembers(newMembers);
  }

  // This method will map out the members on the table
  function memberList() {
    return members.map((member) => (
      <Member
        member={member}
        deleteMember={() => deleteMember(member._id)}
        key={member._id}
      />
    ));
  }
  

  // This following section will display the table with the members of individuals.
  return (
    <div>
      <h3>Member List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year in Polytechnic</th>
            <th>Instrument</th>
            <th>Leadership Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{memberList()}</tbody>
      </table>
    </div>
  );
}
