# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL https://__KAPTURE_URL__.apps.kaleidobio.com/api
ENV REACT_APP_DYNAMODB_ACCESS_KEY_ID=__REACT_APP_DYNAMODB_ACCESS_KEY_ID__
ENV REACT_APP_DYNAMODB_SECRET_ACCESS_KEY=__REACT_APP_DYNAMODB_SECRET_ACCESS_KEY__
ENV REACT_APP_DYNAMODB_TABLE=__REACT_APP_DYNAMODB_TABLE__
ENV REACT_APP_COGNITO_CLIENT_ID=__REACT_APP_COGNITO_CLIENT_ID__
ENV REACT_APP_COGNITO_SECRET=__REACT_APP_COGNITO_SECRET__
ENV REACT_APP_COGNITO_DOMAIN=__REACT_APP_COGNITO_DOMAIN__
ENV REACT_APP_COGNITO_CALLBACK_URL=https://__ATLAS_URL__/callback
ENV REACT_APP_COGNITO_USERINFO_ENDPOINT=https://__REACT_APP_COGNITO_DOMAIN__/userinfo
ENV REACT_APP_COGNITO_TOKEN_ENDPOINT=https://__REACT_APP_COGNITO_DOMAIN__/oauth2/token

# install and cache app dependencies
COPY package.json /app/package.json
COPY config/default.conf /etc/nginx/conf.d/default.conf
RUN npm install --silent

# start app
CMD ["npm", "start"]
