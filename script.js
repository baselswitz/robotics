const gallery = document.getElementById('robot-gallery');
const search = document.getElementById('search');

let robots = [];

// Load robot data
fetch('robots.json')
  .then(res => res.json())
  .then(data => {
    robots = data;
    displayRobots(robots);
  })
  .catch(err => console.error('Error loading JSON:', err));

function displayRobots(data) {
  gallery.innerHTML = '';
  data.forEach(robot => {
    const card = document.createElement('div');
    card.classList.add('robot-card');

    const carousel = document.createElement('div');
    carousel.classList.add('image-carousel');

    robot.images.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      if (i === 0) img.classList.add('active');
      carousel.appendChild(img);
    });

    // image rotation
    let currentImage = 0;
    setInterval(() => {
      const imgs = carousel.querySelectorAll('img');
      imgs[currentImage].classList.remove('active');
      currentImage = (currentImage + 1) % imgs.length;
      imgs[currentImage].classList.add('active');
    }, 2000);

    const content = document.createElement('div');
    content.classList.add('card-content');
    content.innerHTML = `
      <h2>${robot.name}</h2>
      <p><strong>Type:</strong> ${robot.type}</p>
      <p><strong>Function:</strong> ${robot.function}</p>
      <p><strong>Tech:</strong> ${robot.tech}</p>
      <p><strong>Example:</strong> ${robot.example}</p>
    `;

    card.appendChild(carousel);
    card.appendChild(content);
    gallery.appendChild(card);
  });
}

// search filter
search.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = robots.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.type.toLowerCase().includes(query) ||
    r.function.toLowerCase().includes(query)
  );
  displayRobots(filtered);
});
