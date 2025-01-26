import { NavLink } from "react-router";
import "./Home.css";
import { BookMarked, NotebookPen } from "lucide-react";

import useHome from "../../hooks/useHome";
import { BookingHome } from "../../models/BookingHome.model";
import Buttons from "../../components/Buttons/Buttons";
import ShowDeleteModal from "../../components/ShowDeleteModal/ShowDeleteModal";

const Home = () => {
  const {
    isError,
    isLoading,
    bookings,
    infoRequest,
    journeyRequest,
    isOpenDeleteModal,
    toggleDeleteModal,
    handleDeleteClick,
  } = useHome();

  if (isError) {
    return (
      <div>
        <h2 className="dashboard-title">Bentornato Admin</h2>
        Si è verificato un errore durante il caricamento dei dati.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="dashboard-title">Bentornato Admin</h2>
        Loading...
      </div>
    );
  }

  return (
    <>
      {isOpenDeleteModal && (
        <ShowDeleteModal
          toggleDeleteModal={toggleDeleteModal}
          onClick={handleDeleteClick}
          subject="prenotazione"
        />
      )}
      <div className="dashboard-home">
        <h2 className="dashboard-title">Bentornato Admin</h2>
        <div className="dashboard-main">
          <div className="dashboard-bookings">
            <h3 className="dashboard-subtitle">Prenotazioni accettate</h3>

            {/* TODO: Aggiungere la lista delle prenotazioni con componente BookingItem*/}

            {bookings && bookings.length > 0 ? (
              <div className="bookings">
                {bookings.map((booking: BookingHome) => (
                  <div className="booking-item" key={booking.id}>
                    <NavLink
                      to={`/dashboard/prenotazioni/${booking.id}`}
                      className="booking-link"
                    >
                      <p className="booking-time">
                        {new Date(booking.startDate).toLocaleDateString() ===
                        new Date(booking.endDate).toLocaleDateString()
                          ? new Date(booking.startDate).toLocaleDateString(
                              "it-IT"
                            )
                          : new Date(booking.startDate).toLocaleDateString(
                              "it-IT"
                            ) +
                            " - " +
                            new Date(booking.endDate).toLocaleDateString(
                              "it-IT"
                            )}
                      </p>
                      <h4 className="booking-title">{booking.title}</h4>

                      <p className="booking-participants">
                        {booking.participants.minor} minori -{" "}
                        {booking.participants.adult} adulti |{" "}
                        {booking.organizationType}
                      </p>
                    </NavLink>
                    <Buttons.DeleteButton
                      title="Elimina Richiesta"
                      onClick={() => toggleDeleteModal(booking.id)}
                    ></Buttons.DeleteButton>
                  </div>
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
                  <BookMarked
                    strokeWidth="2.5"
                    className="btn-icon"
                  ></BookMarked>
                </span>
                <span className="btn-text">
                  Nuove richieste di prenotazione
                </span>
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
                <span className="btn-text">
                  Nuove richieste di informazioni
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
