

import ThemeToggle from "./components/ThemeToggle";
import ModelSelector from "./components/ModelSelector";
import ParametersPanel from "./components/ParametersPanel";
import PromptEditor from "./components/PromptEditor";
import ChatOutput from "./components/ChatOutput";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">AI Interface Prototype</h1>
          <ThemeToggle />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 space-y-4">
            <ModelSelector />
            <ParametersPanel />
          </aside>

          <main className="lg:col-span-3 space-y-4">
            <PromptEditor />
            <ChatOutput />
          </main>
        </div>
      </div>
    </div>
  );
}
