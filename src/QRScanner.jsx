// src/QRScanner.jsx
import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = ({ onScan }) => {
  useEffect(() => {
    const qrRegionId = "qr-reader";
    const html5QrCode = new Html5Qrcode(qrRegionId);

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          onScan(decodedText); // enviar texto escaneado al padre
          html5QrCode.stop().then(() => html5QrCode.clear());
        },
        (errorMessage) => {
          // Silenciado para evitar spam de consola
        }
      )
      .catch((err) => {
        console.error("Error al iniciar lector QR", err);
      });

    return () => {
      html5QrCode.stop().then(() => html5QrCode.clear());
    };
  }, [onScan]);

  return (
    <div id="qr-reader" style={{ width: "100%", maxWidth: 350, margin: "0 auto" }}></div>
  );
};

export default QRScanner;
