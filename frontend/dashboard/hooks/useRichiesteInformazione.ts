import { useQuery } from "@tanstack/react-query";
import infoRequestMapper from "../utils/Mapper/infoRequestMapper";
import RichiesteInformazioniService from "../services/RichiesteInformazioni.service";

interface InfoRequest {
  id: number;
  email: string;
  title: string;
  content: string;
  date?: string;
}

const useRichiesteInformazione = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["infoRequest"],
    queryFn: (): Promise<InfoRequest[]> =>
      RichiesteInformazioniService.getAllInfoRequest().then((data) => {
        return infoRequestMapper(data);
      }),
  });

  return { data, isLoading, isError };
};

export default useRichiesteInformazione;
