function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/ /g, '-').toUpperCase();
}

document.getElementById('date-header').innerText = formatDate(new Date());

const defaultScreenshots = [
    'CleanShot 2024-12-14 at 10.30.00@2x.png',
    'CleanShot 2024-12-15 at 11.00.00@2x.png',
    'CleanShot 2024-12-16 at 12.00.00@2x.png'
];

const storedScreenshots = JSON.parse(localStorage.getItem('screenshots')) || [];
const screenshots = [...new Set([...defaultScreenshots, ...storedScreenshots])];

screenshots.sort((a, b) => {
    const dateA = new Date(a.match(/\d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2}/)[0].replace(' at ', 'T').replace(/\./g, ':'));
    const dateB = new Date(b.match(/\d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2}/)[0].replace(' at ', 'T').replace(/\./g, ':'));
    return dateB - dateA;
});

if (screenshots.length) {
    document.getElementById('screenshot').src = `images/${screenshots[0]}`;
} else {
    document.getElementById('screenshot').alt = 'No screenshots available';
}
