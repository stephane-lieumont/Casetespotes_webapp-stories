FROM node:16-alpine AS deps

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/
COPY ./yarn.lock /app/
COPY ./package-lock.json /app/

RUN yarn --frozen-lockfile

FROM node:16-alpine AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DEMO
ENV DEMO ${DEMO}

ARG PUBLIC_URL
ENV PUBLIC_URL ${PUBLIC_URL}

RUN yarn prod

FROM nginx:1.22.0-alpine as run

COPY --from=builder /nginx/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /public /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]