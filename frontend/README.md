# Frontend

## Strutura del progetto

La struttura del progetto è la seguente:

```
frontend/
  |-- README.md
  |-- index.html
  |-- styles/
    |-- global.css
    |-- index.css
    |-- login.css
    |-- richiedi-prenotazione.css
    |-- laboratori.css
  |-- scripts/
  |-- pages/
    |-- laboratori.html
    |-- richiedi-prenotazione.html
    |-- login.html
  public/
    |-- favicon.ico
  dashboard/
    |--REACT APP
```

### Installazione e avvio

Dalla root spostare la cartella `frontend` e eseguire `npm install` e `npm run dev`

```
cd frontend
npm install
```

Da qui in poi puoi accedere al server di sviluppo con il comando `npm run dev`

```
npm run dev
```

### Build

Per creare la build è necessario eseguire `npm run build` che permeterà di creare la build in `src/main/resources/static`

```
npm run build
```
