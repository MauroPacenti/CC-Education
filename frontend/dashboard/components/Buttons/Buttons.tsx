import { MoveLeft, Trash } from "lucide-react";
import { useNavigate } from "react-router";

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="delete-button" onClick={onClick}>
      <Trash />
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
