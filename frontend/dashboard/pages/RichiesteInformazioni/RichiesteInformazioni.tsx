import { NavLink, Outlet, useParams } from "react-router";
import "./RichiesteInformazioni.css";

import useRichiesteInformazione from "../../hooks/useRichiesteInformazione";
import Buttons from "../../components/Buttons/Buttons";
import ShowDeleteModal from "../../components/ShowDeleteModal/ShowDeleteModal";

const RichiesteInformazioni = () => {
  const {
    data,
    isError,
    isLoading,
    toggleDeleteModal,
    handleDeleteClick,
    isOpenDeleteModal,
  } = useRichiesteInformazione();

  const { idRichiestaInformazione } = useParams();

  if (isError) {
    return (
      <div>
        <h2>Richieste Informazioni</h2>
        Error: {isError}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2>Richieste Informazioni</h2>
        Caricamento...
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div>
        <h2>Richieste Informazioni</h2>
        <p>Non ci sono richieste di informazioni</p>
      </div>
    );
  }

  return (
    <>
      {isOpenDeleteModal && (
        <ShowDeleteModal
          toggleDeleteModal={toggleDeleteModal}
          onClick={handleDeleteClick}
          subject="richiesta di informazione"
        />
      )}
      <div>
        <h2>Richieste Informazioni</h2>

        <div className="informations-container">
          <div
            className={`info-container ${
              idRichiestaInformazione ? "activated-outlet" : ""
            }  `}
          >
            {data?.map((request) => (
              <>
                <div className="info-card">
                  <NavLink
                    key={request.id}
                    to={`/dashboard/richieste-informazioni/${request.id}`}
                    className="info-link"
                  >
                    <div className="info-header">
                      <h3>{request.email}</h3>
                      <p>{request.date}</p>
                    </div>
                    <p className="info-title">{request.title}</p>
                    <p className="info-message">{request.content}</p>
                  </NavLink>
                  <Buttons.DeleteButton
                    title="Elimina Richiesta"
                    onClick={() => toggleDeleteModal(request.id)}
                  ></Buttons.DeleteButton>
                </div>
              </>
            ))}
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default RichiesteInformazioni;
