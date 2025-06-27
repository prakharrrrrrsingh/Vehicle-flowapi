FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Set environment variable for port
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
