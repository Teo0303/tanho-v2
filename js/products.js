const api = `http://localhost:1337/`;

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function prepend(parent, el) {
  return parent.prepend(el);
}

function getProduct(id) {
  const popup = document.getElementById("popup"),
    container = document.querySelector(".popup-container");
  fetch(`${api}products/${id}`)
    .then(res => res.json())
    .then(data => {
      let content = document.getElementById("popup-content"),
        div = createNode("div");
      if (content.hasChildNodes) {
        content.innerHTML = " ";
      }
      div.innerHTML = `
      <div class="popup-media">
        <img src="./img/Tanho/${data.photo[0].name}" class="popup-image">
      </div>
        
      <div class="popup-desc">
        <h1 class="card-h1">${data.name}</h1> 
        <p class="card-p">
        ${data.description} 
        </p>
        <div class="row">
            <div class="col-sm-6">
                <label>Масса:</label>
                <h3 class="card-h3">${
                  data.weight ? data.weight : " - "
                }  гр.</h3>    
            </div>
            
        </div>
      </div>`;

      append(content, div);
      div.className = "popup-item";
    });

  popup.style.display = "flex";
  container.className = "popup-container opened";
}

function closePopup() {
  const popup = document.getElementById("popup"),
    container = document.querySelector(".popup-container");
  popup.style.display = "none";
  container.className = "popup-container";
}

String.prototype.trunc = function(n, useWordBoundary) {
  if (this.length <= n) {
    return this;
  }
  var subString = this.substr(0, n - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;"
  );
};

function trimText(txt) {
  let screen = window.innerWidth;
  if (screen <= 500) {
    return txt.trunc(120, true);
  }
  return txt.trunc(210, true);
}

window.onload = filterSelection("Ketchup");

let swiper;
function filterSelection(el) {
  const parent = document.getElementById("product-swiper");
  if (parent.hasChildNodes) {
    parent.innerHTML = " ";
  }
  fetch(`${api}products?type=${el}`)
    .then(res => res.json())
    .then(data => {
      let block = document.getElementById("product-swiper"),
        swiperContainer = createNode("div"),
        swiperWrapper = createNode("div"),
        btnNext = createNode("div"),
        btnPrev = createNode("div");
      return data.map(item => {
        let div = createNode("div");

        swiperContainer.className = "swiper-container products-container";
        swiperWrapper.className = "swiper-wrapper";
        div.className = "swiper-slide";
        btnNext.className = "swiper-button-next";
        btnPrev.className = "swiper-button-prev";

        div.innerHTML = `  
                  <div class="inlineflex">
                      <div class="halfWidth gallery-img">
                          <img src="./img/Tanho/${
                            item.photo[0].name
                          }" class="gallery-image">                                      
                      </div>
                      
                      <div class="halfWidth">
  
                              <h1 class="card-h1">${item.name}</h1> 
                              <p class="card-p">
                              ${trimText(item.description)} 
                              </p>
                              <div class="row">
                                  <div class="col-sm-12">
                                      <label>Масса:</label>
                                      <h3 class="card-h3">${
                                        item.weight
                                      } гр.</h3>    
                                  </div>
                                  
                              </div>
                              <div class="primary-white-button">
                                  <a class="scroll-link" data-id="gold" onclick="getProduct(${
                                    item.id
                                  })">Подробнее</a>
                              </div>    
  
                      </div>
                  </div>
              `;
        // div.className = "flex-item";
        div.setAttribute("data-product", item.id);
        append(swiperWrapper, div);
        append(swiperContainer, swiperWrapper);
        append(block, swiperContainer);
        append(swiperContainer, btnNext);
        append(swiperContainer, btnPrev);

        swiper2 = new Swiper(".products-container", {
          slidesPerView: 1,
          spaceBetween: 10,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
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
    .catch(err => console.log(err));
}
