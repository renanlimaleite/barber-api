# Base image
FROM node:14.17-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port that the application listens on
EXPOSE 8000

# Start the application
CMD [ "npm", "run", "dev" ]