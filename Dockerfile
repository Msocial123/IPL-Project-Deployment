# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Ensure that the public directory is accessible for serving static files
RUN mkdir -p public/uploads


# Expose the port the app runs on (default is 3000, but it's configurable via environment variables)
EXPOSE 3000

# Define environment variables (optional, replace MONGO_URI with your actual MongoDB URI or set this in .env)
ENV PORT=3000
ENV MONGO_URI=mongodb://mongodb:27017/ipl

# Start the application
CMD ["npm", "start"]
