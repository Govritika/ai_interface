import { useApp } from "../context/AppContext";

export default function ModelSelector() {
  const { models, selectedModel, setSelectedModel } = useApp();

  return (
    <div className="p-4 rounded bg-white dark:bg-gray-800 shadow-sm">
      <label className="block mb-2 text-sm font-medium">Model</label>
      <select
        aria-label="Select model"
        value={selectedModel?.id || ""}
        onChange={(e) => {
          const id = e.target.value;
          const m = models.find((x) => x.id === id) || null;
          setSelectedModel(m);
        }}
        className="w-full p-2 border rounded bg-white dark:bg-gray-700"
      >
        <option value="">— choose model —</option>
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  );
}
