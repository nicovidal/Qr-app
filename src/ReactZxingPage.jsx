import { useRef, useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

export default function ReactZxingPage() {
  const videoRef = useRef(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedText, setScannedText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (showScanner && videoRef.current) {
      codeReader
        .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            setScannedText(result.getText());
            // detener luego de detectar
            codeReader.reset();
            setShowScanner(false);
          } else if (err && !(err.name === "NotFoundException")) {
            setError(err);
          }
        });
    }

    return () => {
      codeReader.reset();
    };
  }, [showScanner]);

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Escáner con react-zxing</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setError(null);
          setScannedText("");
          setShowScanner((prev) => !prev);
        }}
      >
        {showScanner ? "Cerrar cámara" : "Abrir cámara"}
      </button>

      <div className="d-flex justify-content-center">
        <video
          ref={videoRef}
          style={{
            display: showScanner ? "block" : "none",
            width: "100%",
            maxWidth: 350,
          }}
        />
      </div>

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
