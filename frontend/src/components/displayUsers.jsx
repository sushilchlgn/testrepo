import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1
import "./displayBook.css";
import { toast } from "react-toastify";
import Modal from "react-modal";

function DisplayUser() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // 2

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw response;
      }
      const jsonResponse = await response.json();
      setUsers(jsonResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw response;
      }
      setModalOpen(false);
      fetchAllUsers();
      toast("User deleted successfully!", { type: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="db-container">
      <div className="db-header">
        <p className="db-title">Users</p>
        {/* 3 */}
        <button className="db-button" onClick={() => navigate("/users/add")}>
          + Add New User
        </button>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Semester</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.course.toUpperCase()}</td>
                <td>{user.semester.toUpperCase()}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{ color: "blue" }}
                      onClick={() => navigate(`/users/add/${user.id}`)}
                    >
                      Edit
                    </p>
                    <p
                      style={{ color: "blue" }}
                      onClick={() => {
                        setModalOpen(true);
                        setUserId(user.id);
                      }}
                    >
                      Delete
                    </p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} style={customStyles} ariaHideApp={false}>
        <h3>Are you sure? This will delete the book permanantly.</h3>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
          <button
            style={{
              backgroundColor: "white",
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => handleDelete(userId)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DisplayUser;
