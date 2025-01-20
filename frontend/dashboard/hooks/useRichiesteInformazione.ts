import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import infoRequestMapper from "../utils/Mapper/infoRequestMapper";
import RichiesteInformazioniService from "../services/RichiesteInformazioni.service";
import { useContext, useState } from "react";
import ToastContext from "../context/ToastContext";

interface InfoRequest {
  id: number;
  email: string;
  title: string;
  content: string;
  date?: string;
}

const useRichiesteInformazione = () => {
  const { toggleToast } = useContext(ToastContext);
  const queryClient = useQueryClient();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<number | undefined>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["infoRequest"],
    queryFn: (): Promise<InfoRequest[]> =>
      RichiesteInformazioniService.getAllInfoRequest().then((data) => {
        return infoRequestMapper(data);
      }),
  });

  const mutation = useMutation({
    mutationFn: (id: number) =>
      RichiesteInformazioniService.deleteInfoRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infoRequest"] });
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
    if (typeof selectedRequest === "number") {
      mutation.mutate(selectedRequest);
    }
    toggleDeleteModal();
  };

  const toggleDeleteModal = (id?: number) => {
    if (isOpenDeleteModal) {
      setSelectedRequest(undefined);
    } else {
      setSelectedRequest(id);
    }
    setIsOpenDeleteModal((prev) => !prev);
  };

  return {
    data,
    isLoading,
    isError,
    toggleDeleteModal,
    handleDeleteClick,
    isOpenDeleteModal,
  };
};

export default useRichiesteInformazione;
