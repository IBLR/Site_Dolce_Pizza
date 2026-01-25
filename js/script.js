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
  [lastNameInput, phoneInput, dateInput, timeInput, numberInput].forEach(
    (input) => {
      input.addEventListener("input", () => {
        if (validateField(input)) {
          clearError(input);
        }
      });
    }
  );

  /* Complete validation upon submit */
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
});
