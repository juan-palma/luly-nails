# --- Base
FROM node:20.15.1-alpine AS base

RUN apk add --no-cache libc6-compat \
    && npm install -g pnpm@10


# --- Dependencias
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY back/package.json ./back/
COPY front/package.json ./front/
RUN pnpm install --frozen-lockfile


# --- Build
FROM base AS builder
WORKDIR /app
# Pendiente de ver si no se requiere mas dependencias de cada carpeta interna de cms y website
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/back/node_modules ./back/node_modules
COPY --from=deps /app/front/node_modules ./front/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DISABLE_ESLINT=1
ARG NODE_ENV
ARG VITE_API_URL

RUN pnpm build


# --- Runner
FROM base AS runner
WORKDIR /app

# herramientas para poder inspeccionar el contenedor
#RUN apk update && \
#    apk add --no-cache bash curl nano
	

#Pakages.json
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/back/package.json ./back/

#Dependencias para la imagen
RUN pnpm install

# Archivos del proyecto
#back
COPY --from=builder /app/back/src ./back/src
#front
COPY --from=builder /app/front/dist ./front/dist

# Configurar entorno
ARG APP_PORT
EXPOSE $APP_PORT

# Ejecutar ambos
CMD ["sh", "-c", "pnpm run start"]