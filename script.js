function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/ /g, '-').toUpperCase();
}

document.getElementById('date-header').innerText = formatDate(new Date());

fetch('/images')
    .then(response => response.json())
    .then(files => {
        const screenshots = files.filter(file => file.startsWith('CleanShot'));
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
    })
    .catch(error => console.error('Error fetching images:', error));
