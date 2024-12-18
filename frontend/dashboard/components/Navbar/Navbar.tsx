import "./Navbar.css";
import { NavLink } from "react-router";
import {
  BookMarked,
  CalendarDays,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  NotebookPen,
  Settings,
} from "lucide-react";
import NavbarLink from "../NavbarLink/NavbarLink";
import { useState } from "react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const toggleActiveClass = () => {
    setIsActive((prevState) => !prevState);
  };

  const removeActiveNav = () => {
    setIsActive(false);
  };

  const navLinks = [
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

  return (
    <nav className="navbar">
      <NavLink to="/dashboard/" className="logo" onClick={removeActiveNav}>
        Logo
      </NavLink>

      <ul className={`navbar-list ${isActive ? "active" : ""}`}>
        {navLinks.map((link) => (
          <NavbarLink
            key={link.text}
            linkText={link.text}
            currentPage={activePage}
            removeActiveNav={removeActiveNav}
            handlePageChange={handlePageChange}
            Icon={link.icon}
          />
        ))}

        <li className="navbar-item">
          <NavLink to={"/login"}>
            <span>
              <LogOut className="icon" />
              Logout
            </span>
            <ChevronRight className="chevron" />
          </NavLink>
          <NavLink to={"/dashboard/impostazioni"}>
            <Settings className="icon setting" />
          </NavLink>
        </li>
      </ul>

      <div
        className={`hamburger ${isActive ? "active" : ""}`}
        onClick={toggleActiveClass}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
