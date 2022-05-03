FROM node:14 as build
ENV DISABLE_ESLINT_PLUGIN true
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Build site
ARG DOMAIN
ENV REACT_APP_BACKEND_URL="https://$DOMAIN/api"
COPY . ./
RUN yarn build

# Serve static files
FROM caddy:2.4.6-alpine
COPY --from=build /app/build /srv/
CMD ["caddy", "file-server", "--listen", ":3000", "--root", "/srv"]

EXPOSE 3000