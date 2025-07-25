import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = ({ onScan }) => {
  const html5QrCodeRef = useRef(null);
  const isScanningRef = useRef(false);

  useEffect(() => {
    const qrRegionId = "qr-reader";

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
    }

    const startScanner = async () => {
      try {
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            onScan(decodedText);
            // No detener acá para evitar el error
          },
          (errorMessage) => {
            // ignorar errores
          }
        );
        isScanningRef.current = true;
      } catch (err) {
        console.error("Error al iniciar lector QR", err);
        isScanningRef.current = false;
      }
    };

    startScanner();

    return () => {
      if (isScanningRef.current && html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current.clear())
          .catch((err) => {
            console.warn("No se pudo detener correctamente el escáner", err);
          });
        isScanningRef.current = false;
      }
    };
  }, [onScan]);

  return (
    <div id="qr-reader" style={{ width: "100%", maxWidth: 350, margin: "0 auto" }}></div>
  );
};

export default QRScanner;
