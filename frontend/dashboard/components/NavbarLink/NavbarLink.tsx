import { NavLink } from "react-router";
import { ChevronRight, LucideIcon } from "lucide-react";
import { useLocation } from "react-router";
import "./NavbarLink.css";

interface NavbarLinkProps {
  text: string;
  icon: LucideIcon;
  onNavigate?: () => void;
  className?: string;
}

export const NavbarLink = ({
  text,
  icon: Icon,
  onNavigate,
  className = "",
}: NavbarLinkProps) => {
  const createSlug = (text: string): string =>
    text.toLowerCase().replace(/[\s+/]/g, "-");

  const getRoute = (text: string): string => {
    const slug = createSlug(text);
    return text.toLowerCase() === "dashboard" ? "" : slug;
  };

  const location = useLocation();
  const path = `/dashboard/${getRoute(text)}`;

  // Special handling for dashboard
  const isActive =
    text.toLowerCase() === "dashboard"
      ? location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/"
      : location.pathname.startsWith(path);

  return (
    <li className={`navbar-item ${isActive ? "active" : ""} ${className}`}>
      <NavLink
        to={path}
        onClick={onNavigate}
        className={isActive ? "active" : ""}
      >
        <span>
          <Icon className="icon" aria-hidden="true" />
          {text}
        </span>
        <ChevronRight className="chevron" aria-hidden="true" />
      </NavLink>
    </li>
  );
};
