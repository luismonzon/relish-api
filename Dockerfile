FROM node:18

RUN npm install -g pnpm

# Bundle app source
COPY . .


RUN pnpm install

EXPOSE 5000

CMD [ "node", "dist/src/server" ]