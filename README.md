
# Frontend WebApp for testimony
![made-with-node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![made-with-javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![made-with-sass](	https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)  

---
## Description

##### Single Friends Testimonials Form
. Responsive webapp javascript vanilla
. Powered by Webpack 5
. Check Url mail token and User can edit Story for Single
. Send Story on API

## Usage 
Use [node.js](https://nodejs.org/en/download/) to work on this project.

```bash
npm install
npm run dev
```
Build application :

```bash
npm install
npm run prod
```

## Route local
``localhost/?t=1234``
``localhost/?t=1234#/edition-temoignage``
``localhost/?t=1234#/temoignage-enregistre``
``localhost/?t=1234#/invitation-incorrecte``

## Configuration
The `src/scripts/app.conf.js` file is used to change certain elements of the application
```javascript
export const conf = {
  apptokenTMP: '1234',

  links: {
    instagram: 'https://www.instagram.com/case_tes_potes',
    facebook: 'https://www.facebook.com/CaseTesPotes',
    appstore: '#',
    playstore: '#'
  }
}
```