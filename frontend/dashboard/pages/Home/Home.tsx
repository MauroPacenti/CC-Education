import { NavLink } from "react-router";
import "./Home.css";
import { BookMarked, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";

interface Booking {
  id: number;
  title: string;
  startHour: string;
  endHour: string;
  participants: { minor: number; adult: number };
  group: string;
}

const Home = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      title: "Prenotazione 1",
      startHour: "10:00",
      endHour: "12:00",
      participants: { minor: 2, adult: 1 },
      group: "Gruppo 1",
    },
    {
      id: 2,
      title: "Prenotazione 2",
      startHour: "14:00",
      endHour: "16:00",
      participants: { minor: 3, adult: 2 },
      group: "Gruppo 2",
    },
    {
      id: 3,
      title: "Prenotazione 3",
      startHour: "18:00",
      endHour: "20:00",
      participants: { minor: 1, adult: 3 },
      group: "Gruppo 3",
    },
  ]);

  useEffect(() => {
    fetch(
      ""
      // "/api/bookings"
    )
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="dashboard-home">
      <h2 className="dashboard-title">Bentornato Andrea</h2>
      <div className="dashboard-main">
        <div className="dashboard-bookings">
          <h3 className="dashboard-subtitle">Prenotazioni di oggi</h3>

          {/* TODO: Aggiungere la lista delle prenotazioni con componente BookingItem*/}

          {bookings.length > 0 ? (
            <div className="bookings">
              {bookings.map((booking) => (
                <NavLink
                  to={`/dashboard/prenotazioni/${booking.id}`}
                  key={booking.id}
                  className="booking-item"
                >
                  <p className="booking-time">
                    {booking.startHour} - {booking.endHour}
                  </p>
                  <h4 className="booking-title">{booking.title}</h4>

                  <p className="booking-participants">
                    {booking.participants.minor} minori -{" "}
                    {booking.participants.adult} adulti | {booking.group}
                  </p>
                </NavLink>
              ))}
            </div>
          ) : (
            <p className="no-bookings">Non ci sono prenotazioni oggi</p>
          )}

          <NavLink to="/dashboard/prenotazioni" className={"btn"}>
            Vai alle prenotazioni
          </NavLink>
        </div>

        <div className="dashboard-requests">
          <h3 className="dashboard-subtitle">Nuove richieste</h3>
          <div className="btn-container">
            <NavLink
              to={"/dashboard/richieste-prenotazioni"}
              className={"btn btn-request"}
            >
              <span>
                5{" "}
                <BookMarked strokeWidth="2.5" className="btn-icon"></BookMarked>
              </span>
              <span className="btn-text">Nuove richieste di prenotazione</span>
            </NavLink>
            <NavLink
              to="/dashboard/richieste-informazioni"
              className={"btn btn-request"}
            >
              <span>
                5{" "}
                <NotebookPen
                  strokeWidth="2.5"
                  className="btn-icon"
                ></NotebookPen>
              </span>
              <span className="btn-text">Nuove richieste di informazioni</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;