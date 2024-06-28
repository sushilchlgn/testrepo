import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const navigate = useNavigate(); // Access navigate function from react-router-dom

  const params = useParams();

  const isUpdate = params.id ? true : false;

  const fetchUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`);
      if (!response.ok) {
        throw response;
      }
      const jsonResponse = await response.json();
      setName(jsonResponse.name);
      setEmail(jsonResponse.email);
      setCourse(jsonResponse.course);
      setSemester(jsonResponse.semester);
    } catch (error) {
      console.log(error);
      toast("Failed to fetch users", { type: "error" });
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchUser(params.id);
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update URL based on id
    let url = "http://localhost:3000/users";
    if (isUpdate) {
      url = `http://localhost:3000/users/${params.id}`;
    }
    try {
      const response = await fetch(url, {
        method: isUpdate ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          course: course,
          semester: semester,
        }),
      });

      if (!response) {
        throw response;
      }
      toast(`User ${isUpdate ? "updated" : "added"} successfully`, {
        type: "success",
      });
      navigate("/users");
    } catch (error) {
      console.log(error);
      toast("Failed to add book!", { type: "error" });
    }
  };

  return (
    <div className="user-container">
      <p onClick={() => navigate("/users")}>Back</p>
      <h1 className="title">{`${isUpdate ? "Update" : "Add"} User`}</h1>
      <form className="content">
        <div className="form-item">
          <label>Name</label>
          <input
            name="name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Email</label>
          <input
            name="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Course</label>
          <select
            name="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            <option value="bit">BIT</option>
            <option value="bca">BCA</option>
          </select>
        </div>
        <div className="form-item">
          <label>Semester</label>
          <select
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            <option value="first">First</option>
            <option value="second">Second</option>
            <option value="third">Third</option>
            <option value="fourth">Fourth</option>
            <option value="fifth">Fifth</option>
            <option value="sixth">Sixth</option>
            <option value="seventh">Seventh</option>
            <option value="eighth">Eighth</option>
          </select>
        </div>
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          {isUpdate ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddUser;
