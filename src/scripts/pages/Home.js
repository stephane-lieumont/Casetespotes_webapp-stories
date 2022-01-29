import Button from '../components/button'

const Home = {
  name: 'home',
  render: (data) => {
    const $node = document.createElement('main')
    $node.classList.add('container')

    const content = `
      <div class="avatar">
        <img src="${data.picture}" />
      </div>
      <div class="container__content">
        <h2>Décrivez votre amie ${data.firstname}</h2>
        <p class="container--small">Quelles sont ses préférences, ses qualités, une petite anecdote…<br />La description sera ensuite envoyée à ${data.firstname} qui décidera de l’afficher sur son profil.</p>
        <p class="container--medium"><strong>Choisissez comment <br /> vous voulez faire votre témoignage</strong></p>
      </div>
      <div class="container__action container__action--column">
        ${Button.edit.render('Ecrire un témoignage', 'edit-testimony')}
        ${Button.movie.render('Enregistrer un témoignage', 'edit-testimony-video')}
        ${Button.mic.render('Enregistrer un témoignage', 'edit-testimony-audio')}
      </div>
    `
    $node.innerHTML = content

    return $node
  }
}

export default Home
