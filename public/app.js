let dataset = null;
let clubsMap = {};
let groups = {}; // key: "club_id|season", value: array of player objects
let allSeasons = new Set();
let allClubs = [];

const clubSelect = document.getElementById('club-select');
const seasonSelect = document.getElementById('season-select');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');
const statsList = document.getElementById('stats-list');

async function init() {
  try {
    const response = await fetch('./players.json');
    dataset = await response.json();
    processData();
    populateUI();
  } catch (error) {
    console.error('Error loading data:', error);
    resultsContainer.innerHTML = '<p class="text-red-500">Failed to load dataset.</p>';
  }
}

function processData() {
  // Build clubs map
  dataset.clubs.forEach(club => {
    clubsMap[club.id] = club;
    allClubs.push(club);
  });

  // Sort clubs alphabetically
  allClubs.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  let edgeCount = 0;

  // Build groups and seasons
  dataset.players.forEach(player => {
    player.stints.forEach(stint => {
      allSeasons.add(stint.season);
      
      const key = `${stint.club_id}|${stint.season}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(player);
    });
  });

  // Calculate distinct edges (for stats)
  for (const key in groups) {
    const players = groups[key];
    if (players.length > 1) {
      // n * (n - 1) / 2 edges per group
      edgeCount += (players.length * (players.length - 1)) / 2;
    }
  }

  // Update stats
  statsList.innerHTML = `
    <li><strong>Players:</strong> ${dataset.meta.player_count || dataset.players.length}</li>
    <li><strong>Clubs:</strong> ${dataset.meta.club_count || dataset.clubs.length}</li>
    <li><strong>Connections:</strong> ~${edgeCount}</li>
  `;
}

function populateUI() {
  // Populate Clubs
  clubSelect.innerHTML = '<option value="">-- Select Club --</option>';
  allClubs.forEach(club => {
    const option = document.createElement('option');
    option.value = club.id;
    option.textContent = `${club.name} (${club.country})`;
    clubSelect.appendChild(option);
  });
  clubSelect.disabled = false;

  // Populate Seasons
  seasonSelect.innerHTML = '<option value="">-- Select Season --</option>';
  const sortedSeasons = Array.from(allSeasons).sort((a, b) => b.localeCompare(a));
  sortedSeasons.forEach(season => {
    const option = document.createElement('option');
    option.value = season;
    option.textContent = season;
    seasonSelect.appendChild(option);
  });
  seasonSelect.disabled = false;

  searchBtn.disabled = false;
  searchBtn.addEventListener('click', handleSearch);
}

function handleSearch() {
  const clubId = clubSelect.value;
  const season = seasonSelect.value;

  if (!clubId || !season) {
    resultsContainer.innerHTML = '<p class="text-orange-500">Please select both a club and a season.</p>';
    return;
  }

  const key = `${clubId}|${season}`;
  const players = groups[key] || [];

  if (players.length === 0) {
    resultsContainer.innerHTML = '<p class="text-gray-500 italic">No World Cup players found for this club and season combination.</p>';
    return;
  }

  const clubName = clubsMap[clubId] ? clubsMap[clubId].name : 'Unknown Club';

  let html = `<h3 class="text-xl font-semibold mb-4 text-blue-600">${players.length} Player${players.length > 1 ? 's' : ''} at ${clubName} in ${season}</h3>`;
  
  html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">';
  players.forEach(p => {
    html += `
      <div class="border border-gray-200 rounded p-4 bg-gray-50 shadow-sm">
        <div class="font-bold text-lg">${p.name}</div>
        <div class="text-sm text-gray-600 mt-1">${p.country} • ${p.position}</div>
      </div>
    `;
  });
  html += '</div>';

  if (players.length > 1) {
    html += `
      <div class="mt-6 p-4 bg-blue-50 border border-blue-100 rounded text-blue-800 text-sm">
        <strong>Graph Insight:</strong> These ${players.length} players all share edges with each other in the social graph for this season.
      </div>
    `;
  }

  resultsContainer.innerHTML = html;
}

// Start
init();