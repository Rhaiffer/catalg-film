# Use uma imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o arquivo package.json e o arquivo package-lock.json
COPY package*.json ./


# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o container
COPY . .

# Compile o projeto
RUN npm run build

# Exponha a porta que a aplicação usará
EXPOSE 3000

# Defina o comando para rodar os testes
RUN npm test

# Defina o comando para rodar a aplicação
CMD npm test && npm run start:prod