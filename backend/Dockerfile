# Builder stage: install dependencies and generate Prisma client
FROM node:18-alpine AS builder
WORKDIR /app

# Fix Prisma OpenSSL issue
RUN apk add --no-cache openssl

# Install all dependencies (includes prisma binary for generate)
COPY package*.json ./
RUN npm ci

# Copy application source and generate Prisma client
COPY . .
RUN npx prisma generate

# Prune development dependencies after build
RUN npm prune --production

# Runtime stage: smaller image
FROM node:18-alpine AS runner
WORKDIR /app

# Fix Prisma OpenSSL issue
RUN apk add --no-cache openssl

# Copy built app from builder
COPY --from=builder /app /app

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000
CMD ["npm", "start"]
