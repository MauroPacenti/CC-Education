import { NavLink } from "react-router";
import "./Home.css";
import { BookMarked, NotebookPen } from "lucide-react";
import journeyMapper from "../../utils/Mapper/journeyMapper";
import { useQuery } from "@tanstack/react-query";

interface Booking {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  participants: { minor: number; adult: number };
  organizationType: string;
}

const Home = () => {
  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: (): Promise<Booking[]> =>
      fetch("/api/pub/getAllJourney").then((res) =>
        res.json().then((data) => journeyMapper(data))
      ),
  });

  const { data: infoRequest } = useQuery({
    queryKey: ["journeyRequest"],
    queryFn: () =>
      fetch("/api/pub/getAllInfoRequest").then((res) => res.json()),
  });

  const { data: journeyRequest } = useQuery({
    queryKey: ["journeyRequest"],
    queryFn: () =>
      fetch("/api/pub/getAllJourneyRequest").then((res) => res.json()),
  });

  if (isError) {
    return (
      <div>
        <h2 className="dashboard-title">Bentornato Andrea</h2>
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="dashboard-title">Bentornato Andrea</h2>
        Loading...
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      <h2 className="dashboard-title">Bentornato Andrea</h2>
      <div className="dashboard-main">
        <div className="dashboard-bookings">
          <h3 className="dashboard-subtitle">Prenotazioni accettate</h3>

          {/* TODO: Aggiungere la lista delle prenotazioni con componente BookingItem*/}

          {bookings && bookings.length > 0 ? (
            <div className="bookings">
              {bookings.map((booking) => (
                <NavLink
                  to={`/dashboard/prenotazioni/${booking.id}`}
                  key={booking.id}
                  className="booking-item"
                >
                  <p className="booking-time">
                    {new Date(booking.startDate).toLocaleDateString() ===
                    new Date(booking.endDate).toLocaleDateString()
                      ? new Date(booking.startDate).toLocaleDateString("it-IT")
                      : new Date(booking.startDate).toLocaleDateString(
                          "it-IT"
                        ) +
                        " - " +
                        new Date(booking.endDate).toLocaleDateString("it-IT")}
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
                {journeyRequest?.length}
                <BookMarked strokeWidth="2.5" className="btn-icon"></BookMarked>
              </span>
              <span className="btn-text">Nuove richieste di prenotazione</span>
            </NavLink>
            <NavLink
              to="/dashboard/richieste-informazioni"
              className={"btn btn-request"}
            >
              <span>
                {infoRequest?.length}
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
