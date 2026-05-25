# ─── Stage 1: install dependencies ───────────────────────────────────────────
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ─── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Non-secret build-time values (needed if any pages statically render with
# these URLs during `next build`). Set them in Coolify as Build variables.
# Real secrets (RESEND_API_KEY, PAYPAL_CLIENT_SECRET) are NOT here — runtime only.
ARG WORDPRESS_API_URL
ARG PAYPAL_API_BASE
ARG PAYPAL_CLIENT_ID
ENV WORDPRESS_API_URL=$WORDPRESS_API_URL
ENV PAYPAL_API_BASE=$PAYPAL_API_BASE
ENV PAYPAL_CLIENT_ID=$PAYPAL_CLIENT_ID

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ─── Stage 3: minimal production runner ───────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# standalone output includes a self-contained server.js + minimal node_modules
COPY --from=builder /app/public                          ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Runtime secrets (RESEND_API_KEY, PAYPAL_CLIENT_SECRET, ORDER_NOTIFICATION_EMAIL, etc.)
# are injected by Coolify at container start — never set them here.
CMD ["node", "server.js"]
