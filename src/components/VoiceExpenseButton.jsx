import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import toast from "react-hot-toast";

const VoiceExpenseButton = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch (_) {}
    };
  }, []);

  const toggle = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice not supported in this browser. Try Chrome.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onTranscript?.(text);
      toast.success("Voice captured: " + text);
    };
    recognition.onerror = () => {
      toast.error("Voice capture failed");
      setListening(false);
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    toast("Listening… speak your expense", { icon: "🎤" });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`card-btn ${listening ? "bg-red-50 text-red-700 border-red-200" : ""}`}
      title="Voice expense"
    >
      {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      {listening ? "Stop" : "Voice"}
    </button>
  );
};

export default VoiceExpenseButton;
