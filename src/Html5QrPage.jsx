import { useState } from "react";
import QRScanner from "./QRScanner";
import { Link } from "react-router-dom";

export default function Html5QrPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedText, setScannedText] = useState("");

  return (
 <div className="container py-5 text-center">
      <h2 className="mb-4">Escáner con html5-qrcode</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "1rem" }}>
        <button
          className="btn btn-primary"
          onClick={() => setShowScanner(!showScanner)}
        >
          {showScanner ? "Cerrar cámara" : "Abrir cámara"}
        </button>

        <Link to="/fullscreen-qr" className="btn btn-secondary">
          Abrir cámara en pantalla completa
        </Link>
      </div>

      {showScanner && <QRScanner onScan={setScannedText} />}

      {scannedText && (
        <div className="mt-4">
          <p><strong>Contenido escaneado:</strong></p>
          <p className="text-break">{scannedText}</p>
          {scannedText.startsWith("http") && (
            <a
              href={scannedText}
              className="btn btn-success mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar
            </a>
          )}
        </div>
      )}
    </div>
  );
}
