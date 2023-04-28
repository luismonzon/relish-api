FROM node:18

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "node", "dist/src/server" ]