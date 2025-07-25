import { useState } from "react";
import QRScanner from "./QRScanner";

export const QrApp = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedText, setScannedText] = useState("")
  return (
 <div className="container py-5 text-center">
      <h1 className="mb-4">Lector de QR</h1>

      <button className="btn btn-primary mb-3" onClick={() => setShowScanner(!showScanner)}>
        {showScanner ? "Cerrar cámara" : "Abrir cámara"}
      </button>

      {showScanner && <QRScanner onScan={setScannedText} />}

      {scannedText && (
        <div className="mt-4">
          <p><strong>Contenido escaneado:</strong></p>
          <p className="text-break">{scannedText}</p>

          {scannedText.startsWith("http://") || scannedText.startsWith("https://") ? (
            <a href={scannedText} className="btn btn-success mt-2" target="_blank" rel="noopener noreferrer">
              Visitar
            </a>
          ) : (
            <p className="text-muted mt-2">Este QR no es una URL válida.</p>
          )}
        </div>
      )}
    </div>
  );
};
