import { useEffect, useState } from "react";
import "./addBook.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddOrUpdateBooks() {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  // get book id from the URL
  const params = useParams();

  const isUpdate = params.id ? true : false; // true if id is present

  // fetch book for the give id
  const fetchBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      if (!response.ok) {
        throw response;
      }
      const jsonResponse = await response.json();
      setTitle(jsonResponse.title);
      setIsbn(jsonResponse.isbn);
      setYear(jsonResponse.year);
    } catch (error) {
      console.log(error);
      toast("Failed to fetch books", { type: "error" });
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchBook(params.id);
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // convert string into number
    const yearInNumber = parseInt(year, 10);

    // update URL based on id
    let url = "http://localhost:3000/books";
    if (isUpdate) {
      url = `http://localhost:3000/books/${params.id}`;
    }

    try {
      // add book
      const response = await fetch(url, {
        method: isUpdate ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, isbn: isbn, year: yearInNumber }),
      });

      if (!response.ok) {
        throw response;
      }
      toast(`Book ${isUpdate ? "updated" : "added"} successfully`, {
        type: "success",
      });
      navigate("/books");
    } catch (error) {
      console.log(error);
      toast("Failed to add book!", { type: "error" });
    }
  };

  return (
    <div className="book-container">
      <p onClick={() => navigate("/books")}>Back</p>
      <h1 className="title">{`${isUpdate ? "Update" : "Add"} Book`}</h1>
      <form className="content">
        <div className="form-item">
          <label>Title</label>
          <input
            name="title"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>ISBN</label>
          <input
            name="isbn"
            value={isbn}
            type="text"
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Year</label>
          <input
            name="year"
            value={year}
            type="text"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          {isUpdate ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddOrUpdateBooks;
