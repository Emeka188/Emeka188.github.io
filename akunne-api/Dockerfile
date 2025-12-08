# Akunne API Dockerfile - runs Express + SQLite
FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies first (use package-lock if present)
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --production

# Copy the rest of the app
COPY . .

# Ensure entrypoint is executable
RUN chmod +x ./docker-entrypoint.sh || true

EXPOSE 4000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm","start"]
