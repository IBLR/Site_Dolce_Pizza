/*** HEADER - Opening & closing of the burger menu ***/
  const navToggleBtn = document.querySelector('.header-nav-toggle-btn button');
  const nav = document.querySelector('#primary-navigation');
  const firstNavLink = nav.querySelector('a');

  navToggleBtn.addEventListener('click', () => {
    const menuIsOpen = nav.classList.contains('is-open');
    if (menuIsOpen) {
      nav.classList.remove('is-open');
      navToggleBtn.setAttribute('aria-expanded', 'false');
      navToggleBtn.focus();
    } else {
      nav.classList.add('is-open');
      navToggleBtn.setAttribute('aria-expanded', 'true');
      firstNavLink.focus();
    }
  });

/* ----------------------------------------------------------------------------------------- */

/*** CONTACT - Form validation ***/
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form-container");

  const lastNameInput = document.getElementById("last-name");
  const phoneInput = document.getElementById("phone");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");
  const numberInput = document.getElementById("number");
  const messageInput = document.getElementById("message");

  const successMessage = document.getElementById("form-success");

  /* Utilities functions */
  function showError(input, message) {
    const errorSpan = document.getElementById(`error-${input.id}`);
    errorSpan.textContent = message;
    errorSpan.style.color = "var(--warning-red)";
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input) {
    const errorSpan = document.getElementById(`error-${input.id}`);
    if (errorSpan) {
      errorSpan.textContent = "";
    }
    input.removeAttribute("aria-invalid");
  }

  function isValidName(value) {
    return /^[A-Za-zÀ-ÿ\s-]+$/.test(value);
  }

  function isValidFrenchPhone(value) {
    const cleanedValue = value.replace(/\s+/g, "");
    const frenchPhoneRegex = /^(0|\+33)[1-9]\d{8}$/;
    return frenchPhoneRegex.test(cleanedValue);
  }

  function isDateInPast(dateValue) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dateValue);
    return selectedDate < today;
  }

  function isMonday(dateValue) {
    const selectedDate = new Date(dateValue);
    return selectedDate.getDay() === 1;  /* 1 = monday */
  }

  function timeToMinutes(timeValue) {
    const [hours, minutes] = timeValue.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function isWithinOpeningHours(timeValue) {
    const timeInMinutes = timeToMinutes(timeValue);

    const lunchStart = 12 * 60;
    const lunchEnd = 14 * 60 + 30;

    const dinnerStart = 19 * 60;
    const dinnerEnd = 22 * 60 + 30;

    return (
      (timeInMinutes >= lunchStart && timeInMinutes <= lunchEnd) ||
      (timeInMinutes >= dinnerStart && timeInMinutes <= dinnerEnd)
    );
  }

  /* Individual validation for Dynamic Cleaning */
  function validateField(input) {
    const value = input.value.trim();

    if (input === lastNameInput) {
      return value !== "" && isValidName(value);
    }

    if (input === phoneInput) {
      return value !== "" && isValidFrenchPhone(value);
    }

    if (input === dateInput) {
      return value !== "" && !isDateInPast(value) && !isMonday(value);
    }

    if (input === timeInput) {
      return value !== "" && isWithinOpeningHours(value);
    }

    if (input === numberInput) {
      const numberValue = Number(value);
      return value !== "" && numberValue >= 1 && numberValue <= 12;
    }

    return true;
  }

  /* Dynamic error cleaning */
  const inputs = [lastNameInput, phoneInput, dateInput, timeInput, numberInput];
  inputs.forEach((input) => {
    if (input) { 
      input.addEventListener("input", () => {
        if (validateField(input)) {
          clearError(input);
        }
      });
    }
  });

  /* Complete validation upon submit */
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let formIsValid = true;

      successMessage.style.display = "none";
      successMessage.textContent = "";

      const allInputs = [lastNameInput, phoneInput, dateInput, timeInput, numberInput, messageInput];
      allInputs.forEach(input => clearError(input));

      if (lastNameInput.value.trim() === "") {
        showError(lastNameInput, "Le nom est obligatoire.");
        formIsValid = false;
      } else if (!isValidName(lastNameInput.value.trim())) {
        showError(lastNameInput, "Le nom ne doit contenir que des lettres, espaces ou tirets.");
        formIsValid = false;
      } else {
        clearError(lastNameInput);
      }

      if (phoneInput.value.trim() === "") {
        showError(phoneInput, "Le téléphone est obligatoire.");
        formIsValid = false;
      } else if (!isValidFrenchPhone(phoneInput.value.trim())) {
        showError(phoneInput, "Merci d’entrer un numéro français valide (ex : 06 12 34 56 78).");
        formIsValid = false;
      } else {
        clearError(phoneInput);
      }

      if (dateInput.value === "") {
        showError(dateInput, "La date est obligatoire.");
        formIsValid = false;
      } else if (isDateInPast(dateInput.value)) {
        showError(dateInput, "Cette date est passée.");
        formIsValid = false;
      } else if (isMonday(dateInput.value)) {
        showError(dateInput, "Le restaurant est fermé le lundi.");
        formIsValid = false;
      } else {
        clearError(dateInput);
      }

      if (timeInput.value === "") {
        showError(timeInput, "L’heure est obligatoire.");
        formIsValid = false;
      } else if (!isWithinOpeningHours(timeInput.value)) {
        showError(timeInput, "Fermé.");
        formIsValid = false;
      } else {
        clearError(timeInput);
      }

      if (numberInput.value === "") {
        showError(numberInput, "Le nombre de personnes est obligatoire.");
        formIsValid = false;
      } else {
        const numberValue = Number(numberInput.value);
        if (numberValue < 1 || numberValue > 12) {
          showError(numberInput, "Le nombre de personnes doit être entre 1 et 12.");
          formIsValid = false;
        } else {
          clearError(numberInput);
        }
      }

      clearError(messageInput);

      if (formIsValid) {
        successMessage.textContent = "Votre réservation a bien été envoyée.";
        successMessage.style.display = "block";

        form.reset();
        lastNameInput.focus();
      } else {
        const firstError = form.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
      }
    });
  }
});

/* ----------------------------------------------------------------------------------------- */

/*** MENU - Shop & Cart ***/

/** SHOP **/
const message = document.getElementById("shop-user-message");
let allProducts = [];

/* Create product card */
function createProductCard(p) {
  /* Content of product cards */
  const card = document.createElement("article");

  const img = document.createElement("img");
  img.src = p.image ? p.image : "assets/img/placeholders/img-not-available.png";
  img.alt = p.image ? (p.name || "") : "Image non disponible";
  img.onerror = () => {
    img.src = "assets/img/placeholders/img-not-available.png";
    img.alt = "Image non disponible";
  };
  
  const title = document.createElement("h3");
  title.textContent = p.name || "";

  const desc = document.createElement("p");
  desc.textContent = p.description || "";

  const price = document.createElement("p");
  const priceNum = parseFloat(p.amount) || 0;
  price.textContent = priceNum.toLocaleString("fr-FR", { style: "currency", currency: "EUR",
    minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const btn = document.createElement("button");
  btn.textContent = "Ajouter";

  /* data-attributes */
  card.dataset.category = p.category;

  /* Layout of product cards */
  card.classList.add("shop-product-card");
  
  const topCard = document.createElement("div");
  topCard.append(img, title, desc);
  topCard.classList.add("shop-top-product-card")
  img.classList.add("shop-img-product-card");
  title.classList.add("shop-title-product-card", "high-text");
  desc.classList.add("shop-desc-product-card");

  const bottomCard = document.createElement("div")
  bottomCard.append(price, btn);
  bottomCard.classList.add("shop-bottom-product-card");
  price.classList.add("shop-price-product-card");
  btn.classList.add("btn", "btn--primary", "btn--square-sm");

  btn.addEventListener("click", () => {
    addToCart(p);
  });

  card.append(topCard, bottomCard);
  return card;
}

/* Hide all category sections */
function hideAllSections() {
  document.querySelectorAll(".shop-block-header").forEach(section => {
    section.style.display = "none";
  });
}

/* Load products from JSON */
async function loadProducts() {
  const shopZone = document.querySelector(".shop-display-zone");
  if (!shopZone) return;

  message.textContent = "Chargement des produits...";
  hideAllSections();

  try {
    const res = await fetch("assets/data/products.json");
    if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
    
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Les données reçues ne sont pas un tableau");
    if (data.length === 0) {
      message.textContent = "Aucun produit disponible pour le moment.";
      hideAllSections();
      return;
    }
   /* Create and append to category container if existing in HTML */
    allProducts = [];
    data.forEach(p => {
      const card = createProductCard(p);
      allProducts.push(card);
      const container = document.getElementById(p.category);
      if (container) {
        container.appendChild(card);
        container.parentElement.style.display = "";
      }
    });

    message.textContent = "";
    message.style.display = "none";

  } catch (e) {
    console.error(e);
    message.textContent = "Chargement des produits impossible";
    hideAllSections();
  }
}

async function initShop() {
  await loadProducts();
}
initShop();


/** CART **/
const cart = new Map();
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalAmount = document.getElementById("cart-total-amount");
const cartClearBtn = document.getElementById("cart-clear");
const cartValidateBtn = document.getElementById("cart-validate");
const cartMessage = document.getElementById("cart-message");

/* Add a product */
function addToCart(product) {
  const key = product.id || product.name;

  if (cart.has(key)) {
    cart.get(key).qty++;
  } else {
    cart.set(key, {
      product,
      qty: 1
    });
  }
  renderCart();
}

/* Change quantity */
function changeQty(key, delta) {
  if (!cart.has(key)) return;

  const item = cart.get(key);
  item.qty += delta;

  if (item.qty <= 0) {
    cart.delete(key);
  }

  renderCart();
}

/* Clean cart */
if (cartClearBtn){
  cartClearBtn.addEventListener("click", () => {
    cart.clear();
    renderCart();
  });
}

/* Validation */
if (cartValidateBtn) {
  cartValidateBtn.addEventListener("click", () => {
    if (cart.size === 0) return;

    cart.clear();
    renderCart();

    showCartMessage("Commande validée avec succès");
  });
}

function showCartMessage(text) {
  cartMessage.textContent = text;
  cartMessage.classList.add("is-visible");

  setTimeout(() => {
    cartMessage.classList.remove("is-visible");
  }, 3000);
}

/* Cart rendering */
function renderCart() {
  cartMessage.classList.remove("is-visible");
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.size === 0) {
    cartItemsContainer.innerHTML = `<p class="cart-empty">Panier vide</p>`;
    cartTotalAmount.textContent = "0,00 €";
    return;
  }

  cart.forEach(({ product, qty }, key) => {
    const line = document.createElement("div");
    line.className = "cart-line";

    const info = document.createElement("div");
    info.className = "cart-line-info";

    const name = document.createElement("span");
    name.className = "cart-line-name";
    name.textContent = product.name;

    const price = document.createElement("span");
    price.className = "cart-line-price";
    price.textContent = product.amount.toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR"
    });

    const qtyControls = document.createElement("div");
    qtyControls.className = "cart-line-qty";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.addEventListener("click", () => changeQty(key, -1));

    const qtyEl = document.createElement("span");
    qtyEl.textContent = qty;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.addEventListener("click", () => changeQty(key, 1));

    qtyControls.append(minus, qtyEl, plus);

    info.append(qtyControls, price);
    line.append(name, info);
    cartItemsContainer.appendChild(line);

    total += product.amount * qty;
  });

  cartTotalAmount.textContent = total.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR"
  });
}

/* ----------------------------------------------------------------------------------------- */

/*** GALLERY - Lightbox ***/

document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('closeLightbox');

  // Ouvrir la lightbox en cliquant sur une image
  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      lightbox.style.display = 'flex';
      // Récupère l'URL de l'image en grande taille depuis l'attribut data-large
      lightboxImage.src = e.target.getAttribute('data-large');
    });
  });

  // Fermer la lightbox en cliquant sur la croix
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

  if (lightbox) {
    // Fermer la lightbox en cliquant en dehors de l'image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });

    // Fermer la lightbox avec la touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        lightbox.style.display = 'none';
      }
    });
  }
});
