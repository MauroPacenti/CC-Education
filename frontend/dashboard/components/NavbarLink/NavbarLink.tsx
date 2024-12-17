import "./NavbarLink.css";
import { NavLink } from "react-router";
import { ChevronRight, LucideIcon } from "lucide-react";

interface Props {
  linkText: string;
  currentPage: string;
  removeActiveNav: () => void;
  handlePageChange: (page: string) => void;
  Icon: LucideIcon;
}

const NavbarLink = ({
  linkText,
  currentPage,
  removeActiveNav,
  handlePageChange,
  Icon,
}: Props) => {
  const createSlug = (text: string) => {
    return text.toLowerCase().split(" ").join("-");
  };

  const getRoute = (text: string) => {
    if (linkText.toLowerCase() === "dashboard") {
      return "";
    }
    return `${createSlug(text)}/`;
  };

  return (
    <li className={`navbar-item ${currentPage === linkText ? "active" : ""}`}>
      <NavLink
        to={`/dashboard/${getRoute(linkText)}`}
        onClick={() => {
          removeActiveNav();
          handlePageChange(linkText);
        }}
      >
        <span>
          <Icon className="icon" />
          {linkText}
        </span>
        <ChevronRight className="chevron" />
      </NavLink>
    </li>
  );
};

export default NavbarLink;
