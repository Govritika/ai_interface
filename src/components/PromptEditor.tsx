import  { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { v4 as uuid } from "uuid";

export default function PromptEditor() {
  const {
    prompt,
    setPrompt,
    templates,
    setPrompt: _setPrompt,
    addMessage,
    loadTemplatesFromLocal,
  } = useApp(); 

  useEffect(() => {
    loadTemplatesFromLocal();
  }, []);

  const saveTemplate = () => {
    const raw = localStorage.getItem("custom_templates") || "[]";
    const arr = JSON.parse(raw);
    const t = {
      id: uuid(),
      title: `Custom ${new Date().toLocaleTimeString()}`,
      prompt,
    };
    arr.push(t);
    localStorage.setItem("custom_templates", JSON.stringify(arr));
    alert("Template saved locally.");
  };

  return (
    <div className="p-4 rounded bg-white dark:bg-gray-800 shadow-sm">
      <label className="block mb-2 text-sm font-medium">Prompt</label>
      <textarea
        aria-label="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        className="w-full p-2 border rounded bg-white dark:bg-gray-700"
        placeholder="Type or choose a template..."
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            if (!prompt.trim()) return;
            const user = {
              id: uuid(),
              role: "user" as const,
              content: prompt,
              createdAt: new Date().toISOString(),
            };
            addMessage(user);
            setTimeout(() => {
              addMessage({
                id: uuid(),
                role: "assistant",
                content: `Mock reply for: "${prompt}"`,
                createdAt: new Date().toISOString(),
              });
            }, 800);
            setPrompt("");
          }}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Send
        </button>

        <button onClick={saveTemplate} className="px-3 py-2 rounded border">
          Save template
        </button>

        <select
          aria-label="load template"
          onChange={(e) => {
            const id = e.target.value;
            const t = templates.find((x) => String(x.id) === id);
            if (t) setPrompt(t.prompt);
          }}
          className="p-2 border rounded bg-white dark:bg-gray-700"
        >
          <option value="">Load template…</option>
          {templates.map((t) => (
            <option key={String(t.id)} value={String(t.id)}>
              {t.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
