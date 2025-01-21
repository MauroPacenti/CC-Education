import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import journeyMapper from "../utils/Mapper/journeyMapper";
import PrenotazioniService from "../services/Prenotazioni.service";
import { Booking } from "../models/Booking.model";
import { useContext, useState } from "react";
import ToastContext from "../context/ToastContext";
import RichiestePrenotazioneService from "../services/RichiestePrenotazioni.service";
import RichiesteInformazioniService from "../services/RichiesteInformazioni.service";

const useHome = () => {
  const { toggleToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<number | undefined>();

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
    queryKey: ["infoRequest"],
    queryFn: () =>
      RichiesteInformazioniService.getAllInfoRequest().then((res) => res),
  });

  const { data: journeyRequest } = useQuery({
    queryKey: ["journeyRequest"],
    queryFn: () =>
      RichiestePrenotazioneService.getAllBookingRequest().then((res) => res),
  });

  const mutation = useMutation({
    mutationFn: (id: number) => {
      return PrenotazioniService.deleteBooking(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toggleToast({
        type: "success",
        message: "Richiesta di informazione eliminata con successo",
      });
    },
    onError: () => {
      toggleToast({
        type: "error",
        message:
          "Errore durante l'eliminazione della richiesta di informazione",
      });
    },
  });

  const handleDeleteClick = () => {
    if (typeof selectedBooking === "number") {
      mutation.mutate(selectedBooking);
    }
    toggleDeleteModal();
  };

  const toggleDeleteModal = (id?: number) => {
    if (isOpenDeleteModal) {
      setSelectedBooking(undefined);
    } else {
      setSelectedBooking(id);
    }
    setIsOpenDeleteModal((prev) => !prev);
  };

  return {
    bookings,
    isLoading,
    isError,
    infoRequest,
    journeyRequest,
    isOpenDeleteModal,
    toggleDeleteModal,
    handleDeleteClick,
  };
};

export default useHome;
