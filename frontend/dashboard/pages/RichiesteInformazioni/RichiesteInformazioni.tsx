import { NavLink } from "react-router";
import "./RichiesteInformazioni.css";
import { useEffect, useState } from "react";

interface InfoRequest {
  id: number;
  date: string;
  name: string;
  title: string;
  message: string;
  read: boolean;
}

const RichiesteInformazioni = () => {
  const infoMessage = document.querySelector(".info-message");
  const [windowWidth, setWindowWidth] = useState(infoMessage?.clientWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(infoMessage?.clientWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [infoMessage]);

  const [infoRequest, setInfoRequest] = useState<InfoRequest[]>([
    {
      id: 1,
      date: "2021-09-01",
      name: "Mario Rossi",
      title: "Richiesta informazioni",
      message: "Mi servirebbero maggiori informazioni sul corso di inglese",
      read: false,
    },
    {
      id: 2,
      date: "2021-09-02",
      name: "Luca Verdi",
      title: "Richiesta informazioni",
      message: "Vorrei sapere i costi del corso di spagnolo",
      read: true,
    },
  ]);

  useEffect(() => {
    const fetchInfoRequest = async () => {
      try {
        const response = await fetch("/api/richieste-informazioni");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setInfoRequest(data);
      } catch (error) {
        console.error("Error fetching info request:", error);
      }
    };

    // fetchInfoRequest();
  }, []);

  if (infoRequest.length === 0) {
    return (
      <div>
        <h2>Richieste Informazioni</h2>
        <p>Non ci sono richieste di informazioni</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Richieste Informazioni</h2>

      <div className="info-container">
        {infoRequest.map((request) => (
          <NavLink
            key={request.id}
            to={`/dashboard/richieste-informazioni/${request.id}`}
            className="info-card"
          >
            {!request.read && <span className="new">Nuova</span>}
            <div className="info-header">
              <h3>{request.name}</h3>
              <p>{request.date}</p>
            </div>
            <p className="info-title">{request.title}</p>
            <p className="info-message">
              {(windowWidth ?? 0) > 600
                ? request.message
                : request.message.slice(0, 35) + "..."}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default RichiesteInformazioni;
