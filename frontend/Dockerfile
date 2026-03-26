FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Use npm install to avoid strict lockfile mismatch in Docker build.
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install only production dependencies (no dev dependencies)
RUN npm install --omit=dev

COPY --from=builder /app/build ./build
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
