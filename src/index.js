import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from '../src/frontend/components/App';
import CreateSong from '../src/frontend/components/createSong'; 
import BigmiBeting from '../src/frontend/components/bgmiBeting';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
import Mines from "./frontend/components/Mines";
import Lottery from "./frontend/components/Lottery";

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create-song" element={<CreateSong />} />
      <Route path="/bgmi-beting" element={<BigmiBeting />} />
      <Route path="/mines" element={<Mines />} />
      <Route path="/lottery" element={<Lottery />} />
    </Routes>
  </Router>
);