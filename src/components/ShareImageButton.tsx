import html2canvas from "html2canvas";
import { useRef, ReactNode, CSSProperties } from "react";

interface ShareImageButtonProps {
  children: ReactNode;
  buttonStyle?: CSSProperties;
  buttonLabel?: string;
}

export default function ShareImageButton({
  children,
  buttonStyle,
  buttonLabel = "Download as Image",
}: ShareImageButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "quiz-results.png";
    link.click();
  };

  return (
    <div>
      <div ref={ref}>{children}</div>
      <button onClick={handleDownload} style={buttonStyle}>
        {buttonLabel}
      </button>
    </div>
  );
}