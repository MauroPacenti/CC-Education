import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DettagliRichiestaInformazioneService } from "../services/DettagliRichiestaInformazione.service";

import type { InformationRequest } from "../models/InformationRequest.model";
import { useMutation, useQuery } from "@tanstack/react-query";

const useDettagliRichiestaInformazioni = () => {
  const { idRichiestaInformazione } = useParams();
  const navigate = useNavigate();

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

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState<string | null>(null);

  const toggleReplyModal = () => {
    setShowReplyModal((prev) => !prev);
  };

  const toggleDeleteModal = () => {
    setErrorDelete(null);
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
    mutation,
    isLoadingDelete,
    errorDelete,
    isError,
  };
};

export default useDettagliRichiestaInformazioni;
