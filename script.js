(function () {
  const API_BASE = 'https://api.themoviedb.org/3';
  const API_KEY = 'ac48206bd746e211a06f69813f0ca17a';
  const IMAGE_BASE = 'https://image.tmdb.org/t/p';
  const POSTER_SIZE = 'w500';
  const NOW_PLAYING_URL = `${API_BASE}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`;

  const movieListEl = document.getElementById('movieList');
  const modal = document.getElementById('modal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalPoster = document.getElementById('modalPoster');
  const modalTitle = document.getElementById('modalTitle');
  const modalOverview = document.getElementById('modalOverview');
  const modalMeta = document.getElementById('modalMeta');

  function posterUrl(path) {
    if (!path) return '';
    return `${IMAGE_BASE}/${POSTER_SIZE}${path}`;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderMovieCard(movie) {
    const card = document.createElement('article');
    card.className = 'movie-card';
    card.setAttribute('data-id', movie.id);
    card.innerHTML = `
      <div class="card-poster-wrap">
        <img class="card-poster" src="${posterUrl(movie.poster_path)}" alt="${escapeHtml(movie.title)} 포스터" loading="lazy">
      </div>
      <div class="card-info">
        <h3 class="card-title">${escapeHtml(movie.title)}</h3>
        <p class="card-meta">${escapeHtml(formatDate(movie.release_date))}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(movie));
    return card;
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function openModal(movie) {
    modalPoster.src = posterUrl(movie.poster_path);
    modalPoster.alt = movie.title + ' 포스터';
    modalTitle.textContent = movie.title;
    modalOverview.textContent = movie.overview || '줄거리 정보가 없습니다.';
    modalMeta.textContent = [
      formatDate(movie.release_date),
      movie.vote_average ? `평점 ${movie.vote_average.toFixed(1)}` : ''
    ].filter(Boolean).join(' · ');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalBackdrop.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  async function fetchNowPlaying() {
    try {
      const res = await fetch(NOW_PLAYING_URL);
      if (!res.ok) throw new Error('API 요청 실패');
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async function init() {
    const movies = await fetchNowPlaying();
    movieListEl.innerHTML = '';
    movies.forEach(function (movie) {
      movieListEl.appendChild(renderMovieCard(movie));
    });
  }

  init();
})();
