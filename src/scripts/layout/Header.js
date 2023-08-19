import { getRoute } from '../routes/router';

const Header = {
  name: 'header',
  wrapper: null,
  render: () => {
    const $node = document.createElement('header');
    const content = `
      <img class="logo" data-target="home" data-testid="logo" width="254" height="125" src="${require('../../assets/logo-case-tes-potes.svg')}" onclick="location.href='${getRoute(
        'home'
      )}'" alt="case tes potes">
    `;
    $node.innerHTML = content;
    Header.wrapper = $node;
    return $node;
  },
  logoLow: (isLow) => {
    if (isLow) {
      Header.wrapper.querySelector('.logo').classList.add('logo--low');
      Header.wrapper.classList.add('header--minify');
    } else {
      Header.wrapper.querySelector('.logo').classList.remove('logo--low');
      Header.wrapper.classList.remove('header--minify');
    }
  },
  addBtnReturn: () => {
    Header.destroyBtnReturn();
    const $node = document.createElement('button');
    $node.classList.add('fab-btn', 'fab-btn--return');
    $node.addEventListener('click', () => {
      history.back();
    });
    $node.innerHTML = 'Retour';
    Header.wrapper.prepend($node);
    const timer = setTimeout(() => {
      $node.classList.add('show');
      clearTimeout(timer);
    }, 600);
  },
  destroyBtnReturn: () => {
    const returnBtn = document.querySelector('.fab-btn--return');

    if (returnBtn) {
      returnBtn.remove();
    }

    if (Header.wrapper.querySelector('.fab-btn--return')) {
      const $node = Header.wrapper.querySelector('.fab-btn--return');
      $node.classList.remove('show');
      const timer = setTimeout(() => {
        $node.remove();
        clearTimeout(timer);
      }, 600);
    }
  },
};

export default Header;
