# Base image
FROM node:20.13-alpine as base

# Set Workdir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy all (exclude by .dockerignore) to /home/node/app
COPY . .

# Install all dependencies
RUN npm install

# *
# * ============= Dev Image Setup =============
# *
FROM base as development
RUN npm install -g nodemon

# Set Non Root User
USER node

# Set permissions to node:node
COPY --chown=node:node . .

# *
# * ============= Prod Image Setup =============
# *
FROM base as production
RUN npm install -g pm2
# ENV PM2_PUBLIC_KEY oila59xgf1fzsau
# ENV PM2_SECRET_KEY 5bx0awmeb5696uh

# Set Non Root User
USER node

# Set permissions to node:node
COPY --chown=node:node . .

# Start single instances using pm2
CMD ["pm2-runtime", "bin/www"]


# # Base image
# FROM amd64/node:20-alpine

# ARG _WORKDIR=/app
# ARG PORT=30000

# # USER root
# # RUN apk add git

# WORKDIR ${_WORKDIR}

# ADD . ${_WORKDIR}

# RUN npm install

# RUN npm install pm2 -g


# # USER node
# EXPOSE ${PORT}

# ENV TZ=Asia/Jakarta

# # Start single instances using pm2
# CMD ["pm2-runtime", "bin/www"]
