import "./DettagliRichiestaPrenotazione.css";
import ShowReplyModal from "../../components/ShowReplyModal/ShowReplyModal";
import Modal from "../../components/Modal/Modal";

import Details from "../../components/Details/Details";
import Buttons from "../../components/Buttons/Buttons";
import useDettagliRichiestaPrenotazione from "../../hooks/useDettagliRichiestaPrenotazione";

const DettagliRichiestaPrenotazione = () => {
  const {
    isLoading,
    error,
    replyModal,
    handleContact,
    bookingRequestDetails,
    handleApprove,
    handleReject,
    approveModal,
    toggleAproveModal,
    handleChange,
    selectedDate,
    toggleToast,
  } = useDettagliRichiestaPrenotazione();

  if (isLoading) {
    return (
      <div>
        <Buttons.BackButton></Buttons.BackButton>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Buttons.BackButton></Buttons.BackButton>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {replyModal && (
        <ShowReplyModal
          toggleReplyModal={handleContact}
          email={bookingRequestDetails?.keeper?.email}
        />
      )}
      <Buttons.BackButton></Buttons.BackButton>

      <h2>Dettagli Richiesta Prenotazione</h2>

      <div className="buttons-container">
        <button
          className="button reject"
          onClick={() => {
            handleReject();
            if (!error) {
              toggleToast({
                type: "success",
                message: "Richiesta rifiutata",
              });
            } else {
              toggleToast({
                type: "error",
                message: "Errore nel rifiuto della richiesta",
              });
            }
          }}
        >
          Rifiuta
        </button>

        <button className="button approve" onClick={toggleAproveModal}>
          Seleziona data
        </button>
      </div>

      {approveModal && (
        <Modal toggleActiveModal={toggleAproveModal}>
          <div className="approve-modal" onClick={(e) => e.stopPropagation()}>
            <div className="availability-info">
              <p className="availability-dates">
                Disponibilità del cliente:{" "}
                {new Date(
                  bookingRequestDetails?.startAvailabilityDate ?? ""
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  bookingRequestDetails?.endAvailabilityDate ?? ""
                ).toLocaleDateString()}
              </p>
              <p className="duration-text">
                Durata richiesta:{" "}
                {durationText(bookingRequestDetails?.duration)}
              </p>
            </div>

            <div className="date-selection">
              {bookingRequestDetails?.duration === 1 ||
              bookingRequestDetails?.duration === 2 ||
              bookingRequestDetails?.duration === 3 ? (
                <div className="single-date-input">
                  <label className="date-label" htmlFor="single-date">
                    Seleziona giorno della prenotazione
                  </label>
                  <input
                    className="date-input"
                    type="date"
                    id="single-date"
                    min={
                      bookingRequestDetails?.startAvailabilityDate ??
                      new Date().toISOString().split("T")[0]
                    }
                    max={
                      bookingRequestDetails?.endAvailabilityDate ??
                      new Date().toISOString().split("T")[0]
                    }
                    onClick={(e) => {
                      console.log(e.currentTarget.value);
                      e.currentTarget.showPicker();
                    }}
                    name="startDate"
                    value={selectedDate.startDate}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className="date-range-input">
                  <div className="date-field">
                    <label className="date-label" htmlFor="start-date">
                      Seleziona inizio della prenotazione
                    </label>
                    <input
                      className="date-input"
                      type="date"
                      id="start-date"
                      required
                      min={
                        bookingRequestDetails?.startAvailabilityDate ??
                        new Date().toISOString().split("T")[0]
                      }
                      max={
                        bookingRequestDetails?.endAvailabilityDate ??
                        new Date().toISOString().split("T")[0]
                      }
                      name="startDate"
                      value={selectedDate.startDate}
                      onClick={(e) => {
                        e.currentTarget.showPicker();
                      }}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="date-field">
                    <label className="date-label" htmlFor="end-date">
                      Seleziona fine della prenotazione
                    </label>
                    <input
                      className="date-input"
                      type="date"
                      id="end-date"
                      required
                      min={selectedDate?.startDate}
                      max={
                        bookingRequestDetails?.endAvailabilityDate ??
                        new Date().toISOString().split("T")[0]
                      }
                      onChange={handleChange}
                      name="endDate"
                      value={selectedDate.endDate}
                      onClick={(e) => {
                        e.currentTarget.showPicker();
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <button className="button approve" onClick={handleApprove}>
              Approva
            </button>
          </div>
        </Modal>
      )}

      <div className="details-container">
        <Details.DetailsSection title="Dati Accompagnatore">
          <Details.DetailsGrid>
            <Details.DetailItem
              label="Nome"
              value={bookingRequestDetails?.keeper?.firstName}
            />
            <Details.DetailItem
              label="Cognome"
              value={bookingRequestDetails?.keeper?.lastName}
            />
            <Details.DetailItem
              label="Email"
              value={bookingRequestDetails?.keeper?.email}
            />
            <Details.DetailItem
              label="CF"
              value={bookingRequestDetails?.keeper?.cf}
            />
            <Details.DetailItem
              label="Telefono"
              value={bookingRequestDetails?.keeper?.phone}
            />
          </Details.DetailsGrid>
        </Details.DetailsSection>

        <Details.DetailsSection title="Dati Organizzazione">
          <Details.DetailsGrid>
            <Details.DetailItem
              label="Nome"
              value={bookingRequestDetails?.keeper?.organization?.name}
            />
            <Details.DetailItem
              label="Tipo"
              value={bookingRequestDetails?.keeper?.organization?.type}
            />
            <Details.DetailItem
              label="Indirizzo"
              value={bookingRequestDetails?.keeper?.organization?.address}
            />
            <Details.DetailItem
              label="Telefono"
              value={bookingRequestDetails?.keeper?.organization?.phone}
            />
            <Details.DetailItem
              label="Email"
              value={bookingRequestDetails?.keeper?.organization?.email}
            />
          </Details.DetailsGrid>
        </Details.DetailsSection>

        <Details.DetailsSection title="Dati Prenotazione">
          <Details.DetailsGrid>
            <Details.DetailItem
              label="Minori nel Gruppo"
              value={bookingRequestDetails?.keeper.group.minors}
            ></Details.DetailItem>
            <Details.DetailItem
              label="Adulti"
              value={bookingRequestDetails?.keeper.group.adults}
            ></Details.DetailItem>
            <Details.DetailItem
              label="Data inizio disponibilità"
              value={new Date(
                bookingRequestDetails?.startAvailabilityDate ?? ""
              ).toLocaleDateString()}
            ></Details.DetailItem>
            <Details.DetailItem
              label="Data fine disponibilità"
              value={new Date(
                bookingRequestDetails?.endAvailabilityDate ?? ""
              ).toLocaleDateString()}
            ></Details.DetailItem>
            <Details.DetailItem
              label="Durata"
              value={durationText(bookingRequestDetails?.duration)}
            ></Details.DetailItem>
          </Details.DetailsGrid>
        </Details.DetailsSection>
      </div>
    </div>
  );
};

const durationText = (duration?: number) => {
  switch (duration) {
    case 1:
      return "Mattina";
    case 2:
      return "Pomeriggio";
    case 3:
      return "Intera giornata";
    case 4:
      return "Più giorni";
  }
};

export default DettagliRichiestaPrenotazione;
