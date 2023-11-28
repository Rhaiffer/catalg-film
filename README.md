<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Teste-MKS

# Teste-MKS

Este projeto é um gerenciador de catálogos de filmes, onde você pode cadastrar e gerenciar seus filmes favoritos. Ele permite que você mantenha um registro de todos os seus filmes, tornando mais fácil para você encontrar e organizar seus filmes. Com este projeto, você nunca mais terá que se perguntar onde está aquele seu filme favorito.

## Começando

Estas instruções irão te guiar sobre como obter uma cópia do projeto e executá-la na sua máquina local para fins de desenvolvimento e testes. Veja a seção de "Deployment" para notas sobre como fazer o deploy do projeto em um sistema em produção.

### Pré-requisitos

O que você precisa para instalar o software e como instalá-lo.

- Docker
- Docker Compose
- Redis
- Nest.js
- PostgreSQL

## Instalação

Siga os passos abaixo para configurar um ambiente de desenvolvimento:

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/seuprojeto.git
```

2. Navegue até o diretório do projeto:
```bash
  cd teste-mks
```

3. crie um arquivo .env e um  .env.docker 


4. Agora, edite os arquivos .env e .env.docker com as configurações corretas para o seu ambiente.


5.Instale as dependências do projeto:


6.Inicie o projeto, ele irá rodas os testes automaticamente
```bash
# development
$ npm run start
```
7.Para iniciar o Docker, abra um novo terminal e execute:
```bash
docker-compose up
```
Se você deseja parar o Docker, abra um novo terminal e execute:
```bash
docker-compose down
```
Agora, o seu projeto deve estar rodando em localhost:3000 (ou a porta que você definiu no seu arquivo .env).
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Documentação da API

A documentação da API foi gerada automaticamente usando o Swagger. Você pode acessá-la em [http://localhost:3000/docs](http://localhost:3000/docs) quando o servidor estiver rodando. A documentação do Swagger fornece uma maneira fácil e interativa de explorar a API.

## Experiência com as Tecnologias

Acredito firmemente que a engenharia de qualidade é saber utilizar a ferramenta certa para o trabalho certo e seguir aprendendo constantemente sobre ela. Com base nisso, aqui está minha experiência com as tecnologias usadas neste projeto:

* [Nest](https://nestjs.com/) - Tenho pouco menos de 1 ano de experiência com Nest. Apesar de ainda estar aprendendo, escolhi o Nest para este projeto por sua arquitetura robusta e modular.

* [Jest](https://jestjs.io/) - Tenho usado o Jest para testes em vários projetos. Aprecio sua simplicidade e fácil integração com o Nest.

* [Docker](https://www.docker.com/) - Tenho experiência prática com Docker em vários projetos, usando-o para a containerização, o que permite uma fácil configuração e implantação do projeto.

* [PostgreSQL](https://www.postgresql.org/) - Tenho experiência com PostgreSQL e escolhi-o para este projeto por sua confiabilidade e recursos avançados.

* [Redis](https://redis.io/) - Tenho experiência com o Redis e o usei neste projeto como banco de dados em memória para cache, para melhorar a performance do projeto.

* [Swagger](https://swagger.io/) - Utilizei o Swagger para a documentação automática da API. Ele fornece uma interface de usuário interativa para a API, tornando mais fácil para os usuários explorarem e testarem a API. Você pode acessar a documentação da API em [http://localhost:3000/docs](http://localhost:3000/docs) quando o servidor estiver rodando.

## License

Nest is [MIT licensed](LICENSE).
