fetch("http://localhost:1337/bgimages")
  .then(res => res.json())
  .then(data => {
    let about = document.getElementById("about");
    let banner = document.getElementById("home");
    about.style.backgroundImage = `url('./img/Tanho/${data[0].bg_image.name}')`;
    banner.style.backgroundImage = `url('./img/${data[1].bg_image.name}')`;
  });
