
# Use the latest Node.js image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 
EXPOSE 3000

# Start the application
CMD [ "node", "index.js" ]