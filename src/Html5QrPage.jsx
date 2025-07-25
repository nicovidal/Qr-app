// src/pages/Html5QrPage.jsx
import { useState } from "react";
import QRScanner from "./QRScanner";


export default function Html5QrPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedText, setScannedText] = useState("");

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Escáner con html5-qrcode</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowScanner(!showScanner)}>
        {showScanner ? "Cerrar cámara" : "Abrir cámara"}
      </button>

      {showScanner && <QRScanner onScan={setScannedText} />}

      {scannedText && (
        <div className="mt-4">
          <p><strong>Contenido escaneado:</strong></p>
          <p className="text-break">{scannedText}</p>
          {scannedText.startsWith("http") && (
            <a href={scannedText} className="btn btn-success mt-2" target="_blank" rel="noopener noreferrer">
              Visitar
            </a>
          )}
        </div>
      )}
    </div>
  );
}
