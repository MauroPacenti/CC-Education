import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DettagliRichiestaInformazioneService } from "../services/DettagliRichiestaInformazione.service";

import type { InformationRequest } from "../models/InformationRequest.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import ToastContext from "../context/ToastContext";

const useDettagliRichiestaInformazioni = () => {
  const { idRichiestaInformazione } = useParams();
  const navigate = useNavigate();
  const { toggleToast } = useContext(ToastContext);

  const {
    data: requestInformationDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["requestInformationDetails", idRichiestaInformazione],
    queryFn: (): Promise<InformationRequest> => {
      if (!idRichiestaInformazione) {
        throw new Error("No information request ID provided");
      }
      return DettagliRichiestaInformazioneService.getRequest(
        +idRichiestaInformazione
      );
    },
  });

  const mutation = useMutation({
    mutationFn: (id: number) =>
      DettagliRichiestaInformazioneService.deleteRequest(id),
    onSuccess: () => {
      navigate("/dashboard/richieste-informazioni");
    },
    onError: (error) => {
      setErrorDelete(error.message);
    },
  });

  const sendEmailMutation = useMutation({
    mutationFn: (data: { to: string; subject: string; body: string }) =>
      DettagliRichiestaInformazioneService.replyRequest(data),
    onSuccess: () => {
      toggleToast({
        type: "success",
        message: "Email inviata con successo!",
      });
      setShowReplyModal(false);
    },
    onError: (error) => {
      setErrorDelete(error.message);
    },
  });

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState<string | null>(null);

  const toggleReplyModal = () => {
    setShowReplyModal((prev) => !prev);
    if (!showReplyModal) {
      document.body.classList.add("open-modal");
    } else {
      document.body.classList.remove("open-modal");
    }
  };

  const toggleDeleteModal = () => {
    setErrorDelete(null);
    setIsLoadingDelete(false);
    setShowDeleteModal((prev) => !prev);
    if (!showDeleteModal) {
      document.body.classList.add("open-modal");
    } else {
      document.body.classList.remove("open-modal");
    }
  };

  const handleDeleteClick = (
    requestInformationDetails?: InformationRequest
  ) => {
    if (!requestInformationDetails) return;
    mutation.mutate(requestInformationDetails.id);
    if (!errorDelete)
      toggleToast({
        type: "success",
        message: "Richiesta eliminata",
      });
    else
      toggleToast({
        type: "error",
        message: "Si è verificato un errore durante l'eliminazione",
      });
  };

  return {
    requestInformationDetails,
    isLoading,
    error,
    showReplyModal,
    showDeleteModal,
    toggleReplyModal,
    toggleDeleteModal,
    isLoadingDelete,
    errorDelete,
    isError,
    handleDeleteClick,
    idRichiestaInformazione,
    sendEmailMutation,
  };
};

export default useDettagliRichiestaInformazioni;
