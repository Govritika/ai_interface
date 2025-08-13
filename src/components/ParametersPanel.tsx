import { useApp } from "../context/AppContext";

export default function ParametersPanel() {
  const { parameters, setParameters } = useApp();

  return (
    <div className="p-4 rounded bg-white dark:bg-gray-800 shadow-sm">
      <label className="block mb-2 text-sm font-medium">Temperature</label>
      <input
        aria-label="temperature"
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={parameters.temperature}
        onChange={(e) =>
          setParameters({ ...parameters, temperature: Number(e.target.value) })
        }
        className="w-full"
      />
      <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
        <div>Value: {parameters.temperature}</div>
        <div>
          Max tokens:
          <input
            aria-label="max tokens"
            type="number"
            value={parameters.maxTokens}
            min={1}
            max={4000}
            onChange={(e) =>
              setParameters({
                ...parameters,
                maxTokens: Number(e.target.value),
              })
            }
            className="ml-2 p-1 w-20 rounded bg-white dark:bg-gray-700 border"
          />
        </div>
      </div>
    </div>
  );
}
