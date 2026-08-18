# Hatchway

<div align="center">

![Hatchway](https://img.shields.io/badge/Hatchway-Hatch%20a%20Founder-00f2fe?style=for-the-badge)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A copilot that helps early-stage founders find the right rooms, runways, and stages to share their ideas with the world.**

[Explore Demo](#getting-started) • [Report Bug](https://github.com/brisqdev/Hatchway/issues) • [Request Feature](https://github.com/brisqdev/Hatchway/issues)

</div>

---

## Overview

Hatchway is an AI-powered founder pipeline that takes the guesswork out of fundraising. Founders enter their product name, a short description, and their target city, and Hatchway returns pitch opportunities, VC conferences, and local investor meetups matched to their product and location.

## Key Features

- **Founder Match Engine** — Enter your app name, a brief description, and your target city to instantly query relevant funding channels.
- **Asynchronous Match Generation** — Interactive UI with loading indicators and locked inputs while fetching live AI recommendations.
- **Contextual Gemini Pipeline** — Uses the Google Gemini API to evaluate product positioning and return structured investor and conference matches.
- **Dark-Mode Interface** — Component-driven layout with custom teal gradients and clean input controls.

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Backend:** Ruby / custom API router
- **State & Async:** React Hooks, Fetch API

## Getting Started

**Prerequisites:** Node.js v18+ and npm.

1. Clone the repository:

```bash
git clone https://github.com/brisqdev/Hatchway.git
cd Hatchway
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

## Building for Production

Generate an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## License

Distributed under the MIT License. See `LICENSE` for details.
