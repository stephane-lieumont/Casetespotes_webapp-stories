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

RUN yarn prod

FROM nginx:1.22.0-alpine as run

COPY --from=builder /public /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]