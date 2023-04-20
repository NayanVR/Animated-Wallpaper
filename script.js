const gridContainer = document.getElementById('grid-container');
const cursor = document.querySelector('.cursor');

const columns = parseInt(window.innerWidth / 40);
const rows = parseInt(window.innerHeight / 40);

gridContainer.style.setProperty('--columns', columns);
gridContainer.style.setProperty('--rows', rows);

const TILE_BASE_OPACITY = 0.1;

let mousePos = {
    x: 0,
    y: 0,
    radius: 200
}

let tiles = [];

const handleMouseMove = e => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    cursor.style.left = mousePos.x + 'px';
    cursor.style.top = mousePos.y + 'px';
};

document.addEventListener('mousemove', handleMouseMove);

const createTile = index => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    const dot = document.createElement('div');
    dot.classList.add('dot');
    tile.appendChild(dot);
    return tile;
};

const createTiles = quantity => {
    for (let i = 0; i < quantity; i++) {
        const tile = createTile(i);
        gridContainer.appendChild(tile);
        tiles.push(tile);
    }

    tiles.forEach((tile, index) => {
        const tilePos = tile.getBoundingClientRect();
        const x = tilePos.x + tilePos.width / 2;
        const y = tilePos.y + tilePos.height / 2;
        console.log(tilePos.width, tilePos.height);
        tile.setAttribute('data-x', x);
        tile.setAttribute('data-y', y);
    });
}

createTiles(columns * rows);

function animate() {
    requestAnimationFrame(animate);

    tiles.forEach((tile, index) => {
        const x = parseInt(tile.getAttribute('data-x'));
        const y = parseInt(tile.getAttribute('data-y'));
        const distance = Math.sqrt(Math.pow(mousePos.x - x, 2) + Math.pow(mousePos.y - y, 2));
        const radius = mousePos.radius - distance;
        const opacity = Math.max(radius / 300, TILE_BASE_OPACITY);
        if (radius > 0) {
            tile.style.opacity = opacity;
            tile.style.transform = `scale(${Math.max(radius / 100, 1)})`;
        } else {
            tile.style.opacity = 0.1;
            tile.style.transform = 'scale(1)';
        }
    });
}

animate();