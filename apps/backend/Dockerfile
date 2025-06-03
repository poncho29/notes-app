# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm

COPY apps/backend/package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# Stage 3: Run
FROM node:18-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.env .env

RUN pnpm install --prod --frozen-lockfile

EXPOSE 4000

CMD ["pnpm", "start"]
