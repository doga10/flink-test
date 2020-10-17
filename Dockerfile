FROM node:12
LABEL maintainer="Douglas Dennys <douglasdennys45@gmail.com>"
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build
EXPOSE 5050
CMD ["npm", "start"]
