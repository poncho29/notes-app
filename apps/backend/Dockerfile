# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY apps/backend/package.json apps/backend/package.json

RUN pnpm install --frozen-lockfile --prefer-offline

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

WORKDIR /app/apps/backend
RUN pnpm add -D typescript
RUN pnpm build

# Stage 3: Run
FROM node:18-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY --from=builder /app/apps/backend ./apps/backend

RUN pnpm install --prod --frozen-lockfile

EXPOSE 4000

WORKDIR /app/apps/backend

CMD ["pnpm", "start"]
