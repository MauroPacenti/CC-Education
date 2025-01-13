import "./FormSteps.css";

import { useState } from "react";
import KeeperStep from "./KeeperStep/KeeperStep";
import OrganizationStep from "./OrganizationStep/OrganizationStep";
import BookingDetailsStep from "./BookingDetailsStep/BookingDetailsStep";
import type Booking from "../../../models/Booking.model";
import { CalendarBooking } from "../../../models/CalendarBooking.model";
import { calendarBookingMapper } from "../../../utils/Mapper/CalendarBookingMapper";

interface FormStepsProps {
  handleSubmit: (booking: CalendarBooking) => void;
}

const FormSteps = ({ handleSubmit }: FormStepsProps) => {
  const [formData, setFormData] = useState<Booking>({
    keeper: {
      firstName: "",
      lastName: "",
      email: "",
      codiceFiscale: "",
      phone: "",
    },
    organization: {
      isOrganization: null,
      name: "",
      type: "",
      address: "",
      email: "",
      phone: "",
    },
    bookingDetails: {
      minors: 0,
      adults: 0,
      start: "",
      end: "",
      otherInfo: "",
    },
  });

  const [stepForm, setStepForm] = useState<1 | 2 | 3>(1);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calendarBooking = calendarBookingMapper(formData);
    handleSubmit(calendarBooking);
  };

  const handleSteps = (step: 1 | 2 | 3) => {
    setStepForm(step);
  };

  return (
    <>
      <form
        className="addEventForm"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleFormSubmit}
      >
        <h3>Aggiungi Evento</h3>
        {stepForm === 1 && (
          <KeeperStep
            formData={formData}
            setFormData={setFormData}
            handleSteps={handleSteps}
          ></KeeperStep>
        )}
        {stepForm === 2 && formData.organization.isOrganization && (
          <OrganizationStep
            formData={formData}
            setFormData={setFormData}
            handleSteps={handleSteps}
          ></OrganizationStep>
        )}
        {stepForm === 3 && (
          <BookingDetailsStep
            formData={formData}
            setFormData={setFormData}
            handleSteps={handleSteps}
          ></BookingDetailsStep>
        )}
      </form>
    </>
  );
};

export default FormSteps;
