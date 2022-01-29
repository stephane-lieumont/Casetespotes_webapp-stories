import Button from '../components/button'

const Home = {
  name: 'home',
  render: (data) => {
    const $node = document.createElement('main')
    $node.classList.add('container')

    const content = `
      <div class="avatar">
        <img src="${data.picture}" alt="${data.firstname}" />
      </div>
      <div class="container__content">
        <h2>Décrivez votre amie ${data.firstname}</h2>
        <p class="container--small">Quelles sont ses préférences, ses qualités, une petite anecdote…<br />La description sera ensuite envoyée à ${data.firstname} qui décidera de l’afficher sur son profil.</p>
      </div>
      <div class="container__action container__action--column">
        ${Button.edit.render('Ecrire un témoignage', 'edit-testimony')}
      </div>
    `
    $node.innerHTML = content
    Home.eventListener($node)

    return $node
  },
  eventListener: (HTMLElement) => {
    // Load Avatar Image
    const image = HTMLElement.querySelector('.avatar img')
    const downloadingImage = new Image()
    downloadingImage.src = image.src
    downloadingImage.onload = () => HTMLElement.classList.add('show')
  }
}

export default Home
