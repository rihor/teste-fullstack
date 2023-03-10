FROM node:18-alpine

EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start:migrate:prod"]
