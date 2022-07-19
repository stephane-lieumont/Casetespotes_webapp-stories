import Avatar from '../components/Avatar'
import Button from '../components/Button'

const Home = {
  wrapper: null,
  /**
   * Render Component
   * @param {Object} data
   * @returns {HTMLElement}
   */
  render: (data) => {
    const $node = document.createElement('main')
    $node.classList.add('container', 'load')

    const content = `
      <div class="container__content" data-testid="home">
        <h2>Décrivez votre amie ${data.singleFirstname}</h2>
        <p class="container--small">Quelles sont ses préférences, ses qualités, une petite anecdote… La description sera ensuite envoyée à ${data.singleFirstname} qui décidera de l’afficher sur son profil.</p>
      </div>
      <div class="container__action container__action--column">
        ${Button.edit.render('Ecrire un témoignage', 'edit-testimony')}
      </div>
    `
    $node.innerHTML = content
    $node.prepend(Avatar.render(data, $node))
    Home.wrapper = $node

    return $node
  }
}

export default Home
