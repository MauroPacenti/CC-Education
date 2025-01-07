import { NavLink } from "react-router";
import "./RichiesteInformazioni.css";
import { PropsWithChildren, useEffect, useState } from "react";

interface InfoRequest {
  id: number;
  date: string;
  name: string;
  title: string;
  message: string;
  read: boolean;
}

const RichiesteInformazioni = () => {
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

  const handleRead = async (id: number) => {
    setInfoRequest((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, read: !request.read } : request
      )
    );
    console.log("Richiesta informazioni letta");

    try {
      const response = await fetch(`/api/richieste-informazioni/${id}`, {
        method: "PUT",
        body: JSON.stringify({ read: true }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating info request:", error);
    }
  };

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
            onClick={() => handleRead(request.id)}
          >
            {!request.read && <span className="new">Nuova</span>}
            <div className="info-header">
              <h3>{request.name}</h3>
              <p>{request.date}</p>
            </div>
            <p className="info-title">{request.title}</p>
            <p className="info-message">
              {<InfoMessage message={request.message}> </InfoMessage>}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const InfoMessage = ({ message }: PropsWithChildren<{ message: string }>) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [finalMessage, setFinalMessage] = useState(message);

  useEffect(() => {
    let newMessage = message;
    if (windowWidth > 1200) {
      newMessage = message.length > 55 ? message.slice(0, 55) + "..." : message;
    } else if (windowWidth > 800) {
      newMessage = message.length > 45 ? message.slice(0, 45) + "..." : message;
    } else {
      newMessage = message.length > 30 ? message.slice(0, 35) + "..." : message;
    }
    setFinalMessage(newMessage);
  }, [windowWidth, message]);

  return <>{finalMessage}</>;
};

export default RichiesteInformazioni;
