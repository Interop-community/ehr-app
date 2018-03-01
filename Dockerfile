# base image
FROM node:9.5

COPY . .

RUN npm install
RUN npm install react-scripts@1.1.1 -g
RUN npm install -g serve
RUN npm run build

# start app
CMD ["serve", "-s", "-p", "3000", "build"]
