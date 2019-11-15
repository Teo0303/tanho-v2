const api = `admin.tanho.uz`;

function createNode(element) {
	return document.createElement(element);
}

function append(parent, el) {
	return parent.appendChild(el);
}

function prepend(parent, el) {
	return parent.prepend(el);
}

/// GET PRODUCT DATA WHEN POPUP SHOWED

function getProduct(id) {
	const popup = document.getElementById('popup'),
		container = document.querySelector('.popup-container');
	fetch(`${api}/products/${id}`).then((res) => res.json()).then((data) => {
		let content = document.getElementById('popup-content'),
			div = createNode('div');
		if (content.hasChildNodes) {
			content.innerHTML = ' ';
		}
		div.innerHTML = `
      <div class="popup-media">
        <img src="${api + data.photo[0].url}" class="popup-image">
      </div>
        
      <div class="popup-desc">
        <h1 class="card-h1">${data.name}</h1> 
        <p class="card-p">
        ${data.description} 
        </p>
        <div class="row">
            <div class="col-sm-6">
                <label>Масса:</label>
                <h3 class="card-h3">${data.weight ? data.weight : ' - '}  гр.</h3>    
            </div>
            
        </div>
      </div>`;

		append(content, div);
		div.className = 'popup-item';
	});

	popup.style.display = 'flex';
	container.className = 'popup-container opened';
}

function closePopup() {
	const popup = document.getElementById('popup'),
		container = document.querySelector('.popup-container');
	popup.style.display = 'none';
	container.className = 'popup-container';
}

String.prototype.trunc = function(n, useWordBoundary) {
	if (this.length <= n) {
		return this;
	}
	var subString = this.substr(0, n - 1);
	return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '&hellip;';
};

function trimText(txt) {
	let screen = window.innerWidth;
	if (screen <= 500) {
		return txt.trunc(120, true);
	}
	return txt.trunc(210, true);
}

function markRadioChecked(el) {
	let radios = document.querySelectorAll('[type]');
	let array = Array.from(radios);
	let neededEl;
	array.forEach((radio) => {
		if (radio.dataset.type == el) neededEl = radio;
	});
	neededEl.checked = true;
}

window.onload = filterSelection('Ketchup');

function filterSelection(el) {
	markRadioChecked(el);
	const parent = document.getElementById('product-swiper');
	if (parent.hasChildNodes) {
		parent.innerHTML = ' ';
	}
	fetch(`${api}/products?type=${el}`)
		.then((res) => res.json())
		.then((data) => {
			let block = document.getElementById('product-swiper'),
				swiperContainer = createNode('div'),
				swiperWrapper = createNode('div'),
				btnNext = createNode('div'),
				btnPrev = createNode('div');
			return data.map((item) => {
				let div = createNode('div');

				swiperContainer.className = 'swiper-container products-container';
				swiperWrapper.className = 'swiper-wrapper';
				div.className = 'swiper-slide';
				btnNext.className = 'swiper-button-next';
				btnPrev.className = 'swiper-button-prev';

				div.innerHTML = `  
                  <div class="inlineflex">
                      <div class="halfWidth gallery-img">
                          <img src="${api +
								item.photo[0].url}" class="gallery-image">                                      
                      </div>
                      
                      <div class="halfWidth">
  
                              <h1 class="card-h1">${item.name}</h1> 
                              <p class="card-p">
                              ${trimText(item.description)} 
                              </p>
                              <div class="row">
                                  <div class="col-sm-12">
                                      <label>Масса:</label>
                                      <h3 class="card-h3">${item.weight} гр.</h3>    
                                  </div>
                                  
                              </div>
                              <div class="primary-white-button">
                                  <a class="scroll-link" data-id="gold" onclick="getProduct(${item.id})">Подробнее</a>
                              </div>    
  
                      </div>
                  </div>
              `;
				// div.className = "flex-item";
				div.setAttribute('data-product', item.id);
				append(swiperWrapper, div);
				append(swiperContainer, swiperWrapper);
				append(block, swiperContainer);
				append(swiperContainer, btnNext);
				append(swiperContainer, btnPrev);

				swiper2 = new Swiper('.products-container', {
					slidesPerView: 1,
					spaceBetween: 10,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					breakpoints: {
						640: {
							slidesPerView: 1,
							spaceBetween: 20
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 20
						},
						1200: {
							slidesPerView: 3,
							spaceBetween: 20
						}
					}
				});
			});
		})
		.catch((err) => console.log(err));
}

fetch(`${api}/sliders`).then((res) => res.json()).then((data) => {
	let banner = document.getElementById('hero'),
		bannerContainer = createNode('div');
	let bannerWrapper = createNode('div');
	let bannerPagination = createNode('div');

	return data.map((slider) => {
		let sliderItem = createNode('div');
		bannerContainer.className = 'swiper-container main-banner';
		bannerWrapper.className = 'swiper-wrapper';
		sliderItem.className = 'swiper-slide';
		bannerPagination.className = 'swiper-pagination';

		sliderItem.innerHTML = `
        <div class="slide-item">
            <div class="text-content">
                <h2 class="starter">${slider.name}</h2>
                <p class="startertab">
                    ${slider.description} 
                </p>                                            
            </div>
            <div class="image-content">
                <img src="${api + slider.image.url}" class="product-img">
                <div class="primary-blue-button">
                    <a href="#" class="scroll-link" onclick="filterSelection('${slider.type}')" data-id="product" style="float: right;width: 100%;">Перейти в каталог</a>
                </div>
            </div>
        </div> 
        `;

		append(bannerWrapper, sliderItem);
		append(bannerContainer, bannerWrapper);
		append(banner, bannerContainer);
		append(bannerContainer, bannerPagination);

		// banner.swiper.slideNext();
	});
});
