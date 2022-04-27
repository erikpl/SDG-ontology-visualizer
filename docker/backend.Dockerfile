FROM node:14-alpine
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock tsconfig.json ./
RUN yarn

# Run the app
COPY . ./
ENV PORT 3001
# This serves the app with the dev-server, should probably instead build it and serve it
# as a production server, tho that requires some code cleanup before tsc -p builds
CMD ["yarn", "start"]
EXPOSE 3001


