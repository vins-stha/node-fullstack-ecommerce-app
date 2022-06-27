
FROM node:17-alpine3.14

# Working directory
WORKDIR /app

COPY *.json ./
#COPY yarn* ./
# Install dependencies
RUN yarn install

# Copy local files to working directory
COPY . . 

EXPOSE 3000

#RUN npm run build

##RUN npm install -g serve

#CMD ["serve", "build"]

CMD ["npm", "start"]

