
# node base image
FROM node:alpine  

#  we create a work dir app
WORKDIR /app

#  copy all the dependencies from the package.json 
COPY package.json .


# install them
RUN npm install --only=prod

# copy them into the directory
COPY . .

# start command.
CMD ["npm", "start"]