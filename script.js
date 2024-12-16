function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/ /g, '-').toUpperCase();
}

document.getElementById('date-header').innerText = formatDate(new Date());

const defaultScreenshots = [
            'CleanShot 2024-12-17 at 00.38.49@2x.png',
            'CleanShot 2024-12-17 at 00.40.07@2x.png',
            'CleanShot 2024-12-17 at 00.42.25@2x.png',
            'CleanShot 2024-12-17 at 00.46.28@2x.png',
            'CleanShot 2024-12-17 at 01.00.05@2x.png',
            'CleanShot 2024-12-17 at 01.03.00@2x.png',
            'CleanShot 2024-12-17 at 01.32.07@2x.png'
];

const storedScreenshots = JSON.parse(localStorage.getItem('screenshots')) || [];
const screenshots = [...new Set([...defaultScreenshots, ...storedScreenshots])];

screenshots.sort((a, b) => {
    const dateA = new Date(a.match(/\d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2}/)[0].replace(' at ', 'T').replace(/\./g, ':'));
    const dateB = new Date(b.match(/\d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2}/)[0].replace(' at ', 'T').replace(/\./g, ':'));
    return dateB - dateA;
});

if (screenshots.length) {
    const latestScreenshot = `images/${screenshots[0]}`;
    console.log('Displaying latest screenshot:', latestScreenshot);
    document.getElementById('screenshot').src = latestScreenshot;
} else {
    document.getElementById('screenshot').alt = 'No screenshots available';
}
