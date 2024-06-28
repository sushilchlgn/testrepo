import "./App.css";
import AddOrUpdateBooks from "./components/addBook";
import AddOrUpdateReservation from "./components/addReservations";
import AddUser from "./components/addUser";
import DisplayBook from "./components/displayBooks";
import DisplayReservations from "./components/displayReservations";
import DisplayUser from "./components/displayUsers";
import ErrorPage from "./components/errorPage";
import Sidebar from "./components/SideBar";
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AddOrUpdateBooks />} />
        <Route path="/books" element={<DisplayBook />} />
        <Route path="/books/add" element={<AddOrUpdateBooks />} />
        <Route path="/books/add/:id" element={<AddOrUpdateBooks />} />
        <Route path="/users" element={<DisplayUser />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/add/:id" element={<AddUser />} />
        <Route path="/reservations" element={<DisplayReservations />} />
        <Route path="/reservations/add" element={<AddOrUpdateReservation />} />
        <Route path="/reservations/add/:id" element={<AddOrUpdateReservation />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="container">
      {/* Divide screen horizontally into 2 parts: sidebar and main content */}
      <div style={{ width: "20%" }}>
        <Sidebar />
      </div>
      <div style={{ width: "80%" }} className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
