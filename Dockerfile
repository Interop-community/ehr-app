# base image
FROM node:9.5

COPY . .

RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
RUN npm install -g serve
RUN npm run build

# start app
CMD ["serve", "-s", "-p", "3000", "build"]