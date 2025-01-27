import { NavLink } from "react-router";
import { ChevronRight, LucideIcon } from "lucide-react";
import { useLocation } from "react-router";
import "./NavbarLink.css";
/**
 * Props for the NavbarLink component
 * @interface NavbarLinkProps
 * @property {string} text - The text to display in the navigation link
 * @property {LucideIcon} icon - The icon component to display alongside the text
 * @property {() => void} [onNavigate] - Optional callback function when navigation occurs
 * @property {string} [className] - Optional CSS class name for additional styling
 */
interface NavbarLinkProps {
  text: string;
  icon: LucideIcon;
  onNavigate?: () => void;
  className?: string;
}

/**
 * Navigation link component for the dashboard sidebar
 * @param {NavbarLinkProps} props - The component props
 * @returns {JSX.Element} A navigation link item with icon and text
 */
export const NavbarLink = ({
  text,
  icon: Icon,
  onNavigate,
  className = "",
}: NavbarLinkProps) => {
  /**
   * Converts text to a URL-friendly slug
   * @param {string} text - The text to convert
   * @returns {string} The slugified text
   */
  const createSlug = (text: string): string =>
    text.toLowerCase().replace(/[\s+/]/g, "-");

  /**
   * Generates the route path based on the text
   * @param {string} text - The text to generate route from
   * @returns {string} The generated route path
   */
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
