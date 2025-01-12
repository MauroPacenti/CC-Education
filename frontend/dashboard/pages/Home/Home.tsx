import { NavLink } from "react-router";
import "./Home.css";
import { BookMarked, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import journeyMapper from "../../utils/Mapper/journeyMapper";

interface Booking {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  participants: { minor: number; adult: number };
  organizationType: string;
}

const Home = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [journeyRequest, setJourneyRequest] = useState([]);
  const [infoRequest, setInfoRequest] = useState([]);

  useEffect(() => {
    fetch("/api/pub/getAllJourney")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // mapper for bookings
        data = journeyMapper(data);
        console.log(data);
        setBookings(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/api/pub/getAllInfoRequest")
      .then((res) => res.json())
      .then((data) => setInfoRequest(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/api/pub/getAllJourneyRequest")
      .then((res) => res.json())
      .then((data) => setJourneyRequest(data))
      .catch((err) => console.error(err));
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
                    {booking.startDate} - {booking.endDate}
                  </p>
                  <h4 className="booking-title">{booking.title}</h4>

                  <p className="booking-participants">
                    {booking.participants.minor} minori -{" "}
                    {booking.participants.adult} adulti |{" "}
                    {booking.organizationType}
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
                {journeyRequest.length}
                <BookMarked strokeWidth="2.5" className="btn-icon"></BookMarked>
              </span>
              <span className="btn-text">Nuove richieste di prenotazione</span>
            </NavLink>
            <NavLink
              to="/dashboard/richieste-informazioni"
              className={"btn btn-request"}
            >
              <span>
                {infoRequest.length}
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
