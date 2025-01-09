import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Prenotazioni from "./pages/Prenotazioni/Prenotazioni";
import RichiestePrenotazione from "./pages/RichiestePrenotazione/RichiestePrenotazione";
import RichiesteInformazioni from "./pages/RichiesteInformazioni/RichiesteInformazioni";
import DettagliPrenotazione from "./pages/DettagliPrenotazione/DettagliPrenotazione";

import "./App.css";
import DettagliRichiestaInformazione from "./pages/DettagliRichiestaInformazione/DettagliRichiestaInformazione";
import DettagliRichiestaPrenotazione from "./pages/DettagliRichiestaPrenotazione/DettagliRichiestaPrenotazione";

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
            path="richieste-prenotazioni/:idRichiestaPrenotazione"
            element={<DettagliRichiestaPrenotazione />}
          />
          <Route
            path="richieste-informazioni"
            element={<RichiesteInformazioni />}
          />
          <Route
            path="richieste-informazioni/:idRichiestaInformazione"
            element={<DettagliRichiestaInformazione />}
          />
          <Route path="*" element={<h1>NotFount</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
