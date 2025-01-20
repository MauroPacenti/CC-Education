import { useQuery } from "@tanstack/react-query";
import journeyMapper from "../utils/Mapper/journeyMapper";
import PrenotazioniService from "../services/Prenotazioni.service";
import RichiesteInformazioniService from "../services/RichiesteInformazioni.service";
import RichiestePrenotazioneService from "../services/RIchiestePrenotazioni.service";
import { Booking } from "../models/Booking.model";

const useHome = () => {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () =>
      PrenotazioniService.getAllBookings()
        .then((res) => res)
        .then((data: Booking[]) => journeyMapper(data).slice(0, 5)),
  });

  const { data: infoRequest } = useQuery({
    queryKey: ["journeyRequest"],
    queryFn: () =>
      RichiesteInformazioniService.getAllInfoRequest().then((res) => res),
  });

  const { data: journeyRequest } = useQuery({
    queryKey: ["journeyRequest"],
    queryFn: () =>
      RichiestePrenotazioneService.getAllBookingRequest().then((res) => res),
  });

  return { bookings, isLoading, isError, infoRequest, journeyRequest };
};

export default useHome;
