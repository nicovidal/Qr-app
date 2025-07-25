import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = ({ onScan, onFinishScan }) => {
  const qrRef = useRef(null);
  const isRunning = useRef(false);

  useEffect(() => {
    const qrRegionId = "qr-reader";
    const container = document.getElementById(qrRegionId);

    // Limpia el contenedor antes de iniciar para evitar duplicados
    if (container) container.innerHTML = "";

    const html5QrCode = new Html5Qrcode(qrRegionId);
    qrRef.current = html5QrCode;

    if (!isRunning.current) {
      html5QrCode
        .start(
          { facingMode: "environment" },
          { fps: 20, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            onScan(decodedText);
            if (isRunning.current) {
              html5QrCode
                .stop()
                .then(() => html5QrCode.clear())
                .catch(() => {});
              isRunning.current = false;
              if (onFinishScan) onFinishScan();
            }
          },
          (error) => {
            // Ignora errores menores
          }
        )
        .then(() => {
          isRunning.current = true;
        })
        .catch((err) => {
          console.error("Error iniciando cámara:", err);
        });
    }

    return () => {
      if (isRunning.current && qrRef.current) {
        qrRef.current
          .stop()
          .then(() => qrRef.current.clear())
          .catch(() => {});
        isRunning.current = false;
      }
    };
  }, [onScan, onFinishScan]);

  return (
    <div
      id="qr-reader"
      style={{ width: "100%", maxWidth: 350, margin: "0 auto" }}
    />
  );
};

export default QRScanner;
