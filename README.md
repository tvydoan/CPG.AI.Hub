# CPG AI Hub — Latest Package (v2)

The complete, fully-functional multi-page digital office web app for CPG Vietnam staff.

Open `index.html` in a web browser or deploy the `CPG.AI.Hub-latest` folder directly to any static host (GitHub Pages, Netlify, IIS, Vercel).

---

## Key Features & Redesign Highlights

### 1. Anthropic & MIT Minimalist Aesthetic
- **Pure White Theme**: Clean `#ffffff` background with crisp, high-contrast dark typography (`#111827`, `#4b5563`).
- **Zero Icon Noise**: Removed decorative icons from buttons and headers to achieve an editorial, publication-tier look inspired by Anthropic and MIT Architecture (`ashleylouie.com`).
- **Architectural Rules Callout**: High-contrast card with an architectural left red accent border (`border-left: 4px solid #D10000`) and simple underline link `Read Data Safety Guide →`.

### 2. Iconless Anthropic Data Safety Drawer
- **Pure Typography**: Replaced colorful pastel background pills with clean white cards, subtle hairline gray borders, and small `01`, `02`, `03` numbers.
- **Iconless Layout**: Clean policy cards for *Do NOT upload*, *Check first*, and *Safe to use*.
- **Slide Panel**: Slides in smoothly from the right, blur backdrop overlay, closes with `×` or Escape key.

### 3. EN | VI Language Toggle
- **Prominent Navbar Toggle**: High-contrast `EN | VI` pill button in the top-right navbar next to *Submit Idea*.
- **Full Site Translation**: Switches all page content, headings, and dynamic panels between English and Vietnamese seamlessly.

### 4. Cross-Page Synchronized Task Pills
- Clicking any task pill on Home (`Write & Summarize`, `Design & Visualize`, `Review & Compare`, `Research & Analyze`) passes the selected task to `tools.html?need=design#task-help`.
- `tools.html` automatically pre-selects the matching task tab and displays its practical workflow, copyable prompt, and safety notes.

### 5. Practical Architectural AI Workflow
- **4-Stage Pipeline**:
  - `01 SOURCE`: Revit / SketchUp / AutoCAD
  - `02 RENDER`: D5 AI / Veras / Midjourney
  - `03 MOTION`: Kling AI
  - `04 DECK & SPECS`: Claude / Copilot
- Shows exact step-by-step role descriptions and copyable prompts for each software without disruptive page shifts.

---

## File Structure

```
CPG.AI.Hub-latest/
├── index.html        # Home (Hero, Overview, Basics, Quick Starts, AI Rules)
├── learn.html        # Learn (What is AI, Quick Videos, AI History Timeline)
├── tools.html        # Tools (Which Tool? Quick Start, Connected AI Workflows)
├── insights.html     # Insights (Global Leaders, AI Agents & AIOS)
├── submit-idea.html  # Staff Idea Submission (SharePoint / Database Ready)
├── manager.html      # Manager View (Leadership & Capacity Analytics)
├── css/
│   └── index.css     # Clean CSS System (Anthropic White & MIT Theme)
├── js/
│   └── app.js        # Core App Logic (I18n, Task Sync, Drawers, Workflows)
├── images/           # Tool & Software Logos (Revit, SketchUp, AutoCAD, etc.)
├── README.md         # Package documentation
└── DEPLOY.txt        # Host deployment instructions
```

---

## Running Locally

To run locally using Python:
```bash
python -m http.server 7890 --directory "CPG.AI.Hub-latest"
```
Then open `http://localhost:7890/` in your browser.
