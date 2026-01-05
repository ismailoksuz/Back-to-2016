let allNews = [], allSongs = [], allMovies = [];
let currentTab = 'news';
const listContainer = document.getElementById('list-container');
const searchInput = document.getElementById('search-input');
const pageTitle = document.getElementById('page-title');
function updateClock() {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('live-clock').innerText = `${d}.${m}.2016 ${h}:${min}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();
function switchTab(tab) {
    currentTab = tab;
    document.getElementById('tab-news').classList.toggle('selected', tab === 'news');
    document.getElementById('tab-songs').classList.toggle('selected', tab === 'songs');
    document.getElementById('tab-movies').classList.toggle('selected', tab === 'movies');
    pageTitle.innerText = tab === 'songs' ? 'HIT SONGS' : (tab === 'movies' ? 'TOP MOVIES' : '');
    pageTitle.style.display = tab === 'news' ? 'none' : 'block';
    render(searchInput.value);
}
function render(filterTerm = '') {
    listContainer.innerHTML = '';
    const term = filterTerm.toLowerCase();
    
    if (currentTab === 'news') {
        const sortedNews = [...allNews].sort((a, b) => new Date(b.Date) - new Date(a.Date));
        const filtered = sortedNews.filter(item => item.News.toLowerCase().includes(term));
        
        filtered.forEach((item, index) => {
            const post = document.createElement('div');
            post.className = 'post';
            const dateParts = item.Date.split('-');
            const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
            
            post.innerHTML = `
                <span class="rank">${index + 1}</span>
                <div class="entry">
                    <span class="title">${item.News}</span>
                    <p class="tagline">Submitted on ${formattedDate}</p>
                </div>
            `;
            listContainer.appendChild(post);
        });
    } else if (currentTab === 'songs') {
        const filtered = allSongs.filter(item => item.title.toLowerCase().includes(term) || item.artist.toLowerCase().includes(term)).sort((a,b) => a.rank - b.rank);
        filtered.forEach((item) => {
            const post = document.createElement('div');
            post.className = 'post';
            post.innerHTML = `<span class="rank">#${item.rank}</span><div class="entry"><span class="title">${item.title} - ${item.artist}</span><div style="margin-top:8px;"><a href="${item.url}" target="_blank" class="action-btn">▶ VIEW ON YOUTUBE</a></div></div>`;
            listContainer.appendChild(post);
        });
    } else {
        const filtered = allMovies.filter(item => item.title.toLowerCase().includes(term)).sort((a,b) => a.rank - b.rank);
        filtered.forEach((item) => {
            const post = document.createElement('div');
            post.className = 'post';
            post.innerHTML = `<span class="rank">#${item.rank}</span><div class="entry"><span class="title">${item.title}</span><p class="tagline">Distributed by ${item.distributor}</p><div style="margin-top:8px;"><a href="${item.url}" target="_blank" class="action-btn">VIEW ON IMDB</a></div></div>`;
            listContainer.appendChild(post);
        });
    }
}
Promise.all([
    fetch('data/news.json').then(res => res.json()),
    fetch('data/songLinks.json').then(res => res.json()),
    fetch('data/movie.json').then(res => res.json())
]).then(([newsData, songsData, moviesData]) => {
    allNews = newsData;
    allSongs = Object.keys(songsData).map(key => ({ title: key, rank: songsData[key].Rank, artist: songsData[key].Artist, url: songsData[key].Youtube_Url }));
    allMovies = Object.keys(moviesData).map(key => ({ title: moviesData[key].Title, rank: moviesData[key].Rank, distributor: moviesData[key].Distributor, url: moviesData[key].MovieURL }));
    render();
}).catch(err => console.error("Veri yukleme hatasi:", err));

searchInput.addEventListener('input', (e) => render(e.target.value));