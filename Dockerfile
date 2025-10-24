# Use official Deno image
FROM denoland/deno:latest
# Set working directory
WORKDIR /app

# Copy dependency files
COPY deno.json package.json deno.lock* ./

# Install dependencies
RUN deno install

# Copy application code
COPY . .

# Build the SvelteKit app
RUN deno run -A npm:vite build

# Expose port
ENV PORT=8000
EXPOSE 8000

# Start the Deno server
CMD ["deno", "run", "-A", ".deno-deploy/server.ts"]
