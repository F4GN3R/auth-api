<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank" style="font-size: 5rem; color: white; font-family: 'Poppins, sans-serif';">Loggin</a>
</p> -->

<!-- [circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">API de autenticação e controle de acessos.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>  -->

# Projeto: Sistema de Login com NestJS

## Descrição

Este projeto implementa um sistema de login seguro utilizando **NestJS**. O sistema oferece funcionalidades de cadastro, autenticação via e-mail/senha, geração de tokens JWT, controle de acesso baseado em papéis (roles) e criptografia de senhas.

## Funcionalidades

- **Gerenciamento de Usuário**: Permite o cadastro, edição, atualização e exclusão de usuários (CRUD).
- **Login**: Autenticação via e-mail e senha.
- **Geração de Token JWT**: Token JWT gerado no login para autenticação em rotas protegidas.
- **Recuperação de Senha**: Envio de e-mail para redefinição de senha.
- **Controle de Acesso (Roles)**: Permissões diferenciadas por papéis (Admin, User).

## Requisitos

### Requisitos Funcionais

- Cadastro, login e gerenciamento de usuários.
- Autenticação e autorização via JWT.
- Validação de tokens JWT em rotas protegidas.
- Controle de acesso baseado em papéis (Roles).
- Recuperação e redefinição de senha.

### Requisitos Não Funcionais

- **Segurança**: Uso de bcrypt para senhas e JWT para autenticação.
- **Escalabilidade**: Capacidade de suportar múltiplos usuários simultâneos.
- **Manutenibilidade**: Código modular, seguindo boas práticas (SOLID, Clean Code).

## Tecnologias Utilizadas

- **NestJS**: Framework principal.
- **TypeScript**: Linguagem de programação.
- **JWT**: Para autenticação e autorização.
- **Bcrypt**: Para hashing de senhas.
- **Prisma**: ORM para interação com banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Swagger**: Para documentação automática das APIs.
- **Docker**: Para containerização do ambiente.

## Instalação e Configuração

### Pré-requisitos

- Node.js v20.17.0
- Pnpm v9.11.0
- DockerCompose v1.27.4
- NestJS CLI v10.4.5

### Passos para Instalação

1. Clone o repositório:

```bash
git clone https://github.com/usuario/sistema-login-nestjs.git
```

2. Instale as dependências:

```bash
$ cd sistema-login-nestjs && pnpm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=nome_do_banco
JWT_SECRET=sua_chave_secretal
```

Para gerar o **JWT_SECRET** você pode utilizar o comando: `openssl rand -base64 32`

4. Execute as migrações do banco de dados:

```bash
$ pnpm run typeorm migration:run
```

5. Inicie o servidor:

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Arquitetura do Projeto

### Estrutura Modular

O projeto é organizado em módulos para facilitar a manutenção e escalabilidade:

- **AuthModule**: Gerencia a autenticação e geração de tokens JWT.
- **UserModule**: Responsável pelo CRUD de usuários.
- **RolesGuard**: Middleware para controle de acesso baseado em papéis.

### Rotas Principais

- **GET /alive**: Verificação de serviço disponível.
- **POST /user**: Cadastro de usuário.
- **GET /user**: Retorna os dados do usuário autenticado.
- **PATCH /user**: Atualiza os dados do usuário autenticado.
- **DELETE /user**: Remove o cadastro do usuário autenticado.
- **GET /user/list-all**: Retorna todos os usuários cadastrados.
- **POST /auth/sign-in**: Autenticação e geração de token JWT.
- **PATCH /auth/account-recovery**: Envia e-mail para recuperação de acesso.
- **PATCH /auth/reset-password**: Alteração de senha via hash.
- **PATCH /auth/update-password**: Atualização de senha.

## Segurança

- **Hashing de Senhas**: As senhas são armazenadas utilizando `bcrypt`.
- **Autenticação JWT**: As rotas protegidas utilizam tokens JWT para autenticação.
- **Guards e Middleware**:
  - `AuthGuard`: Protege rotas que exigem autenticação.
  - `RolesGuard`: Assegura que usuários com permissões adequadas possam acessar rotas específicas.
- **Boas Práticas de Segurança**:
  - Proteção contra ataques de força bruta (rate-limiting).
  - Validação de entrada de dados para evitar injeções de SQL.
  - Proteção contra XSS e CSRF.

## Testes

- **Testes Unitários**: Para verificar a lógica de autenticação e criptografia.
- **Testes de Integração**: Para garantir a interação correta entre os módulos (ex: login e geração de token).
- **Testes de Segurança**: Validar a resiliência do sistema contra ataques.

### Executar testes

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Documentação da API

A documentação da API está disponível através do **Swagger**. Para acessá-la, inicie o projeto e navegue para:

```
http://localhost:3000/api
```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch para a feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Pontos de Expansão Futuros

- **Refresh Token**: Implementar um fluxo de refresh token para renovar o JWT.
- **OAuth**: Integração com provedores de login social (Google, Facebook).
- **Autenticação Multi-Fator (MFA)**: Adicionar uma camada extra de segurança.
- **Logs de Acesso e Auditoria**: Registrar tentativas de login e outras ações críticas.

## Cronograma Estimado

| Fase                       | Tempo Estimado |
| -------------------------- | -------------- |
| Levantamento de Requisitos | 2 dias         |
| Configuração do Projeto    | 1 dia          |
| Desenvolvimento Backend    | 5 dias         |
| Implementação de Segurança | 3 dias         |
| Testes e Correções         | 3 dias         |
| Documentação               | 1 dia          |

## Autor

**Seu Nome**  
[GitHub](https://github.com/seu_usuario) | [LinkedIn](https://www.linkedin.com/in/seu-usuario/)

### Explicação dos Tópicos:

- **Instalação e Configuração**: Instruções para clonar o repositório, instalar dependências e configurar variáveis de ambiente.
- **Arquitetura do Projeto**: Resumo dos principais módulos e suas funções.
- **Rotas Principais**: Lista das principais rotas implementadas no sistema de login.
- **Segurança**: Detalhes sobre a segurança do sistema.
- **Testes**: Explicação sobre a abordagem de testes (unitários, integração, segurança).
- **Documentação da API**: Informações sobre como acessar a documentação gerada pelo Swagger.

Esse `README.md` serve como uma documentação completa do projeto e pode ser utilizado diretamente no GitHub.
