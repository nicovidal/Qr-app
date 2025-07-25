import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Html5QrPage from "./Html5QrPage";
import ReactZxingPage from "./ReactZxingPage";

export const QrApp = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">
          QR App
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"ks
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                html5-qrcode
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/react-zxing">
                react-zxing
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Html5QrPage />} />
        <Route path="/react-zxing" element={<ReactZxingPage />} />
      </Routes>
    </Router>
  );
};
