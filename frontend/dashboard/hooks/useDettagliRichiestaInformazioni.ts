import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DettagliRichiestaInformazioneService } from "../services/DettagliRichiestaInformazione.service";

import type { InformationRequest } from "../models/InformationRequest.model";

const useDettagliRichiestaInformazioni = () => {
  const { idRichiestaInformazione } = useParams();
  const navigate = useNavigate();

  const [requestInformationDetails, setRequestInformationDetails] =
    useState<InformationRequest>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    if (!idRichiestaInformazione) {
      throw new Error("No booking ID provided");
    }

    DettagliRichiestaInformazioneService.getRequest(+idRichiestaInformazione)
      .then((requestInformationDetails) => {
        setRequestInformationDetails(requestInformationDetails);
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Si è verificato un errore durante il caricamento dei dati."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [idRichiestaInformazione]);

  const deleteInformationRequest = () => {
    // Delete information request

    setIsLoadingDelete(true);
    if (!idRichiestaInformazione) {
      throw new Error("No information ID provided");
    }

    DettagliRichiestaInformazioneService.deleteRequest(+idRichiestaInformazione)
      .then(() => {
        toggleDeleteModal();
        navigate("/dashboard/richieste-informazioni");
      })
      .catch((err) => {
        setErrorDelete(
          err instanceof Error
            ? err.message
            : "Si è verificato un errore durante il caricamento dei dati."
        );
      })
      .finally(() => {
        setIsLoadingDelete(false);
      });
  };

  const toggleReplyModal = () => {
    // Open modal
    setShowReplyModal((prev) => !prev);
  };

  const toggleDeleteModal = () => {
    // Open modal
    setError(null);
    setErrorDelete(null);
    setIsLoading(false);
    setIsLoadingDelete(false);
    setShowDeleteModal((prev) => !prev);
  };

  return {
    requestInformationDetails,
    isLoading,
    error,
    showReplyModal,
    showDeleteModal,
    toggleReplyModal,
    toggleDeleteModal,
    deleteInformationRequest,
    isLoadingDelete,
    errorDelete,
  };
};

export default useDettagliRichiestaInformazioni;
