import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from '../src/frontend/components/App';
import CreateSong from '../src/frontend/components/createSong'; // Corrected import statement

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create-song" element={<CreateSong />} />
    </Routes>
  </Router>
);