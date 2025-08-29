<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a NestJS Articles API application that provides REST endpoints for managing articles. Built with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features

- ✅ **Articles Management**: Create and retrieve articles via REST API
- ✅ **In-Memory Storage**: Fast, lightweight data storage for development
- ✅ **Data Validation**: Comprehensive input validation using class-validator
- ✅ **TypeScript**: Full type safety with interfaces and DTOs
- ✅ **Auto-Generated IDs**: Sequential ID assignment starting from 1
- ✅ **Timestamps**: Automatic creation and update timestamp handling

## API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/articles` | Create a new article | `{ title, content, author }` |
| `GET` | `/articles` | Retrieve all articles | None |

## Article Data Structure

```typescript
{
  id: number;           // Auto-generated unique identifier
  title: string;        // Article title
  content: string;      // Article content/body
  author: string;       // Author name
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Usage Examples

### Create an Article

```bash
curl -X POST http://localhost:3000/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with NestJS",
    "content": "This is an introduction to NestJS framework...",
    "author": "Jane Smith"
  }'
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Getting Started with NestJS",
  "content": "This is an introduction to NestJS framework...",
  "author": "Jane Smith",
  "createdAt": "2024-08-16T10:30:45.123Z",
  "updatedAt": "2024-08-16T10:30:45.123Z"
}
```

### Get All Articles

```bash
curl -X GET http://localhost:3000/articles
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Getting Started with NestJS",
    "content": "This is an introduction to NestJS framework...",
    "author": "Jane Smith",
    "createdAt": "2024-08-16T10:30:45.123Z",
    "updatedAt": "2024-08-16T10:30:45.123Z"
  }
]
```

## Project Structure

```
src/
├── app.module.ts              # Root application module
├── main.ts                    # Application entry point
└── articles/                  # Articles feature module
    ├── articles.module.ts     # Articles module definition
    ├── articles.controller.ts # HTTP request handlers
    ├── articles.service.ts    # Business logic and data management
    ├── dto/
    │   └── create-article.dto.ts  # Data transfer object for validation
    └── interfaces/
        └── article.interface.ts   # TypeScript interface definition
```

## Development Commands

```bash
# Generate new controller
$ nest g controller articles

# Generate new service
$ nest g service articles

# Generate new module
$ nest g module articles
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Dependencies

### Core Dependencies
- `@nestjs/common` - Common NestJS utilities
- `@nestjs/core` - NestJS core functionality
- `@nestjs/platform-express` - Express platform integration
- `class-validator` - Decorator-based validation
- `class-transformer` - Object transformation utilities

### Development Dependencies
- `@nestjs/cli` - NestJS command line interface
- `@nestjs/testing` - Testing utilities
- `typescript` - TypeScript compiler

## Environment

- **Node.js**: 18+ recommended
- **NPM**: 8+ recommended
- **Default Port**: 3000

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Ugwu Kasie](https://github.com/KasiePatricia)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).