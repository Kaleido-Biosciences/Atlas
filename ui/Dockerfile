# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL=__REACT_APP_API_URL__
ENV REACT_APP_DYNAMODB_ACCESS_KEY_ID=__REACT_APP_DYNAMODB_ACCESS_KEY_ID__
ENV REACT_APP_DYNAMODB_SECRET_ACCESS_KEY=__REACT_APP_DYNAMODB_SECRET_ACCESS_KEY__
ENV REACT_APP_DYNAMODB_TABLE=__REACT_APP_DYNAMODB_TABLE__

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent

# start app
CMD ["npm", "start"]
