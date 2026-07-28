# CPG AI Hub — Redesigned package

Open `index.html` in a browser or deploy the folder to any static host.

## Main updates
- Rebuilt the connected workflow into one 3D source and exactly three clean branches.
- Removed the Design Handoff card.
- Moved the interactive tool detail panel below the diagram so connector lines never cross text.
- Replaced the heavy animated gradient with thin, restrained CPG brand connectors.
- Rebuilt Manager View as a visual decision dashboard with capacity, adoption, priority, department impact bars, and an opportunity pipeline.
- Preserved English/Vietnamese switching and form counter updates.

## Structure
- `index.html`
- `index.css`
- `app.js`
- `assets/brand`
- `assets/tool-logos`
- `assets/workflow`
- `assets/source-uploads` (original supplied reference assets)

## Workflow connector motion fix
The workflow now uses a neutral-gray SVG rail plus embedded SVG `animate` elements. A red-to-orange-to-gold luminous dash travels continuously from the 3D design source to each of the three output cards. Moving circle tracers were removed.


## Multi-page structure
- `index.html` — Home
- `learn.html` — What is AI, Quick Videos, AI History
- `tools.html` — AI Tools, Connected Workflow, Quick Start
- `insights.html` — Global Leaders, AI Agents
- `submit-idea.html` — Submit Idea
- `manager.html` — Manager View

The original CSS, visual components, sections, and JavaScript are retained. Only navigation links and page-level section visibility were changed.
