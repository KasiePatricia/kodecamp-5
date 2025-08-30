# <p align="center"> NestJS Blog API with Prisma & SQLite </p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A powerful RESTful API for managing blog articles built with NestJS, Prisma ORM, and SQLite database.</p>
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
  <img src="https://img.shields.io/badge/database-SQLite-blue.svg" alt="Database" />
  <img src="https://img.shields.io/badge/ORM-Prisma-2D3748.svg" alt="ORM" />
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 📋 Description

A comprehensive blog management API that provides full CRUD operations for articles. Built with modern technologies including NestJS framework, Prisma ORM for type-safe database operations, and SQLite for lightweight data persistence. Features include input validation, Swagger documentation, and robust error handling.

## 🚀 Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete articles
- ✅ **Type-Safe Database** - Prisma ORM with TypeScript support
- ✅ **Input Validation** - Comprehensive validation using class-validator
- ✅ **API Documentation** - Auto-generated Swagger/OpenAPI docs
- ✅ **Error Handling** - Proper HTTP status codes and error messages
- ✅ **Statistics Endpoint** - Get article count and latest article
- ✅ **Lightweight Database** - SQLite for easy development and testing

## 🛠️ Technology Stack

- **Framework:** NestJS
- **Database:** SQLite
- **ORM:** Prisma
- **Validation:** class-validator, class-transformer
- **Documentation:** Swagger API
- **Language:** TypeScript

## 📁 Project Structure

```
src/
├── app.module.ts
├── main.ts
├── prisma/
│   └── prisma.service.ts
├── articles/
│   ├── articles.module.ts
│   ├── articles.controller.ts
│   ├── articles.service.ts
│   ├── dto/
│   │   ├── create-article.dto.ts
│   │   └── update-article.dto.ts
│   └── entities/
│       └── article.entity.ts
prisma/
├── schema.prisma
└── dev.db (generated)
```

## Development Commands

```bash
# Generate new controller
$ nest g controller articles

# Generate new service
$ nest g service articles

# Generate new module
$ nest g module articles

# Generate new module
$ nest g module prisma

# Generate new service
$ nest g service prisma
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd blog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env` file in the project root:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Application
   PORT=3000
   NODE_ENV=development
   ```

4. **Database setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Create and run migrations
   npx prisma migrate dev --name init
   ```

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The application will be available at:
- **API Server:** http://localhost:3000
- **Swagger Documentation:** http://localhost:3000/api

## 📊 Database Management

```bash
# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database
npm run db:reset

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

## 🔗 API Endpoints

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/articles` | Create a new article |
| `GET` | `/articles` | Retrieve all articles |
| `GET` | `/articles/:id` | Get a specific article |
| `PUT` | `/articles/:id` | Update an article |
| `DELETE` | `/articles/:id` | Delete an article |

### Sample Request/Response

#### Create Article
```bash
POST /articles
Content-Type: application/json

{
  "title": "Getting Started with NestJS",
  "content": "NestJS is a progressive Node.js framework..."
}
```

#### Response
```json
{
  "id": 1,
  "title": "Getting Started with NestJS",
  "content": "NestJS is a progressive Node.js framework...",
  "createdAt": "2024-08-29T10:30:45.123Z",
  "updatedAt": "2024-08-29T10:30:45.123Z"
}
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Manual Testing with Sample Data

You can test the API using these sample articles:

**Article 1:**
```json
{
  "title": "Introduction to NestJS",
  "content": "NestJS is a progressive Node.js framework for building efficient and scalable server-side applications."
}
```

**Article 2:**
```json
{
  "title": "Working with Prisma ORM",
  "content": "Prisma is a next-generation ORM that provides a type-safe database client and automated migrations."
}
```

## 📚 API Documentation

Once the application is running, visit http://localhost:3000/api to access the interactive Swagger documentation where you can:

- View all available endpoints
- Test API calls directly from the browser
- See request/response schemas
- Download OpenAPI specification

## 🔧 Development Scripts

```bash
# Format code
npm run format

# Lint code
npm run lint

# Build for production
npm run build

# Start production build
npm run start:prod
```

## 🛡️ Validation & Error Handling

The API includes comprehensive validation:

- **Input Validation:** Title and content are required
- **Type Safety:** TypeScript ensures type correctness
- **Error Responses:** Proper HTTP status codes (400, 404, 500)
- **SQL Injection Protection:** Prisma ORM provides built-in protection

## 🚀 Deployment

### Local Production Build
```bash
npm run build
npm run start:prod
```

### Deployment Platforms
This application can be deployed to:
- **Railway**
- **Vercel**
- **Heroku**
- **DigitalOcean App Platform**
- **AWS/GCP/Azure**

For cloud deployment, consider switching to PostgreSQL or MySQL for production use.

## 🔧 Troubleshooting

### Common Issues

1. **Database not found**
   ```bash
   npx prisma migrate dev --name init
   ```

2. **Prisma client not generated**
   ```bash
   npx prisma generate
   ```

3. **TypeScript errors**
   Ensure all dependencies are installed and Prisma client is generated

4. **Port already in use**
   Change the PORT in your `.env` file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is [MIT licensed](LICENSE).

## 👨‍💻 Author

- **Author** - [Ugwu Kasie](https://github.com/KasiePatricia)
- **Framework** - [NestJS](https://nestjs.com/)

## 🙏 Acknowledgments

- [NestJS Team](https://nestjs.com/) for the amazing framework
- [Prisma Team](https://prisma.io/) for the excellent ORM
- [SQLite](https://sqlite.org/) for the lightweight database

---

<p align="center">Made with ❤️ using NestJS, Prisma, and SQLite</p>
