/*Barra de navegación fija cuando realizo scroll*/
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".container__header");

  // Función para ajustar el header cuando se desplaza la página
  function adjustHeader() {
    if (window.scrollY > header.offsetHeight) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  // Ajustar el header cuando se carga la página
  adjustHeader();

  // Ajustar el header cuando se desplaza la página
  window.addEventListener("scroll", function () {
    adjustHeader();
  });
  function adjustHeader() {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});
/*Enlace de inicio*/
const inicioLink = document.querySelector('a[href="#inicio"]');

// Agrega un evento de clic al enlace de "Inicio"
inicioLink.addEventListener("click", function (event) {
  event.preventDefault();

  // Calcula la posición de destino (la parte superior del encabezado)
  const targetPosition = document.getElementById("inicio").offsetTop;

  // Duración del desplazamiento suave en milisegundos
  const duration = 500;

  // Inicia el desplazamiento suave
  const start =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  const startTime =
    "now" in window.performance ? performance.now() : new Date().getTime();

  function scroll() {
    const currentTime =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (currentTime - startTime) / duration);
    const easing = easeInOutCubic(time);
    window.scroll(0, Math.ceil(easing * (targetPosition - start) + start));

    if (time < 1) {
      requestAnimationFrame(scroll);
    }
  }

  // Función de aceleración/desaceleración para suavizar el desplazamiento
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  scroll();
});

/*Animación del menú hamburguesa*/
document.querySelector(".bars__menu").addEventListener("click", () => {
  var line1__bars = document.querySelector(".line1__bars-menu");
  var line2__bars = document.querySelector(".line2__bars-menu");
  var line3__bars = document.querySelector(".line3__bars-menu");
  var container__menu = document.querySelector(".menu");

  line1__bars.classList.toggle("activeline1__bars-menu");
  line2__bars.classList.toggle("activeline2__bars-menu");
  line3__bars.classList.toggle("activeline3__bars-menu");

  container__menu.classList.toggle("menu__active");
});

/*Sección carrito y productos*/
/*carrito abrir y cerrar*/
const cartMenu = document.getElementById("cart-menu");
const cartOpenButton = document.querySelector(".cart-icon");
const cartCloseButton = document.getElementById("cart-close");

// Abrir carrito
function openCart() {
  cartMenu.classList.add("open");
}

// Cerrar carrito
function closeCart() {
  cartMenu.classList.remove("open");
}

// Evento al hacer clic en el botón de abrir carrito
cartOpenButton.addEventListener("click", openCart);

// Evento al hacer clic en el botón de cerrar carrito
cartCloseButton.addEventListener("click", closeCart);

// Sección de productos
const productsData = [
  {
    id: "1",
    name: "iPhone 13 Pro Max",
    image: "assets/img/productos/iphone-14-pro.jpg",
    description: "Potencia y estilo en un solo dispositivo.",
    price: 999,
  },
  {
    id: "2",
    name: "MacBook Pro",
    image: "assets/img/productos/macpro.jpg",
    description: "Potente y elegante, ideal para profesionales.",
    price: 1999,
  },
  {
    id: "3",
    name: "iPad Air",
    image: "assets/img/productos/ipad-air.jpg",
    description: "Una tablet versátil con una pantalla impresionante.",
    price: 699,
  },
  {
    id: "4",
    name: "Apple Watch Series 7",
    image: "assets/img/productos/applewatch.jpg",
    description: "Conectividad y salud en tu muñeca.",
    price: 500,
  },
  {
    id: "5",
    name: "AirPods Pro",
    image: "assets/img/productos/airpods.jpg",
    description: "Sumérgete en un sonido de calidad sin cables.",
    price: 249,
  },
  {
    id: "6",
    name: "Apple TV",
    image: "assets/img/productos/appletv.jpg",
    description: "Disfruta de tus contenidos favoritos en la pantalla grande.",
    price: 149,
  },
];

const productContainer = document.querySelector(".product-list");

function renderProducts() {
  let html = "";
  for (let product of productsData) {
    html += `
      <div class="product-card">
        <div class="thumbnail" style="background-image: url('${product.image}')"></div>
        <div class="info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">$${product.price}</p>
          <div class="buttons">
            <button class="btn-buy" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}">Comprar</button>
            <button class="btn-info">Ver más información</button>
          </div>
        </div>
      </div>
    `;
  }
  productContainer.innerHTML = html;
}

// Función para agregar un producto al carrito
function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Verificar si el producto ya está en el carrito
  const existingProduct = cartItems.find((item) => item.id === product.id);

  if (existingProduct) {
    // Si el producto ya está en el carrito, incrementar la cantidad
    existingProduct.quantity += 1;
  } else {
    // Si el producto no está en el carrito, agregarlo
    cartItems.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  renderCartItems();
  updateCartButtonCount();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Filtrar los productos que no coincidan con el ID proporcionado
  cartItems = cartItems.filter((item) => item.id !== productId);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  renderCartItems();
  updateCartButtonCount();
}

// Función para vaciar el carrito
function clearCart() {
  localStorage.removeItem("cartItems");

  renderCartItems();
  updateCartButtonCount();
}

// Función para realizar la compra
function checkout() {
  clearCart();
  // Aquí puedes agregar la lógica adicional para finalizar la compra
  alert("¡Compra realizada con éxito!");
}

// Función para cargar el carrito desde el localStorage
function loadCartFromStorage() {
  renderCartItems();
  updateCartButtonCount();
}

// Renderizar los productos
renderProducts();

// Agregar producto al carrito al hacer clic en el botón "Comprar"
productContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-buy")) {
    const productId = event.target.dataset.productId;
    const productName = event.target.dataset.productName;
    const productPrice = parseFloat(event.target.dataset.productPrice);
    const productImage = event.target.dataset.productImage;

    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
    });
  }
});

// Obtener los elementos del carrito
const cartItemsContainer = document.getElementById("cart-items");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout");

// Event listeners para vaciar el carrito y realizar la compra
clearCartButton.addEventListener("click", clearCart);
checkoutButton.addEventListener("click", checkout);

// Función para renderizar los productos del carrito
function renderCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cartItems.forEach((item) => {
    const productElement = document.createElement("div");
    productElement.classList.add("cart-item");
    productElement.innerHTML = `
      <div class="product-info">
        <div class="thumbnail">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="details">
          <h4>${item.name}</h4>
          <p>Precio: $${item.price}</p>
          <p>Cantidad: ${item.quantity}</p>
        </div>
      </div>
      <button class="remove-button" data-product-id="${item.id}">Eliminar</button>
    `;
    cartItemsContainer.appendChild(productElement);

    total += item.price * item.quantity;
  });

  // Mostrar el total en el carrito
  const cartTotalElement = document.getElementById("cart-total");
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const productId = event.target.dataset.productId;
      removeFromCart(productId);
    });
  });
}

// Función para actualizar el contador del botón del carrito
function updateCartButtonCount() {
  const cartButton = document.querySelector(".cart-icon");
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartButton.innerHTML = `
    <i class="fas fa-shopping-cart"></i>
    <span class="cart-count">${totalCount}</span>
  `;
}

loadCartFromStorage();

// Contacto
const form = document.getElementById('contact-form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const errorContainer = document.getElementById('error-container');

fullname.addEventListener('input', validateFullname);
email.addEventListener('input', validateEmail);
phone.addEventListener('input', validatePhone);
asunto.addEventListener('input', validateAsunto);
mensaje.addEventListener('input', validateMensaje);

form.addEventListener('submit', submitForm);

function showError(inputElement, errorMessage) {
  const parentElement = inputElement.parentElement;
  const errorElement = parentElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.innerText = errorMessage;
  } else {
    const newErrorElement = document.createElement('div');
    newErrorElement.classList.add('error-message');
    newErrorElement.innerText = errorMessage;
    parentElement.appendChild(newErrorElement);
  }
}

function hideError(inputElement) {
  const parentElement = inputElement.parentElement;
  const errorElement = parentElement.querySelector('.error-message');
  if (errorElement) {
    parentElement.removeChild(errorElement);
  }
}

function validateFullname() {
  const value = fullname.value.trim();
  if (value.length < 3) {
    showError(fullname, 'El nombre debe tener al menos 3 letras.');
    return false;
  } else {
    hideError(fullname);
    return true;
  }
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const value = email.value.trim();
  if (!emailRegex.test(value)) {
    showError(email, 'Por favor, introduce una dirección de correo electrónico válida que contenga un @.');
    return false;
  } else {
    hideError(email);
    return true;
  }
}

function validatePhone() {
  const phoneRegex = /^\d{10}$/;
  const value = phone.value.trim();
  if (!phoneRegex.test(value)) {
    showError(phone, 'El número de teléfono debe tener 10 dígitos.');
    return false;
  } else {
    hideError(phone);
    return true;
  }
}

function validateAsunto() {
  const value = asunto.value.trim();
  if (value.length === 0) {
    showError(asunto, 'Por favor, introduce un asunto.');
    return false;
  } else {
    hideError(asunto);
    return true;
  }
}

function validateMensaje() {
  const value = mensaje.value.trim();
  if (value.length === 0) {
    showError(mensaje, 'Por favor, introduce un mensaje.');
    return false;
  } else {
    hideError(mensaje);
    return true;
  }
}

function submitForm(event) {
  event.preventDefault();

  const isFullnameValid = validateFullname();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isAsuntoValid = validateAsunto();
  const isMensajeValid = validateMensaje();

  if (isFullnameValid && isEmailValid && isPhoneValid && isAsuntoValid && isMensajeValid) {
    // Aquí puedes enviar el formulario o realizar las acciones necesarias
    console.log('Formulario válido. Enviar o procesar los datos.');
    form.submit();
  } else {
    errorContainer.innerText = 'Por favor, completa todos los campos correctamente.';
  }
}