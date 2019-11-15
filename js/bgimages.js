// const local = `http://localhost:1337`;
// const remote = `http://admin.tanho.uz`;

const api2 = remote;

fetch(api2 + '/bgimages').then((res) => res.json()).then((data) => {
	let about = document.getElementById('about');
	let banner = document.getElementById('home');
	about.style.backgroundImage = `url('${api2 + data[0].bg_image.url}')`;
	banner.style.backgroundImage = `url('${api2 + data[1].bg_image.url}')`;
});

fetch(api2 + '/statics').then((res) => res.json()).then((data) => {
	aboutDesc = document.getElementById('about-desc');
	aboutTitle = document.getElementById('about-title');
	aboutDesc.innerHTML = data[0].description;
	aboutTitle.innerHTML = data[0].title;
});
