import { useZxing } from "react-zxing";

export default function ReactZxingPage() {
  const { ref, error } = useZxing({
    onDecodeResult(result) {
      alert("QR detectado: " + result.getText());
    },
  });

  return (
    <div className="container py-5 text-center">
      <h2>Escáner con react-zxing</h2>
      {error && <p className="text-danger">{error.message}</p>}
      <video ref={ref} style={{ width: "100%", maxWidth: 350 }} />
    </div>
  );
}
