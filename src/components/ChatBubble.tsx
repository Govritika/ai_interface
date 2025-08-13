
interface ChatBubbleProps {
  text: string;
  sender: "user" | "assistant" | "system";
}

export default function ChatBubble({ text, sender }: ChatBubbleProps) {
  const classes =
    sender === "user"
      ? "bg-blue-600 text-white self-end ml-auto max-w-xl"
      : sender === "assistant"
      ? "bg-gray-100 dark:bg-gray-700 text-black dark:text-white mr-auto max-w-xl"
      : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white mr-auto max-w-xl";

  return (
    <div className={`flex w-full`}>
      <div
        className={`p-3 rounded-lg mb-2 whitespace-pre-wrap ${classes}`}
        style={{ wordBreak: "break-word" }}
      >
        <div className="text-sm">{text}</div>
        <div className="text-xs text-gray-400 mt-2 relative ml-77">
          {new Date(new Date()).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
