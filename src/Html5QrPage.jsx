// QRScanner.jsx
import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = ({ onScan, onFinishScan }) => {
  const qrRef = useRef(null);

  useEffect(() => {
    const qrRegionId = "qr-reader";
    const html5QrCode = new Html5Qrcode(qrRegionId);
    qrRef.current = html5QrCode;

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          onScan(decodedText);
          html5QrCode.stop().then(() => {
            html5QrCode.clear();
            if (onFinishScan) onFinishScan(); // 👈 informar que ya terminó
          });
        },
        (errorMessage) => {
          // puedes ignorar errores
        }
      )
      .catch((err) => {
        console.error("Error al iniciar lector QR", err);
      });

    return () => {
      if (qrRef.current) {
        qrRef.current
          .stop()
          .then(() => qrRef.current.clear())
          .catch((err) => {
            console.warn("No se pudo detener correctamente el escáner", err);
          });
      }
    };
  }, [onScan, onFinishScan]);

  return (
    <div
      id="qr-reader"
      style={{ width: "100%", maxWidth: 350, margin: "0 auto" }}
    ></div>
  );
};

export default QRScanner;
