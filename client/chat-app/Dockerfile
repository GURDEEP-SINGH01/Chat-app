FROM node:18

WORKDIR /client/chat-app

COPY package*.json ./

# RUN npm install
RUN npm cache clean --force && npm install --legacy-peer-deps

COPY . .

# Build the React application
RUN npm run build

# Install serve globally to serve the build folder
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build"]