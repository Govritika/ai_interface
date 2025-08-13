import { useApp } from "../context/AppContext";
import ChatBubble from "./ChatBubble";

export default function ChatOutput() {
  const { chat } = useApp();

  const copyLast = async () => {
    const last = [...chat].reverse().find((m) => m.role === "assistant");
    if (!last) return alert("No assistant response to copy.");
    try {
      await navigator.clipboard.writeText(last.content);
      alert("Copied assistant message.");
    } catch {
      alert("Copy not supported.");
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(chat, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 rounded bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Conversation</h3>
        <div className="flex gap-2">
          <button
            onClick={copyLast}
            className="px-2 py-1 border rounded text-sm"
          >
            Copy last
          </button>
          <button
            onClick={downloadJSON}
            className="px-2 py-1 border rounded text-sm"
          >
            Download JSON
          </button>
        </div>
      </div>

      <div className="chat-scroll flex flex-col">
        {chat.map((m) => (
          <ChatBubble
            key={m.id}
            text={m.content}
            sender={m.role === "system" ? "system" : m.role}
          />
        ))}
      </div>
    </div>
  );
}
