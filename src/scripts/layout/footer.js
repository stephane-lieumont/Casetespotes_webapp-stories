import { conf } from '../app.conf'
import { getRoute } from '../routes/router'

const Footer = {
  /**
   * Render component
   * @returns {HTMLElement}
   */
  render: () => {
    const $node = document.createElement('footer')
    $node.classList.add('footer')
    const content = `
      <div class="footer__content">
        <a href="${getRoute('terms-of-use')}" data-testid="rules">Conditions générales</a>
        <a href="${conf.links.instagram}">Instagram</a>
        <a href="${conf.links.facebook}">Facebook</a>
        <span>CaseTesPotes © ${(new Date()).getFullYear()}</span>
      </div>`
    $node.innerHTML = content
    return $node
  }
}

export default Footer
