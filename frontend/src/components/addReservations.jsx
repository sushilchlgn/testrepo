import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddOrUpdateReservation = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch users
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch books
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(userId),
          book_id: parseInt(bookId),
          reservation_date: new Date(reservationDate).toISOString(),
          return_date: new Date(returnDate).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log("Reservation created:", data);
      // Reset form fields
      setUserId("");
      setBookId("");
      setReservationDate("");
      setReturnDate("");
      navigate("/reservations")
    } catch (error) {
      console.error("There was an error creating the reservation!", error);
    }
  };
  return (
    <div className="reservation-container">
        <p onClick={() => navigate("/reservations")}>
        Back
      </p>

      {/* <h1 className="title">{`${isUpdate ? "Update" : "Add"} Reservation`}</h1> */}
      <h1 className="title">Add Reservation</h1>
    <form className="content">
      <div className="form-item">
        <label htmlFor="userId">User</label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-item">
        <label htmlFor="bookId">Book</label>
        <select
          id="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        >
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>
      <div className="form-item">
        <label htmlFor="reservationDate">Reservation Date</label>
        <input
          type="datetime-local"
          id="reservationDate"
          value={reservationDate}
          onChange={(e) => setReservationDate(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="returnDate">Return Date:</label>
        <input
          type="datetime-local"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  );
};

export default AddOrUpdateReservation;
