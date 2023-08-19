import { apiPublic } from '../../app';
import popupAnimation from '../../assets/lottie/validateCheck.json';
import { conf } from '../app.conf';
import Alert from '../components/Alert';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Popup from '../components/Popup';
import Store from '../store/store';

const EditTestimony = {
  wrapper: null,
  inputMaxLength: 280,
  data: null,
  apiObject: null,
  /**
   * @param {Object} data
   * @returns {HTMLElement}
   */
  render: (data) => {
    Object.defineProperty(Popup, 'data', {
      value: data,
      writable: false,
    });

    EditTestimony.data = data;

    const $node = document.createElement('main');
    $node.classList.add('container', 'load');

    const content = `
      <div class="container__content">
        <h2>Décrivez votre amie ${data.singleFirstname}</h2>
        <p class="container--small">Quelles sont ses préférences, ses qualités, une petite anecdote…<br /> La description sera ensuite envoyée à Julie qui décidera de l’afficher sur son profil.</p>
        <form class="form-control" data-testid="form">
          <div class="form-control__input">
            <input type="text"  name="email" data-testid="input-email" value="${
              Store.formEditStory.inputEmail
            }" />
            <label>Email</label>
          </div>
          <div class="form-control__input">
            <textarea name="content"  data-testid="input-story" data-value="${
              Store.formEditStory.inputStory
            }">${Store.formEditStory.inputStory}</textarea>
            <label>Votre témoignage</label>
            <div class="form-control__char"><span>Reste ${
              EditTestimony.inputMaxLength
            }</span> caractères</div>
          </div>
          <div class="container__action">
            ${Button.send.render('Envoyer le témoignage')}
          </div>
        </form>
      </div>
    `;

    $node.innerHTML = content;
    $node.prepend(Avatar.render(data, $node));
    EditTestimony.wrapper = $node;
    EditTestimony.eventListener();

    return $node;
  },

  /**
   * @param {HTMLElement} HTMLElement
   */
  eventListener: () => {
    EditTestimony.wrapper
      .querySelector('input')
      .addEventListener('input', EditTestimony.changeInputEmail);
    EditTestimony.wrapper
      .querySelector('textarea')
      .addEventListener('input', EditTestimony.changeInputStory);
    EditTestimony.wrapper
      .querySelector('form button')
      .addEventListener('click', EditTestimony.sendForm);
  },

  changeInputEmail: (e) => {
    e.target.setAttribute('value', e.target.value);
    Store.formEditStory.inputEmail = e.target.value;
    EditTestimony.hideAlert();
  },

  changeInputStory: (e) => {
    e.target.dataset.value = e.target.value;
    Store.formEditStory.inputStory = e.target.value;
    if (EditTestimony.inputMaxLength) {
      EditTestimony.wrapper.querySelector('.form-control__char span').innerHTML =
        EditTestimony.inputMaxLength - e.target.value.length;
    }
    if (e.target.value.length >= EditTestimony.inputMaxLength) {
      e.target.addEventListener('keydown', EditTestimony.stopEditable);
    } else {
      e.target.removeEventListener('keydown', EditTestimony.stopEditable);
    }
    EditTestimony.hideAlert();
  },

  renderPopup: () => {
    if (!document.querySelector('.popup')) {
      Popup.title = `Ton témoignage  a été envoyé à ${Popup.data.singleFirstname}!`;
      Popup.content =
        'Connaitrais tu un(e) pote célib qui aurait besoin de coup de main pour trouver l’âme sœur ?';
      Popup.buttons = [Button.blue.render('En savoir plus', 'thanks', 'close')];
      Popup.animation = popupAnimation;
      document.querySelector('body').appendChild(Popup.render());
      EditTestimony.eventListenerPopup();
    }
  },

  destroyPopup: () => {
    Popup.destroyPopup();
  },

  eventListenerPopup: () => {
    Popup.wrapper
      .querySelector('button[data-action="close"]')
      .addEventListener('click', EditTestimony.destroyPopup);
  },

  /**
   * Stop editing textarea
   * @param {KeyboardEvent} e
   */
  stopEditable: (e) => {
    if (e.key !== 'Enter' && e.key !== 'Backspace') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return true;
  },

  /**
   * Dispay error alert
   * @param {Object[{string, HTMLElement}]} errorList
   */
  displayAlert: (errorList) => {
    const errors = [];

    errorList.forEach((item) => {
      if (item.input) item.input.classList.add('error');
      errors.push(item.error);
    });

    if (Alert.wrapper) Alert.wrapper.remove();

    Alert.content = errors.join('<br />');
    document.querySelector('header').appendChild(Alert.render());
  },

  /**
   * Destrop Alert
   */
  hideAlert: () => {
    Alert.destroyAlert();
    document
      .querySelectorAll('.form-control__input')
      .forEach((item) => item.classList.remove('error'));
  },

  /**
   * Validate form inputs
   * @param {Object} dataSubmit
   * @returns {Boolean}
   */
  validateForm: (dataSubmit) => {
    const inputEmail = EditTestimony.wrapper.querySelector('input[name="email"]').parentNode;
    const inputStory = EditTestimony.wrapper.querySelector('textarea[name="content"]').parentNode;
    const errorList = [];

    // Check inputs value length

    if (dataSubmit.email.length < 3) {
      errorList.push({ error: 'Veuillez saisir le champs email', input: inputEmail });
    }
    if (dataSubmit.content.length < 30) {
      errorList.push({
        error: 'Veuillez rédiger votre témoignage<br />minimum de 30 charactères',
        input: inputStory,
      });
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        dataSubmit.email.toLowerCase()
      )
    ) {
      errorList.push({ error: 'Veuillez saisir un email valide', input: inputEmail });
    }

    if (errorList.length === 0) {
      EditTestimony.hideAlert();
      return true;
    } else {
      EditTestimony.displayAlert(errorList);
      return false;
    }
  },

  /**
   * Send form on Database
   * @param {ClickEvent} e
   */
  sendForm: async (e) => {
    e.preventDefault();
    e.target.classList.add('btn--load');

    // init formData
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const dataSubmit = Object.fromEntries(formData.entries());
    dataSubmit.id = EditTestimony.data.id;

    if (EditTestimony.validateForm(dataSubmit)) {
      try {
        if (conf.demo) {
          await apiPublic.sendFormStoryMock(dataSubmit);
        } else {
          await apiPublic.sendFormStory(dataSubmit);
        }

        EditTestimony.renderPopup();
      } catch (e) {
        if (e.toString().includes('Wrong hash')) {
          EditTestimony.displayAlert([
            { error: "L'email que vous avez saisie ne correspond pas à l'invitation" },
          ]);
        } else {
          EditTestimony.displayAlert([
            { error: "Une erreur c'est produite lors de l'enregistrement des données" },
          ]);
        }
      }

      e.target.classList.remove('btn--load');
    } else {
      e.target.classList.remove('btn--load');
    }
  },
};

export default EditTestimony;
