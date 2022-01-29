import { getRoute } from '../routes/router'

const Header = {
  name: 'header',
  render: () => {
    const $node = document.createElement('header')
    const content = `
      <img class="logo" data-target="home" width="254" height="125" src="${require('@/assets/logo-case-tes-potes.svg')}" onclick="location.href='${getRoute('home')}'" alt="case tes potes">
    `
    $node.innerHTML = content

    return $node
  },
  logoLow: (isLow) => isLow ? document.querySelector('.logo').classList.add('logo--low') : document.querySelector('.logo').classList.remove('logo--low')
}

export default Header
