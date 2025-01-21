import { useNavigate, useParams } from "react-router";
import { DettagliPrenotazioneService } from "../services/DettagliPrenotazione.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import ToastContext from "../context/ToastContext";
import BookingFormSteps from "../models/BookingFormSteps.model";

const useDettagliPrenotazione = () => {
  const { idPrenotazione } = useParams();
  const navigate = useNavigate();
  const { toggleToast } = useContext(ToastContext);

  const [isEditable, setIsEditable] = useState(false);

  const [initialData, setInitialData] = useState<BookingFormSteps>();

  const toggleEditMode = () => {
    if (isEditable) {
      console.log(initialData);
      updateMutation.mutate(initialData!);
    }
    setIsEditable((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "keeper" | "group" | "organization" | "journey"
  ) => {
    const { name, value } = e.target;

    setInitialData((prevData?: BookingFormSteps) => {
      if (!prevData) return prevData;
      return {
        ...prevData,
        [key]: {
          ...prevData[key],
          [name]: name === "minors" || name === "adults" ? +value : value,
        },
      };
    });
  };

  const {
    data: bookingDetails,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["bookingDetails", idPrenotazione],
    queryFn: async () => {
      const bookingDetails = await DettagliPrenotazioneService.getJourneyById(
        Number(idPrenotazione)
      );

      setInitialData({
        keeper: {
          id: bookingDetails.keeper.id,
          firstName: bookingDetails.keeper.firstName,
          lastName: bookingDetails.keeper.lastName,
          email: bookingDetails.keeper.email,
          cf: bookingDetails.keeper.cf,
          phone: bookingDetails.keeper.phone,
        },
        group: {
          id: bookingDetails.keeper.group.id,
          minors: bookingDetails.keeper.group.minors,
          adults: bookingDetails.keeper.group.adults,
        },
        organization: {
          id: bookingDetails.keeper.organization.id,
          name: bookingDetails.keeper.organization.name,
          type: bookingDetails.keeper.organization.type,
          address: bookingDetails.keeper.organization.address,
          phone: bookingDetails.keeper.organization.phone,
          email: bookingDetails.keeper.organization.email,
        },
        journey: {
          id: bookingDetails.id,
          title: bookingDetails.title,
          annotations: bookingDetails.annotations,
          startDate: bookingDetails.startDate,
          endDate: bookingDetails.endDate,
        },
      });
      return bookingDetails;
    },
  });

  const mutation = useMutation({
    mutationFn: () => DettagliPrenotazioneService.deleteById(+idPrenotazione!),
    onSuccess: () => {
      toggleToast({
        type: "success",
        message: "Richiesta eliminata con successo",
      });

      navigate(-1);
    },
    onError: () => {
      toggleToast({
        type: "error",
        message: "Si è verificato un errore durante l'eliminazione",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: BookingFormSteps) =>
      DettagliPrenotazioneService.updateJourney(body),
    onSuccess: () => {
      toggleToast({
        type: "success",
        message: "Richiesta modificata con successo",
      });
    },
    onError: () => {
      toggleToast({
        type: "error",
        message: "Si è verificato un errore durante la modifica",
      });
    },
  });

  return {
    bookingDetails,
    isLoading,
    error,
    isError,
    mutation,
    initialData,
    isEditable,
    toggleEditMode,
    handleChange,
  };
};

export default useDettagliPrenotazione;
