# Pokedox Monorepo

A modern, production-ready monorepo for the Pokedox project, built with Next.js, TypeScript, Lerna, and Storybook. This workspace is organized for scalable development, reusable components, and efficient team collaboration.

## Project Structure

```
.
├── apps/
│   └── pokedox/         # Main Next.js application
├── packages/
│   ├── components/      # Shared React UI components (with Storybook)
│   └── utils/           # Shared utility functions
├── package.json         # Monorepo root config and scripts
├── lerna.json           # Lerna configuration
├── Dockerfile           # Production-ready Docker setup
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Docker (for production builds)

### Install Dependencies
```sh
npm run bootstrap
```

### Development
Start all apps and packages in development mode:
```sh
npm run dev
```

### Build
Build all apps and packages:
```sh
npm run build
```

### Lint
Run linting across all packages and apps:
```sh
npm run lint
```

### Storybook (UI Components)
Run Storybook for the shared components package:
```sh
npm run storybook:components
```

### Clean
Remove all node_modules and build artifacts:
```sh
npm run clean
```

## Docker
Build and run the production Docker image:
```sh
docker build -t pokedox-monorepo .
docker run -p 3000:3000 pokedox-monorepo
```

## Testing
Run all tests for apps and packages:
```sh
npm test
```

Run tests for a specific workspace (e.g., the main app):
```sh
npm test --workspace=apps/pokedox
```

Run tests with coverage:
```sh
npm run coverage --workspace=apps/pokedox
```

## Technologies Used
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lerna](https://lerna.js.org/)
- [Storybook](https://storybook.js.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License
[MIT](LICENSE)
