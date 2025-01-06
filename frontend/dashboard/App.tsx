import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Prenotazioni from "./pages/Prenotazioni/Prenotazioni";
import RichiestePrenotazione from "./pages/RichiestePrenotazione/RichiestePrenotazione";
import RichiesteInformazioni from "./pages/RichiesteInformazioni/RichiesteInformazioni";
import DettagliPrenotazione from "./pages/DettagliPrenotazione/DettagliPrenotazione";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="prenotazioni" element={<Prenotazioni />} />
          <Route
            path="prenotazioni/:idPrenotazione"
            element={<DettagliPrenotazione />}
          />
          <Route
            path="richieste-prenotazioni"
            element={<RichiestePrenotazione />}
          />
          <Route
            path="richieste-informazioni"
            element={<RichiesteInformazioni />}
          />
          <Route path="*" element={<h1>NotFount</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;