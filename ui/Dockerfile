# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app
#ARG REACT_APP_DYNAMODB_ACCESS_KEY_ID
#ARG REACT_APP_DYNAMODB_SECRET_ACCESS_KEY

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL https://kapture-staging.apps.kaleidobio.com/api
#ENV REACT_APP_DYNAMODB_ACCESS_KEY_ID=${REACT_APP_DYNAMODB_ACCESS_KEY_ID}
#ENV REACT_APP_DYNAMODB_SECRET_ACCESS_KEY=${REACT_APP_DYNAMODB_SECRET_ACCESS_KEY}

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent

# start app
CMD ["npm", "start"]
