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