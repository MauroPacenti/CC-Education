import { NavLink } from "react-router";
import "./Home.css";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(
      ""
      // "/api/bookings"
    )
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [bookings]);

  return (
    <div className="dashboard-home">
      <h2 className="dashboard-title">Bentornato Andrea</h2>
      <h3 className="dashboard-subtitle">Prenotazioni di oggi</h3>

      {/* TODO: Aggiungere la lista delle prenotazioni con componente PrenotazioneItem*/}

      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li>{booking}</li>
          ))}
        </ul>
      ) : (
        <p className="no-bookings">Non ci sono prenotazioni oggi</p>
      )}

      <NavLink to="/dashboard/prenotazioni" className={"btn"}>
        Vai alle prenotazioni
      </NavLink>

      <h3 className="dashboard-subtitle">Nuove richieste</h3>
      <div className="btn-container">
        <NavLink
          to={"/dashboard/richieste-prenotazioni"}
          className={"btn btn-request"}
        >
          <span>
            5 <Calendar className="btn-icon"></Calendar>
          </span>
          <span className="btn-text">Nuove richieste di prenotazione</span>
        </NavLink>
        <NavLink
          to="/dashboard/richieste-informazioni"
          className={"btn btn-request"}
        >
          <span>
            5 <Calendar className="btn-icon"></Calendar>
          </span>
          <span className="btn-text">Nuove richieste di informazioni</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
