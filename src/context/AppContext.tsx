import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
};
export type Model = { id: string; name: string };
export type Template = { id: string; title: string; prompt: string };

type AppContextType = {
  models: Model[];
  templates: Template[];
  selectedModel: Model | null;
  setSelectedModel: (m: Model | null) => void;
  parameters: { temperature: number; maxTokens: number };
  setParameters: (p: { temperature: number; maxTokens: number }) => void;
  prompt: string;
  setPrompt: (s: string) => void;
  chat: Message[];
  addMessage: (m: Message) => void;
  loadTemplatesFromLocal: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [models, setModels] = useState<Model[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [parameters, setParameters] = useState<{
    temperature: number;
    maxTokens: number;
  }>({
    temperature: 0.7,
    maxTokens: 200,
  });
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState<Message[]>([]);

  useEffect(() => {
    import("../data/models.json").then((m) => setModels(m.default));
    import("../data/templates.json").then((t) =>
      setTemplates(
        t.default.map((tpl: any) => ({
          ...tpl,
          id: String(tpl.id), 
        }))
      )
    );

  }, []);

  useEffect(() => {
    if (models.length && !selectedModel) setSelectedModel(models[0]);
  }, [models, selectedModel]);

  useEffect(() => {
    if (chat.length === 0) {
      setChat([
        {
          id: "sys-1",
          role: "system",
          content: "Welcome! Select a model, type a prompt, and press Send.",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  }, []); 

  const addMessage = (m: Message) => setChat((c) => [...c, m]);

  const loadTemplatesFromLocal = () => {
    const raw = localStorage.getItem("custom_templates");
    if (!raw) return;
    try {
      const arr = JSON.parse(raw) as Template[];
      setTemplates((prev) => [...prev, ...arr]);
    } catch (err) {
      console.error("Failed to parse local templates", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        models,
        templates,
        selectedModel,
        setSelectedModel,
        parameters,
        setParameters,
        prompt,
        setPrompt,
        chat,
        addMessage,
        loadTemplatesFromLocal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
