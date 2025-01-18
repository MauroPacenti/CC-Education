import { NavLink } from "react-router";
import "./RichiesteInformazioni.css";
import { PropsWithChildren, useEffect, useState } from "react";
import infoRequestMapper from "../../utils/Mapper/infoRequestMapper";
import { useQuery } from "@tanstack/react-query";

interface InfoRequest {
  id: number;
  email: string;
  title: string;
  content: string;
  date?: string;
}

const RichiesteInformazioni = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["infoRequest"],
    queryFn: (): Promise<InfoRequest[]> =>
      fetch("/api/pub/getAllInfoRequest")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return infoRequestMapper(data);
        }),
  });

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
    <div>
      <h2>Richieste Informazioni</h2>

      <div className="info-container">
        {data?.map((request) => (
          <NavLink
            key={request.id}
            to={`/dashboard/richieste-informazioni/${request.id}`}
            className="info-card"
          >
            <div className="info-header">
              <h3>{request.email}</h3>
              <p>{request.date}</p>
            </div>
            <p className="info-title">{request.title}</p>
            <p className="info-message">
              {<InfoMessage message={request.content}> </InfoMessage>}
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
