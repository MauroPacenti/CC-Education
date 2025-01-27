import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DettagliRichiestaInformazioneService } from "../services/DettagliRichiestaInformazione.service";

import type { InformationRequest } from "../models/InformationRequest.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import ToastContext from "../context/ToastContext";
/**
 * Custom hook for managing information request details
 * @returns {Object} An object containing:
 * @returns {InformationRequest | undefined} requestInformationDetails - The details of the information request
 * @returns {boolean} isLoading - Loading state of the request
 * @returns {unknown} error - Error object if request fails
 * @returns {boolean} showReplyModal - State for reply modal visibility
 * @returns {boolean} showDeleteModal - State for delete modal visibility
 * @returns {() => void} toggleReplyModal - Function to toggle reply modal
 * @returns {() => void} toggleDeleteModal - Function to toggle delete modal
 * @returns {boolean} isError - Error state of the request
 * @returns {(requestInformationDetails?: InformationRequest) => void} handleDeleteClick - Function to handle delete action
 * @returns {string | undefined} idRichiestaInformazione - ID of the information request
 * @returns {UseMutationResult} sendEmailMutation - Mutation object for sending email replies
 */
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
      toggleToast({
        type: "success",
        message: "Richiesta eliminata con successo",
      });

      navigate("/dashboard/richieste-informazioni");
    },
    onError: (error) => {
      toggleToast({
        type: "error",
        message: `${
          error instanceof Error
            ? error.message
            : "Si è verificato un errore durante l'eliminazione"
        }`,
      });
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
      toggleToast({
        type: "error",
        message: `${
          error instanceof Error
            ? error.message
            : "Si è verificato un errore durante l'invio dell'email"
        }`,
      });
    },
  });

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleReplyModal = () => {
    setShowReplyModal((prev) => !prev);
    if (!showReplyModal) {
      document.body.classList.add("open-modal");
    } else {
      document.body.classList.remove("open-modal");
    }
  };

  const toggleDeleteModal = () => {
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
  };

  return {
    requestInformationDetails,
    isLoading,
    error,
    showReplyModal,
    showDeleteModal,
    toggleReplyModal,
    toggleDeleteModal,
    isError,
    handleDeleteClick,
    idRichiestaInformazione,
    sendEmailMutation,
  };
};

export default useDettagliRichiestaInformazioni;
