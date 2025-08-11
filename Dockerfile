# --- Base
FROM node:20.15.1-alpine AS base

RUN apk add --no-cache libc6-compat \
    && npm install -g pnpm@10


# --- Dependencias
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/back/package.json ./packages/back/
COPY packages/front/package.json ./packages/front/
COPY packages/config/package.json ./packages/config/
RUN pnpm install --frozen-lockfile


# --- Build
FROM base AS builder
WORKDIR /app
# Pendiente de ver si no se requiere mas dependencias de cada carpeta interna de cms y website
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/back/node_modules ./packages/back/node_modules
COPY --from=deps /app/packages/front/node_modules ./packages/front/node_modules
COPY --from=deps /app/packages/config/node_modules ./packages/config/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DISABLE_ESLINT=1
ARG NODE_ENV
ARG VITE_API_URL

RUN pnpm build


# --- Runner
FROM base AS runner
WORKDIR /app

# Instalar modulos adicionales solo para etapas de desarrollo e inspeccion del contenedor.
RUN apk update && \
    apk add --no-cache bash curl nano

	

#Pakages.json
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/back/package.json ./packages/back/
COPY --from=builder /app/packages/front/package.json ./packages/front/

#Dependencias para la imagen
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/back/node_modules ./packages/back/node_modules
COPY --from=deps /app/packages/front/node_modules ./packages/front/node_modules

# Archivos del proyecto
#back
COPY --from=builder /app/packages/back/src ./packages/back/src
#front
COPY --from=builder /app/packages/front/dist ./packages/front/dist
#config
COPY --from=builder /app/packages/config/ ./packages/config/

# Configurar entorno
ARG APP_PORT
EXPOSE $APP_PORT

# Ejecutar ambos
CMD ["sh", "-c", "pnpm run start"]