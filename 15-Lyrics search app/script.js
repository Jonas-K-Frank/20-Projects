const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const more = document.getElementById('more')

const apiURL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
    const response = await fetch(`${apiURL}/suggest/${term}`);
    const data = await response.json();

    showData(data);
}

// Show song or artist
function showData(data) {

    result.innerHTML = `
    <ul class="songs">
    ${data.data.map(song => `
    <li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Se teksten</button>
    </li>`).join('')
    }
    </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `
${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Forrige</button>` : ''}
${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Næste</button>` : ''}
`;
    } else {
        more.innerHTML = "";
    }
};


// Get prev and next results
async function getMoreSongs(url) {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await response.json();

    showData(data);
};

// Get lyrics

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');

    result.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
    `;

    more.innerHTML = "";
};

// Event listeners
form.addEventListener('submit', event => {
    event.preventDefault();

    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Husk at skrive noget i søgefeltet')
    } else {
        searchSongs(searchTerm);
    }
});

// Get lyrics button click
result.addEventListener('click', event => {
    const clickedElement = event.target;


    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
})