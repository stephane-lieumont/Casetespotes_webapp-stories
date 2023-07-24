
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
``localhost/?token=:token&singleId=:singleId``  
``localhost/?token=:token&singleId=:singleId#/edition-temoignage``  
``localhost/?token=:token&singleId=:singleId#/temoignage-enregistre``  
``localhost/?token=:token&singleId=:singleId#/invitation-incorrecte``  

## Configuration App
Create `.env` file to configure application.

```javascript
// .env.sample for example
API_HOST= "192.168.1.2"
API_SCHEME= "http"
API_PORT= "8090"
LINK_INSTAGRAM= "https=//www.instagram.com/case_tes_potes",
LINK_FACEBOOK= "https=//www.facebook.com/CaseTesPotes",
LINK_APPSTORE= "#"
LINK_PLAYSTORE= "#"
DEMO= false
```

## Configuration Server
modify nginx config for image prod `.nginx.conf`.

```javascript
// nginx/nginx.conf
server {
    listen 80;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri /index.html;               
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
