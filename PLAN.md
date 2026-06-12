# Project Plan: The Squad Graph

## The Idea
"SquadConnect" - An interactive, web-based visualization tool that maps the social graph of 2026 World Cup players based on their shared club histories. It allows users to explore connections between players, find teammates for specific clubs and seasons, and discover the "degrees of separation" between any two players in the tournament. 

## Target User
Football fans, sports journalists, and data enthusiasts looking to explore the hidden connections between international players at the 2026 World Cup.

## Core Features
1.  **Teammate Finder:** A query interface where users can select a club and a season to see all World Cup players who were on that roster together.
2.  **Interactive Graph Visualization:** A visual network graph showing players as nodes and shared club seasons as edges. Users can click on nodes to see player details and highlight connections.
3.  **Degrees of Separation (Stretch Goal):** A tool to find the shortest path of shared club connections between any two players (e.g., how is Lionel Messi connected to Jude Bellingham?).
4.  **Strongest Links (Stretch Goal):** A dashboard highlighting the clubs that have produced the most connections among the World Cup squads.

## Tech Stack
*   **Frontend:** Next.js (React) - Provides a robust framework for building interactive UIs and API routes in a single repository.
*   **Styling:** Tailwind CSS - For rapid, responsive, and clean UI development.
*   **Graph Visualization:** `react-force-graph` (or `vis-network`) - Ideal for rendering interactive, force-directed graphs in the browser.
*   **Backend & Data Processing:** Next.js API Routes (Node.js) - The dataset (~1200 players, ~1500 clubs) is small enough to be loaded and processed in-memory on the server side for fast querying.
*   **Deployment:** Vercel - Seamless integration with Next.js and meets the hackathon requirement.

## Architecture
*   **Data Layer:** The `players.json` and `gaps.json` files from the provided CDN will be downloaded during the build step or fetched on server startup. An in-memory graph structure (adjacency list) will be built to represent nodes (players) and edges (shared club + season).
*   **API Layer (Next.js):**
    *   `/api/teammates?club_id=X&season=Y`: Returns a list of players.
    *   `/api/path?playerA=X&playerB=Y`: Uses Breadth-First Search (BFS) to find the shortest path.
    *   `/api/graph`: Returns the full or filtered node/edge list for the visualization.
*   **UI Layer (React):** Consumes the API to render the search forms, result lists, and the interactive canvas.

## Mapping to Rubric
*   **Data accuracy and coverage (20%):** The app will strictly use the provided JSON dataset without inventing data. It will handle the data exactly as specified (joining on `club_id` and `season`, not club name).
*   **Graph correctness (20%):** Edges will be built using the exact logic: group players by `(club_id, season)`; everyone in a group of ≥2 is mutually connected.
*   **Query and visualization usefulness (20%):** The UI will be clean and intuitive. The force-directed graph will provide a compelling visual way to explore the data, while the explicit UI for the "Teammates" query satisfies the core requirement.
*   **Code quality (20%):** The Next.js repository will be modular, with clear separation between data processing logic, API routes, and React components. Code will be well-commented.
*   **Write-up clarity (20%):** The `README.md` and TAIKAI project page will comprehensively explain the architecture, data processing logic, and how to run the project.

## Milestones for Build Phase
1.  **Data Ingestion & Graph Logic:** Fetch the JSON, parse it, and implement the core grouping logic (by `club_id` + `season`) and edge generation in Node.js.
2.  **API Development:** Build the Next.js API routes for the core query (teammates) and the stretch goal query (degrees of separation).
3.  **Frontend Core:** Build the UI for the teammate finder (dropdowns for club and season) and display results.
4.  **Frontend Visualization:** Integrate the graph visualization library and feed it data from the API.
5.  **Refinement & Deployment:** Polish the UI, ensure responsive design, deploy to Vercel, and verify the live build.
6.  **Documentation:** Write the `README.md` and prepare the TAIKAI submission text.

## Definition of Done
The project is complete when a user can visit the Vercel URL, select a club and season to see shared players, view a visual representation of the player graph, and the source code is fully documented and pushed to the GitHub repository.
