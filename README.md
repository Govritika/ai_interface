# AI Interface — Frontend Prototype

## Research
Platforms reviewed:
- OpenAI Playground — simple param UI & live response preview.
- Hugging Face Spaces — community templates & sharing.
- Anthropic Claude UI — safety/clarity features.

Chosen features:
Model selector, prompt editor with templates, parameters sliders, chat with copy/download, theme toggle, responsive layout.

## Design
Figma mockup: <Figma link>
Tailwind mapping:
- Spacing: p-4, p-6
- Typography: text-base, text-xl
- Primary: bg-blue-600

## Development
Tech stack: Vite + React + TypeScript (strict), Tailwind CSS, Framer Motion, Storybook
How to run:
1. npm install
2. npm run dev
Mock data: src/data/models.json and src/data/templates.json
Known limitations: No real backend; responses are mocked.
