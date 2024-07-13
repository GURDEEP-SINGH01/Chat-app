# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 9000

# Start the application from a specific path
CMD ["node", "src/index.js"]
