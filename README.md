# SquadConnect

SquadConnect is a web application built for the AI Agent Hackathon - The Squad Graph. It visualizes the hidden connections between players at the 2026 World Cup based on their shared club histories.

## Features
- **Teammate Finder:** Select a club and a season to instantly see all World Cup players who shared that roster.
- **In-Browser Processing:** The dataset is fetched and processed entirely on the client, building the graph adjacency groups dynamically without needing a backend.
- **Responsive UI:** Built with Tailwind CSS for a clean, fast, and responsive user experience.

## Data Processing Logic
The application fetches the provided `players.json` dataset and processes it to build the social graph edges.
The core logic groups players by `(club_id, season)`. Any players appearing in the same group share a mutually connected edge.
*We strictly join on `club_id` (Wikidata QID), never on club name, avoiding false edges from youth academies vs senior teams.*

## Architecture & Tech Stack
- **Frontend:** Plain HTML, CSS, JavaScript (Vanilla JS).
- **Styling:** Tailwind CSS (via CDN for zero-build static deployment).
- **Deployment:** Vercel (Static directory deployment).

We opted for a zero-build static architecture to guarantee a perfectly stable deployment while reliably processing the 1200+ player dataset in milliseconds on the client side.

## How to Run Locally
1. Clone the repository.
2. Navigate to the `public` directory.
3. Serve the directory using any static file server, for example:
   ```bash
   npx serve .
   ```
4. Open your browser to the provided local URL (usually `http://localhost:3000`).

## Live Demo
[SquadConnect on Vercel](https://squad-connect-graph.vercel.app)
