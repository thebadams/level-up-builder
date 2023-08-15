# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.2.0
FROM node:${NODE_VERSION}-slim as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

LABEL fly_launch_runtime="Node.js"

COPY . /app
WORKDIR /app
# Node.js app lives here


# Set production environment

ENV NODE_ENV="production"
# Install pnpm
FROM base as prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base as build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run install:server
RUN pnpm run build


FROM base
COPY --from=prod-deps app/app/server/node_modules app/app/server/node_modules
COPY --from=build app/app/server/dist app/app/server/dist
# Start the server by default, this can be overwritten at runtime
EXPOSE 8000
CMD [ "pnpm", "run", "start" ]
