import { NavLink } from "react-router";
import "./RichiesteInformazioni.css";
import { PropsWithChildren, useEffect, useState } from "react";

interface InfoRequest {
  id: number;
  date: string;
  name: string;
  title: string;
  message: string;
}

const RichiesteInformazioni = () => {
  const [infoRequest, setInfoRequest] = useState<InfoRequest[]>([]);

  useEffect(() => {
    const fetchInfoRequest = async () => {
      try {
        const response = await fetch("/api/pub/getAllInfoRequest");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setInfoRequest(data);
      } catch (error) {
        console.error("Error fetching info request:", error);
      }
    };

    fetchInfoRequest();
  }, []);

  if (infoRequest?.length === 0) {
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
        {infoRequest?.map((request) => (
          <NavLink
            key={request.id}
            to={`/dashboard/richieste-informazioni/${request.id}`}
            className="info-card"
          >
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
