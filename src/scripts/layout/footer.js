import { conf } from '../app.conf'

const Footer = {
  name: 'footer',
  render: () => {
    const $node = document.createElement('footer')
    $node.classList.add('footer')
    const content = `
      <div class="footer__content">
        <a href="#">Conditions générales</a>
        <a href="${conf.links.instagram}">Instagram</a>
        <a href="${conf.links.facebook}">Facebook</a>
        <span>CaseTesPotes © 2022</span>
      </div>`
    $node.innerHTML = content
    return $node
  }
}

export default Footer
