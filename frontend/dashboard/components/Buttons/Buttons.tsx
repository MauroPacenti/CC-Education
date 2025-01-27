import { MoveLeft, Trash } from "lucide-react";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router";

interface Props {
  onClick: () => void;
  title: string;
}

/**
 * Button component for delete actions
 * @param onClick - Function to execute when delete button is clicked
 * @param children - Child elements to render inside the button
 * @param title - Title/tooltip text for the button
 */
const DeleteButton = ({
  onClick,
  children,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <button
      className="delete-button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={title}
    >
      <Trash /> {children}
    </button>
  );
};

/**
 * Button component for navigating back to previous page
 */
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
