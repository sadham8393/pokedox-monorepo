# Use official Node.js LTS image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY package.json lerna.json ./
COPY packages ./packages
COPY apps ./apps

# Install dependencies (including workspaces)
RUN npm install --frozen-lockfile

# Build all packages
RUN npm run build

# --- Production image ---
FROM node:20-alpine AS prod
WORKDIR /app

# Copy only built output and production deps
COPY --from=base /app/apps/pokedox/.next ./.next
COPY --from=base /app/apps/pokedox/public ./public
COPY --from=base /app/apps/pokedox/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
