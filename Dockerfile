FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker logout

# docker build -t midall-frontend-api5:1.0.4 .

# docker tag midall-frontend-api5:1.0.4 dolphindatabase/midall-frontend-api5:1.0.4

# docker login 

# docker push dolphindatabase/midall-frontend-api5:1.0.4

# docker run -p 8080:8080 midall-frontend-api5:1.0.4
