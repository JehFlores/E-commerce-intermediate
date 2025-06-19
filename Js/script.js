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
const thbnImages = document.querySelectorAll(".thumbnail img");
let thbnIndex = 0;
console.log(thbnImages);

// Creo que mas bien en lightbox debería ser el hero, si lo hago acorde al código de ejemplo. El lightbox es lo que hace que se vea oscuro por debajo de las imágenes cuando se abren, pero creo que eso lo voy a hacer mejor en el body:
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
  console.log(thbnIndex);
  // activeImage.src = images[thbnIndex];

  // imageIndex = thbnIndex;
  renderizarImagen();
  lightbox.style.display = "flex";
  $body.classList.add("overlay");
  // imageIndex = Array.from(images).indexOf(event.target);
};
// console.log("JALA");

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
  renderizarImagen();
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
  renderizarImagen();
  position();
}

/**
 * Funcion que actualiza la imagen de imagen dependiendo de imageIndex
 */
function renderizarImagen() {
  activeImage.src = images[thbnIndex];
  imageIndex = thbnIndex;

  activeImage.style.backgroundImage = `url(${images[imageIndex]})`;
  lightboxActiveImg.style.backgroundImage = `url(${images[imageIndex]})`;
  // thbnImages[imageIndex].classList.add("active");
}

// Aquí en vez de poner la var images que guarda todas las imágenes grandes, debo hacer y poner otra var que guarde todos los thumbnails, porque a esos es a los que se les dar click para que se abra la imagen grande:
thbnImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    thbnIndex = index; // Guarda el índice globalmente
    // Remover la clase 'active' de todas las imágenes
    thbnImages.forEach((image) => image.classList.remove("active"));
    // Agregar la clase 'active' solo a la imagen clickeada
    img.classList.add("active");

    renderizarImagen();

    // opensLightbox(); // Llama a tu función usando ese índice
  });
});

activeImage.addEventListener("click", opensLightbox);

function position() {
  if (activeImage === images[0]) {
    activeImage.style.backgroundPosition = "0% 60%";
    console.log(images[0]);
  }
}

window.onload = function () {
  renderizarImagen();
  position();
};
// window.onresize = function () {
//   renderizarImagen();
// };
// console.log(images[0]);
// const adelantaImagen = () => {
//   console.log(images[imageIndex]);
//   console.log(imageIndex);
//   imageIndex++;
//   if (imageIndex >= images.length) {
//     imageIndex = 0;
//   }
//   activeImage.src = images[imageIndex].src;
// };

// btnNext.addEventListener("click", adelantaImagen);
btnNext.forEach((btn) => btn.addEventListener("click", adelantaImagen));

// /*Retrocede la Imagen*/

// const retrocederImagen = () => {
//   console.log(images[imageIndex]);
//   console.log(imageIndex);

//   imageIndex--;
//   if (imageIndex < 0) {
//     imageIndex = images.length - 1;
//   }
//   activeImage.src = images[imageIndex].src;
// };

// btnPrevious.addEventListener("click", retrocederImagen);
btnPrevious.forEach((btn) => btn.addEventListener("click", retrocederImagen));
