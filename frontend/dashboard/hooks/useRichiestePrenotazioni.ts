import { useQuery } from "@tanstack/react-query";
import { BookingRequest } from "../models/BookingRequest.model";
import journeyRequestMapper from "../utils/Mapper/journeyRequestMapper";
import { useNavigate } from "react-router";
import RichiestePrenotazioneService from "../services/RichiestePrenotazioni.service";

const useRichiestePrenotazioni = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookingRequests"],
    queryFn: (): Promise<BookingRequest[]> =>
      RichiestePrenotazioneService.getAllBookingRequest().then((data) => {
        return journeyRequestMapper(data);
      }),
  });

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/dashboard/richieste-prenotazioni/${id}`);
  };

  return { data, isLoading, isError, handleClick };
};

export default useRichiestePrenotazioni;
