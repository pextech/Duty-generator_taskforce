FROM node:14.15.1

# Create app directory
WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
EXPOSE 3000
# Bundle app source
COPY . .

CMD [ "npm", "start" ]
