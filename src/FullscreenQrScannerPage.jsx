import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function FullscreenQrScannerPage() {
  const qrRef = useRef(null);
  const containerRef = useRef(null);
  const isRunning = useRef(false);
  const [scannedText, setScannedText] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    if (!cameraOpen) return; // Si cámara no está abierta no hacemos nada

    const qrRegionId = "qr-reader";
    const container = containerRef.current;

    // Limpiar contenedor antes de iniciar
    if (container) container.innerHTML = "";

    const html5QrCode = new Html5Qrcode(qrRegionId);
    qrRef.current = html5QrCode;

    const stopScanner = () => {
      if (isRunning.current && qrRef.current) {
        qrRef.current
          .stop()
          .then(() => qrRef.current.clear())
          .catch(() => {});
        isRunning.current = false;
      }
      // Salir de pantalla completa
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setCameraOpen(false);
    };

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 300, height: 300 } },
        (decodedText) => {
          setScannedText(decodedText);
          stopScanner();
        },
        (error) => {
          // errores de escaneo se pueden ignorar
        }
      )
      .then(() => {
        isRunning.current = true;
        // Solicitar pantalla completa en el contenedor
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
        }
      })
      .catch((err) => {
        console.error("Error iniciando cámara:", err);
      });

    // Si el usuario sale manualmente del modo pantalla completa, detener cámara
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        stopScanner();
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      stopScanner();
    };
  }, [cameraOpen]);

  return (
    <div className="container py-5 text-center">
      <h2>Escáner QR en pantalla completa</h2>

      {!cameraOpen && (
        <button
          className="btn btn-primary mb-3"
          onClick={() => {
            setScannedText("");
            setCameraOpen(true);
          }}
        >
          Abrir cámara en pantalla completa
        </button>
      )}

      <div
        id="qr-reader"
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
          display: cameraOpen ? "block" : "none",
          position: "relative",
          height: "100vh",
          backgroundColor: "#000",
        }}
      />

      {scannedText && (
        <div className="mt-4">
          <p>
            <strong>Contenido escaneado:</strong>
          </p>
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
