const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search');
let robots = [];

fetch('robots.json')
  .then(res => res.json())
  .then(data => {
    robots = data;
    displayRobots(data);
  })
  .catch(err => console.error("Error loading robots:", err));

function displayRobots(list) {
  gallery.innerHTML = '';
  list.forEach((robot, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${robot.images[0]}" alt="${robot.name}" id="robot-img-${index}">
          <h2>${robot.name}</h2>
          <p>${robot.type}</p>
        </div>
        <div class="card-back">
          <h3>${robot.name}</h3>
          <p><strong>Function:</strong> ${robot.function}</p>
          <p><strong>Tech Used:</strong> ${robot.tech}</p>
          <p><strong>Example:</strong> ${robot.example}</p>
        </div>
      </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    gallery.appendChild(card);

    // 🌀 Automatic image cycling every 2 seconds
    let imgIndex = 0;
    setInterval(() => {
      const imgEl = document.getElementById(`robot-img-${index}`);
      if (imgEl) {
        imgIndex = (imgIndex + 1) % robot.images.length;
        imgEl.src = robot.images[imgIndex];
      }
    }, 2000);
  });
}

searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = robots.filter(r =>
    r.name.toLowerCase().includes(term) ||
    r.type.toLowerCase().includes(term)
  );
  displayRobots(filtered);
});
