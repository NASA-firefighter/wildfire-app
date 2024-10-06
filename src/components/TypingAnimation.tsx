import React, { useEffect, useState } from "react";
import "./TypingAnimation.css";

interface TypingAnimationProps {
  text: string;
  onComplete: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 50); // Adjust the delay to control the typing speed
      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [index, text, onComplete]);

  return (
    <span className="text-container">
      <span>{displayedText}</span>
      {index < text.length && (
        <span className="typing-dots">
          <span className="dot"></span>
        </span>
      )}
    </span>
  );
};

export default TypingAnimation;
