# syntax=docker/dockerfile:1.7
FROM rust:1-slim-bookworm AS build
WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends pkg-config && \
    rm -rf /var/lib/apt/lists/*

COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY migrations ./migrations

RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/app/target \
    cargo build --release --locked && \
    cp target/release/notes-api /notes-api

FROM debian:bookworm-slim AS runtime
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /notes-api /usr/local/bin/notes-api

EXPOSE 3000
CMD ["notes-api"]
