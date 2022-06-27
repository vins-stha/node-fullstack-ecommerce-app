
FROM alpine:3.14

# Working directory
WORKDIR /app

COPY /client/*.json ./

# Install dependencies
RUN npm install

# Copy local files to working directory
COPY . . 

EXPOSE 3000

CMD ["npm", "start"]

