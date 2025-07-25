import { useState } from "react";
import QRScanner from "./QRScanner";

export const QrApp = () => {
  const [showScanner, setShowScanner] = useState(false);
  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4">Lector de QR</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowScanner(!showScanner)}
      >
        {showScanner ? "Cerrar cámara" : "Abrir cámara"}
      </button>

      {showScanner && <QRScanner />}
    </div>
  );
};
