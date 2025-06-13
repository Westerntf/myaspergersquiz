import html2canvas from "html2canvas";
import { useRef } from "react";

export default function ShareImageButton({ children }) {
  const resultRef = useRef(null);

  const handleDownload = async () => {
    const canvas = await html2canvas(resultRef.current);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "quiz-results.png";
    link.click();
  };

  return (
    <>
      <div ref={resultRef}>{children}</div>
      <button onClick={handleDownload}>Download as Image</button>
    </>
  );
}