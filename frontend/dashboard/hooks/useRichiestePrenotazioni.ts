import { useQuery } from "@tanstack/react-query";
import { BookingRequest } from "../models/BookingRequest.model";
import journeyRequestMapper from "../utils/Mapper/journeyRequestMapper";
import { useNavigate } from "react-router";
import RichiestePrenotazioneService from "../services/RichiestePrenotazioni.service";

/**
 * Custom hook for managing booking requests
 * @returns {Object} Object containing booking requests data and handlers
 * @returns {BookingRequest[]} data - Array of booking requests
 * @returns {boolean} isLoading - Loading state of the query
 * @returns {boolean} isError - Error state of the query
 * @returns {(id: number) => void} handleClick - Function to navigate to specific booking request
 */
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
