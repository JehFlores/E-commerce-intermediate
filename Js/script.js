// Menú mobile +++++++
let $navList = document.getElementById("nav-list");
let $navMenu = document.getElementById("menu-icon");
let $navMenuClosed = document.getElementById("close-icon");
let $body = document.querySelector("body");

document.addEventListener("click", (e) => {
  if (e.target.matches("#menu-icon")) {
    $navMenu.classList.toggle("active");
    $body.classList.toggle("active");
  } else {
    $navMenu.classList.remove("active");
    $body.classList.remove("active");
  }
});
// +++++++++++++

// ------ Ventana del carrito
let $cartIcon = document.getElementById("cart");
let $cartSection = document.getElementById("cart-section");
document.addEventListener("click", (e) => {
  if (e.target.matches("#cart")) {
    $cartSection.classList.toggle("active");
  } else {
    $cartSection.classList.remove("active");
  }
});
// ------------

/*Variables para la galería*/

const btnClose = document.getElementById("close-lightbox");
// const btnNext = document.getElementById("next");
const btnNext = document.querySelectorAll(".next");
console.log(btnNext);
const btnPrevious = document.querySelectorAll(".prev");
// const images = document.querySelectorAll("#gallery img:not(#active-img)");
const thbnImages = document.querySelectorAll(".tnail-img");
const ltboxThumbnail = document.querySelectorAll(".lightbox-thumbnail");
let thbnIndex = 0;
// console.log(thbnImages);
// console.log(ltboxThumbnail);

const lightbox = document.getElementById("lightbox");
const activeImage = document.getElementById("active-img");
const lightboxActiveImg = document.getElementById("lightbox-active-img");
let imageIndex = 0;
let images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];
// console.log(images);

/*Abre el Lightbox*/

const opensLightbox = () => {
  activeImage.src = images[imageIndex];

  lightbox.style.display = "flex";
  $body.classList.add("overlay");
};

// -------- Esto renderiza la imagen según donde se dé click en los thumbnail y llama a la función que le quita la clase active a los thumbnail a los que se les había dado click antes
thbnImages.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    removeActive();

    renderizarImagen(index);
  });
});

ltboxThumbnail.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    removeActive();

    renderizarImagen(index);
  });
});
// ---------

function thumbActive(index) {
  thbnImages[index].classList.add("active");
  ltboxThumbnail[index].classList.add("active");
}

function removeActive() {
  thbnImages.forEach((image) => image.classList.remove("active"));

  ltboxThumbnail.forEach((image) => image.classList.remove("active"));
}

/*Cierra el Lightbox */

btnClose.addEventListener("click", () => {
  lightbox.style.display = "none";
  $body.classList.remove("overlay");
});

/* Adelanta la image*/

function adelantaImagen() {
  if (imageIndex >= images.length - 1) {
    imageIndex = 0;
  } else {
    imageIndex++;
  }
  removeActive();
  renderizarImagen(imageIndex);
  position();
}

/**
 * Funcion que cambia la foto en la anterior posicion
 */
function retrocederImagen() {
  if (imageIndex <= 0) {
    imageIndex = images.length - 1;
  } else {
    imageIndex--;
  }
  removeActive();
  renderizarImagen(imageIndex);
  position();
}

//  Funcion que actualiza la imagen de imagen dependiendo de imageIndex
// Esto me lo dió Copilot:
function renderizarImagen(index) {
  // console.log("Renderizando imagen:", images[imageIndex]);

  imageIndex = index;

  activeImage.src = images[imageIndex];
  activeImage.style.backgroundImage = `url(${images[imageIndex]})`;

  lightboxActiveImg.style.backgroundImage = `url(${images[imageIndex]})`;
  thumbActive(imageIndex);
}

// document.addEventListener("click", (e) => {
//   if (e.target.matches("#menu-icon")) {
//     $navMenu.classList.toggle("active");
//     $body.classList.toggle("active");
//   }
// });

if (window.innerWidth >= 530) {
  activeImage.addEventListener("click", opensLightbox);
}

function position() {
  if (window.innerWidth > 530) return;

  if (activeImage.src === images[0]) {
    activeImage.style.backgroundPosition = "0% 60%";
    console.log(images[0]);
  } else {
    activeImage.style.backgroundPosition = "0% 0%";
  }
}

window.onload = function () {
  renderizarImagen(imageIndex);
  position();
};

// Botón que adelanta la Imagen
btnNext.forEach((btn) => {
  btn.addEventListener("click", () => {
    adelantaImagen();
  });
});

// Botón que retrocede la Imagen
btnPrevious.forEach((btn) => btn.addEventListener("click", retrocederImagen));
