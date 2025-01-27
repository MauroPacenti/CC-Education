import { useEffect, useState } from "react";
import Buttons from "../../components/Buttons/Buttons";
import useDettagliPrenotazione from "../../hooks/useDettagliPrenotazione";
import "./DettagliPrenotazione.css";
import ShowDeleteModal from "../../components/ShowDeleteModal/ShowDeleteModal";
import Details from "../../components/Details/Details";
import { CheckCheck, Pencil, Trash } from "lucide-react";

const DettagliPrenotazione = () => {
  const {
    bookingDetails,
    mutation,
    isLoading,
    isError,
    initialData,
    isEditable,
    toggleEditMode,
    handleChange,
    hours,
    startDate,
  } = useDettagliPrenotazione();

  const [isDeteModalOpen, setIsDeteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setIsDeteModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isDeteModalOpen) {
      document.body.classList.add("open-modal");
    } else {
      document.body.classList.remove("open-modal");
    }
  }, [isDeteModalOpen]);

  if (isError) {
    return (
      <div>
        <Buttons.BackButton></Buttons.BackButton>
        <div>
          Si è verificato un errore durante il recupero dei dettagli della
          prenotazione
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Buttons.BackButton></Buttons.BackButton>
        <p>Caricamento in corso...</p>
      </div>
    );
  }

  return (
    <>
      {isDeteModalOpen && (
        <ShowDeleteModal
          toggleDeleteModal={toggleDeleteModal}
          onClick={() => {
            if (!bookingDetails) return;
            mutation.mutate();
          }}
          subject="prenotazione"
        />
      )}
      <div className="booking-details">
        <Buttons.BackButton></Buttons.BackButton>

        <h2>Dettagli Prenotazione</h2>
        <div className="buttons-container">
          <button
            className="button reject"
            onClick={() => setIsDeteModalOpen(true)}
          >
            <span>
              <Trash width={20} height={20} />
              Rimuovi
            </span>
          </button>
          <button className="button edit" onClick={() => toggleEditMode()}>
            <span>
              {isEditable ? <CheckCheck /> : <Pencil width={20} height={20} />}

              {isEditable ? "Salva" : "Modifica"}
            </span>
          </button>
        </div>
        {bookingDetails ? (
          <div className="details-container">
            <Details.DetailsSection title="Dati Accompagnatore">
              <Details.DetailsGrid>
                <Details.DetailItem
                  label="Nome"
                  value={initialData?.keeper.firstName}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="firstName"
                  inputKey="keeper"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Cognome"
                  value={initialData?.keeper.lastName}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="lastName"
                  inputKey="keeper"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Email"
                  value={initialData?.keeper.email}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="email"
                  inputKey="keeper"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Codice Fiscale"
                  value={initialData?.keeper.cf}
                  isEditable={isEditable}
                  inputName="cf"
                  inputKey="keeper"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Telefono"
                  value={initialData?.keeper.phone}
                  isEditable={isEditable}
                  inputName="phone"
                  inputKey="keeper"
                ></Details.DetailItem>
              </Details.DetailsGrid>
            </Details.DetailsSection>

            <Details.DetailsSection title="Dati Organizzazione">
              <Details.DetailsGrid>
                <Details.DetailItem
                  label="Nome organizzazione"
                  value={initialData?.organization.name}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="name"
                  inputKey="organization"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Tipo organizzazione"
                  value={initialData?.organization.type}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="type"
                  inputKey="organization"
                  inputType="select"
                  selectOptions={["scuola", "gruppo"]}
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Indirizzo organizzazione"
                  value={initialData?.organization.address}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="address"
                  inputKey="organization"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Telefono organizzazione"
                  value={initialData?.organization.phone}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="phone"
                  inputKey="organization"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Email organizzazione"
                  value={initialData?.organization.email}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="email"
                  inputKey="organization"
                ></Details.DetailItem>
              </Details.DetailsGrid>
            </Details.DetailsSection>
            <Details.DetailsSection title="Dati Prenotazione">
              <Details.DetailsGrid>
                <Details.DetailItem
                  label="Minori nel gruppo"
                  value={initialData?.group.minors}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="minors"
                  inputKey="group"
                  inputType="number"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Adulti nel gruppo"
                  value={initialData?.group.adults}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="adults"
                  inputKey="group"
                  inputType="number"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Data inizio prenotazione"
                  value={new Date(
                    initialData?.journey.startDate ?? ""
                  ).toLocaleDateString("it-IT")}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputName="startDate"
                  inputKey="journey"
                  inputType="date"
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Ora inizio prenotazione"
                  value={hours.startHour}
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Data fine prenotazione"
                  value={new Date(
                    initialData?.journey.endDate ?? ""
                  ).toLocaleDateString("it-IT")}
                  isEditable={isEditable}
                  onChange={handleChange}
                  inputType="date"
                  inputName="endDate"
                  inputKey="journey"
                  startDate={startDate}
                ></Details.DetailItem>
                <Details.DetailItem
                  label="Ora fine prenotazione"
                  value={hours.endHour}
                ></Details.DetailItem>
              </Details.DetailsGrid>
            </Details.DetailsSection>
          </div>
        ) : (
          <p>Nessun dettaglio disponibile</p>
        )}
      </div>
    </>
  );
};

export default DettagliPrenotazione;
