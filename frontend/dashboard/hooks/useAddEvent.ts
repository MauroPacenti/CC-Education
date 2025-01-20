import { useContext, useState } from "react";
import ToastContext from "../context/ToastContext";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import BookingFormSteps from "../models/BookingFormSteps.model";
import { ValidationModel } from "../models/Validation.model";

const useAddEvent = () => {
  const { toggleToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (newEvent: BookingFormSteps) => {
      const response = await fetch("/api/pub/createJourneyFromAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      toggleToast({
        type: "success",
        message: "Prenotazione creata con successo",
      });
      navigate("/dashboard/prenotazioni");
    },
    onError: () => {
      toggleToast({
        type: "error",
        message:
          "Si è verificato un errore durante la creazione della prenotazione",
      });
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState<BookingFormSteps>({
    keeper: {
      firstName: "",
      lastName: "",
      email: "",
      cf: "",
      phone: "",
    },
    group: {
      minors: 0,
      adults: 0,
    },
    organization: {
      name: "",
      type: "",
      address: "",
      phone: "",
      email: "",
    },
    journey: {
      startDate: "",
      endDate: "",
      title: "",
      annotations: "",
    },
  });
  const [duration, setDuration] = useState("");

  const [validationForm, setValidationForm] = useState<ValidationModel>({
    keeper: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      cf: undefined,
      phone: undefined,
    },
    group: {
      minors: undefined,
      adults: undefined,
    },
    organization: {
      name: undefined,
      type: undefined,
      address: undefined,
      phone: undefined,
      email: undefined,
    },
    journey: {
      startDate: undefined,
      endDate: undefined,
      duration: undefined,
    },
  });

  const durationStart = (duration?: number) => {
    switch (duration) {
      case 1:
        return "08:00";
      case 2:
        return "13:00";
      case 3:
        return "08:00";
      case 4:
        return "08:00";
    }
  };
  const durationEnd = (duration?: number) => {
    switch (duration) {
      case 1:
        return "12:00";
      case 2:
        return "19:00";
      case 3:
        return "19:00";
      case 4:
        return "12:00";
    }
  };

  const handleBlur = (
    obj: "keeper" | "group" | "organization" | "journey",
    key: string,
    isValid: boolean
  ) => {
    setValidationForm((prev: ValidationModel) => ({
      ...prev,
      [obj]: {
        ...prev[obj],
        [key]: isValid,
      },
    }));
    setIsFormValid(
      Object.values(validationForm).every((obj) =>
        Object.values(obj).every((value) => value === true)
      )
    );
  };

  const handleChange = (
    obj: "keeper" | "group" | "organization" | "journey",
    key: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [obj]: {
        ...prev[obj],
        [key]: value,
      },
    }));
  };

  const handleClick = () => {
    if (isFormValid) {
      formData.journey.title =
        formData.keeper.firstName + " " + formData.keeper.lastName;
      formData.journey.startDate += "T" + durationStart(+duration) + ":00";
      formData.journey.endDate += "T" + durationEnd(+duration) + ":00";
      mutation.mutate(formData);
    }
  };

  return {
    formData,
    handleBlur,
    handleChange,
    validationForm,
    isFormValid,
    setDuration,
    duration,
    handleClick,
    mutation,
  };
};

export default useAddEvent;
