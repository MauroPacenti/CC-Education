import "./Navbar.css";
import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/dashboard/"}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/prenotazioni"}>Prenotazioni</NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/richieste-prenotazioni"}>
            Richieste Prenotazioni
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/richieste-informazioni"}>
            Richieste Informazioni
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
