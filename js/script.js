
const API_KEY = 'U25yttKVngO9RcFcv3k6NprMVu7RYJHh';


const searchInput   = document.querySelector('#search-input');  
const fetchBtn      = document.querySelector('#fetch-gif-btn');  
const gifContainer  = document.querySelector('#gif-container');  


function buildEndpoint(query) {
  const q = encodeURIComponent(query.trim() || 'funny'); 
  return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${q}&limit=25&rating=g`;
}

async function fetchGifs(query) {
  const endpoint = buildEndpoint(query);
  console.log('Fetching from:', endpoint); 

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    console.log('Full API response:', data); 

   
    const urls = data.data.map(gif => gif.images.original.url);
    console.log('GIF URLs (25):', urls); 

    return urls;
  } catch (err) {
    console.error('Fetch failed:', err);
    alert('Failed to load GIFs. Check console.');
    return [];
  }
}

function renderGifs(urls) {
  gifContainer.innerHTML = ''; 

  urls.forEach(url => {
    gifContainer.innerHTML += `
      <div class="col-6 col-md-4 col-lg-3 mb-3">
        <img src="${url}" class="img-fluid rounded shadow-sm" alt="gif" loading="lazy">
      </div>`;
  });
}

fetchBtn.addEventListener('click', async () => {
  const query = searchInput.value;
  const urls = await fetchGifs(query);
  renderGifs(urls);
});

searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') fetchBtn.click();
});

console.log("script.js loaded – ready to fetch GIFs!");