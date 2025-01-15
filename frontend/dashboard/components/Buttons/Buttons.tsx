import { MoveLeft, Trash } from "lucide-react";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router";

interface Props {
  onClick: () => void;
  title: string;
}

const DeleteButton = ({
  onClick,
  children,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <button className="delete-button" onClick={onClick} title={title}>
      <Trash /> {children}
    </button>
  );
};

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <MoveLeft />
    </button>
  );
};

const Buttons = {
  DeleteButton,
  BackButton,
};

export default Buttons;
