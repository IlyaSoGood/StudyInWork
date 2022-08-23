export default function initMenu() 
{
  // Menu code here or some jQuery
  window.addEventListener('DOMContentLoaded', () => {
    const menuMobile = document.querySelector('[data-role="menu-mobile"]'),
          menuMobileButton = document.querySelector('[data-role="menu-button"]'),
          menuBlock = document.querySelectorAll('.menu__block'),
          submenuButtons = document.querySelectorAll('[data-role="submenu-button"]'),
          submenuMobile = document.querySelectorAll('.menu__submenu');


    menuMobileButton.addEventListener('click', toggleMenuMobile);

    function toggleMenuMobile () {
      if (menuMobile.classList.contains('active') && menuMobileButton.classList.contains("header__mobile-button_active")) {
        menuMobileButton.classList.remove("header__mobile-button_active");
        menuMobile.classList.remove('active');
        document.body.style.overflow = '';
        hideSubmenuMobileAll();
      } else {
        menuMobileButton.classList.add("header__mobile-button_active");
        menuMobile.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function toggleSubmenuMobile () {
      submenuButtons.forEach ((button, i) => {
        button.addEventListener('click', () => {
          if (submenuMobile[i].classList.contains('showDown')) {
            hideSubmenuMobile(i);
            menuBlock[i].classList.remove('menu__block_active');
            button.classList.remove('menu__submenu-button_active');
          } else {
            button.classList.add('menu__submenu-button_active');
            menuBlock[i].classList.add('menu__block_active');
            showSubmenuMobile(i);
          }
        });
      });

    }
    function hideSubmenuMobileAll () {
      submenuMobile.forEach (item => {
        item.classList.remove('showDown');
        item.classList.add('hideUp');
      });
      menuBlock.forEach (item => {
        item.classList.remove('menu__block_active');
      });

      submenuButtons.forEach (item => {
        item.classList.remove('menu__submenu-button_active');
      });
    }

    function showSubmenuMobile (i) {
      submenuMobile[i].classList.remove('hideUp');
      submenuMobile[i].classList.add('showDown');

    }
    function hideSubmenuMobile (i) {
      submenuMobile[i].classList.add('hideUp');
      submenuMobile[i].classList.remove('showDown');
    }
    hideSubmenuMobileAll();
    toggleSubmenuMobile();








  });
}