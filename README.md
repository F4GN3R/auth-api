<p align="center">
  <h1>🔒 Auth API</h1>

  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
</p>

## Tópicos

<ol>
  <li><a href="#description"><a href="#description">Descrição</a></li>
  <li><a href="#features">Funcionalidades</a></li>
  <li><a href="#requirements">Requisitos</a></li>
  <li><a href="#technologies-used">Tecnologias Utilizadas</a></li>
  <li><a href="#installation-and-configuration">Instalação e Configuração</a></li>
  <li><a href="#project-architecture">Arquitetura do Projeto</a></li>
  <li><a href="#security">Segurança</a></li>
  <li><a href="#tests">Testes</a></li>
  <li><a href="#api-documentation">Documentação da API</a></li>
  <li><a href="#production-environment">Ambiente de produção</a></li>
  <li><a href="#contribution">Contribuição</a></li>
  <li><a href="#license">Licença</a></li>
  <li><a href="#future-expansion-points">Pontos de Expansão Futuros</a></li>
  <li><a href="#estimated-schedule">Cronograma Estimado</a></li>
  <li><a href="#author">Autor</a></li>
</ol>

<h2 id="description">Descrição</h2>

Este projeto implementa regras de autenticação e autorização utilizando **NestJS**. O sistema oferece funcionalidades de cadastro, autenticação via e-mail/senha, geração de tokens JWT, controle de acesso baseado em papéis (roles), criptografia de senhas e recuperação de acesso por hash.

<h2 id="features">Funcionalidades</h2>

- **Gerenciamento de Usuário**: Permite o cadastro, edição, atualização e exclusão de usuários (CRUD).
- **Login**: Autenticação via e-mail e senha.
- **Geração de Token JWT**: Token JWT gerado no login para autenticação em rotas protegidas.
- **Recuperação de Senha**: Envio de e-mail para redefinição de senha.
- **Controle de Acesso (Roles)**: Permissões diferenciadas por papéis (Admin, User).

<h2 id="requirements">Requisitos</h2>

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

<h2 id="technologies-used">Tecnologias Utilizadas</h2>

- **NestJS**: Framework principal.
- **TypeScript**: Linguagem de programação.
- **JWT**: Para autenticação e autorização.
- **Bcrypt**: Para hashing de senhas.
- **Prisma**: ORM para interação com banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **MailerSend**: Para envio de e-mails.
- **Swagger**: Para documentação automática das APIs.
- **Docker**: Para containerização do ambiente.
- **Render**: Para ambiente de produção.

<h2 id="installation-and-configuration">Instalação e Configuração</h2>

### Pré-requisitos

- Node.js v20.17.0 ou superior
- Pnpm
- DockerCompose
- NestJS CLI

### Passos para Instalação

1. Clone o repositório:

```bash
git clone https://github.com/F4GN3R/auth-api
```

2. Instale as dependências:

```bash
$ cd auth-api && pnpm install
```

3. Executar instância do banco de dados:

```bash
$ docker-compose up
```

4. Configure as variáveis de ambiente no arquivo `.env`:

```bash
# DOCKER POSTGRESQL DATABASE
DATABASE_URL="postgresql://postgres:321654@localhost:6500/auth-api?schema=public"

# JWT
JWT_SECRET=""

# MAILERSEND
MAILERSEND_API_KEY=""
MAILERSEND_DOMAIN=""
MAILERSEND_TEMPLATE_ID=""

# WEBPAGE TO RESET PASSWORD
RESET_PASSWORD_URL=""
```

Para gerar o **JWT_SECRET** você pode utilizar o comando: `openssl rand -base64 32`

5. Execute as migrações do banco de dados:

```bash
$ pnpm exec prisma migrate dev
```

6. Inicie o servidor:

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

<h2 id="project-architecture">Arquitetura do Projeto</h2>

### Estrutura Modular

O projeto é organizado em módulos para facilitar a manutenção e escalabilidade:

- **AuthModule**: Gerencia a autenticação e geração de tokens JWT.
- **UserModule**: Responsável pelo CRUD de usuários.
- **MailerSendModule**: Responsável pelo envio de usuários.

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

<h2 id="security">Segurança</h2>

- **Hashing de Senhas**: As senhas são armazenadas utilizando `bcrypt`.
- **Autenticação JWT**: As rotas protegidas utilizam tokens JWT para autenticação.
- **Guards e Middleware**:
  - `AuthGuard`: Protege rotas que exigem autenticação.
  - `RolesGuard`: Assegura que usuários com permissões adequadas possam acessar rotas específicas.
- **Boas Práticas de Segurança**:
  - Proteção contra ataques de força bruta (rate-limiting).
  - Validação de entrada de dados para evitar injeções de SQL.
  - Proteção contra XSS e CSRF.

<h2 id="tests">Testes</h2>

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

<h2 id="api-documentation">Documentação da API</h2>

A documentação da API está disponível através do **Swagger**. Para acessá-la, inicie o projeto e navegue para:

```bash
http://localhost:3333/documentation
```

<h2 id="production-environment">Ambiente de produção</h2>

Para produção, escolhemos a plataforma [Render](https://render.com/) para publicar a API e o banco de dados.

```bash
https://auth-api-55xs.onrender.com/v1
```

<h2 id="contribution">Contribuição</h2>

1. Faça um fork do projeto.
2. Crie uma nova branch para a feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

<h2 id="license">Licença</h2>

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

<h2 id="future-expansion-points">Pontos de Expansão Futuros</h2>

- **Refresh Token**: Implementar um fluxo de refresh token para renovar o JWT.
- **OAuth**: Integração com provedores de login social (Google, Facebook).
- **Autenticação Multi-Fator (MFA)**: Adicionar uma camada extra de segurança.
- **Logs de Acesso e Auditoria**: Registrar tentativas de login e outras ações críticas.

<h2 id="estimated-schedule">Cronograma Estimado</h2>

| Fase                       | Tempo Estimado |
| -------------------------- | -------------- |
| Levantamento de Requisitos | 2 dias         |
| Configuração do Projeto    | 1 dia          |
| Desenvolvimento Backend    | 2 dias         |
| Implementação de Segurança | 2 dias         |
| Testes e Correções         | 2 dias         |
| Documentação               | 1 dia          |
| Deploy em produção         | 1 dia          |
| **Total estimado**         | **11 dias**    |

<h2 id="author">Autor</h2>

<table style="padding: none;">
  <tr>
    <td>
      <a href="https://github.com/F4GN3R">
        <img src="https://github.com/F4GN3R.png" width="60px" alt="F4GN3R" style="border-radius: 500%;"/>
      </a>
    </td>
    <td>
     <b>Fagner Morais</b>
     <br/>
    <small>Full Stack Developer and Senior System Analist</small>
    </td>
  </tr>
</table>

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/F4GN3R)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/fagner-morais-6732a7130/)

Esse `README.md` serve como uma documentação completa do projeto e pode ser utilizado diretamente no GitHub.
