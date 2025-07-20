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

// |----------- Lógica del carrito ---------|

const product = [
  {
    id: 1,
    model: "Fall Limited Edition Sneakers",
    currPrice: 125,
    discount: 50,
    originalPrice: 250,
    image: "images/image-product-1-thumbnail.jpg",
  },
];

console.log(product[0].model);

const itemsInCart = [];

// Funciones clave:
function addToCart(product, quantity) {
  const itExists = itemsInCart.find((p) => p.id === product.id);
  if (itExists) {
    itExists.quantity += quantity;
  } else {
    itemsInCart.push({ ...product, quantity });
  }
  updateCartVisuals();
}

function deleteFromCart(idProduct) {
  const index = itemsInCart.findIndex((p) => p.id === idProduct);
  if (index !== -1) {
    itemsInCart.splice(index, 1);
    updateCartVisuals();
  }
}

function calculateTotal() {
  return itemsInCart.reduce((total, p) => total + p.quantity, 0);
}

function updateCartVisuals() {
  const $cartSection = document.getElementById("cart-section");
  const $cartCount = document.getElementById("cart-items-count");
  const $emptyMsg = document.getElementById("empty-cart-msg");
  const $checkoutBtn = document.getElementById("checkout-btn");

  const fragment = document.createDocumentFragment();

  itemsInCart.forEach((product) => {
    const template = document.getElementById("cart-item-template");

    const clone = template.content.cloneNode(true);

    clone.querySelector(".thumb").src = product[id].image;
    clone.querySelector(".model").textContent = product[0].model;
    clone.querySelector(".price").textContent = `$${product[0].currPrice}`;
    clone.querySelector(".quantity").textContent = `x ${product[0].quantity}`;

    fragment.appendChild(clone);
  });

  $cartSection.appendChild(fragment);

  // Actualizar contador
  const totalQuantity = calculateTotal();
  $cartCount.textContent = totalQuantity;
  $cartCount.style.visibility = totalQuantity > 0 ? "visible" : "hidden";

  // Mostrar mensaje si está vacío
  $emptyMsg.style.display = totalQuantity === 0 ? "block" : "none";
  $checkoutBtn.style.display = totalQuantity === 0 ? "block" : "none";
  // $checkoutBtn.style.display = "block";

  console.log("JALANDO");
}

// ----------------

// --- Quantity Selection ---
const $quantityDisplay = document.getElementById("quantity"),
  $decrease = document.getElementById("decrease-btn"),
  $increase = document.getElementById("increase-btn");
let selectedQuantity = 0,
  fragment = document.createDocumentFragment();

const updateQuantity = () => {
  $quantityDisplay.textContent = selectedQuantity;
};

const decreaseSelectedQuantity = () => {
  if (selectedQuantity > 0) {
    selectedQuantity--;
    updateQuantity();
  }
};

const increaseSelectedQuantity = () => {
  selectedQuantity++;
  updateQuantity();
};

$decrease.addEventListener("click", decreaseSelectedQuantity);
$increase.addEventListener("click", increaseSelectedQuantity);

// ----- Add to cart
let $btnAddToCart = document.getElementById("add-to-cart");

$btnAddToCart.addEventListener("click", (e) => {
  if (selectedQuantity === 0) return;
  addToCart({ ...product, quantity: selectedQuantity });
  selectedQuantity = 0;
});
// console.log(itemsInCart);
// if($quantity.textContent > 0)

// ------ Ventana del carrito
let $cartSection = document.getElementById("cart-section");
document.addEventListener("click", (e) => {
  if (e.target.matches("#cart")) {
    $cartSection.classList.toggle("active");
  } else {
    $cartSection.classList.remove("active");
  }
});
// ------------
