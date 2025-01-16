import { useState, useCallback } from "react";
import { NavLink } from "react-router";
import {
  BookMarked,
  CalendarDays,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  NotebookPen,
  Settings,
} from "lucide-react";

import "./Navbar.css";
import { NavbarLink } from "../NavbarLink/NavbarLink";

interface NavLinkModel {
  text: string;
  icon: LucideIcon;
  path?: string;
}
const navLinks: NavLinkModel[] = [
  {
    text: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    text: "Prenotazioni",
    icon: CalendarDays,
  },
  {
    text: "Richieste Prenotazioni",
    icon: BookMarked,
  },
  {
    text: "Richieste Informazioni",
    icon: NotebookPen,
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="navbar">
      <NavLink to="/dashboard/" className="logo" onClick={closeMenu}>
        <img src="/img/logo.png" alt="Logo" />
      </NavLink>

      <ul className={`navbar-list ${isMenuOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <NavbarLink
            key={link.text}
            text={link.text}
            icon={link.icon}
            onNavigate={closeMenu}
          />
        ))}

        <li className="navbar-item navbar-item--actions">
          <NavLink to="/login" className="navbar-link">
            <span>
              <LogOut className="icon" aria-hidden="true" />
              Logout
            </span>
            <ChevronRight className="chevron" aria-hidden="true" />
          </NavLink>

          <NavLink to="/dashboard/impostazioni" className="navbar-link">
            <Settings className="icon setting" aria-hidden="true" />
          </NavLink>
        </li>
      </ul>

      <button
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
};

export default Navbar;
