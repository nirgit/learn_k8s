# 1. Use an official Node.js runtime as a parent image
FROM node:18

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy package files and install dependencies
# Note: We'll need to run 'npm init -y' and 'npm install express pg' first
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your app's source code
COPY . .

# 5. Make the port available to the world outside this container
EXPOSE 3000

# 6. Define the command to run your app
CMD [ "node", "index.js" ]

