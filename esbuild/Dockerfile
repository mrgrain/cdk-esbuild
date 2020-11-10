FROM node:lts-alpine

ARG version=latest

# Install esbuild as global bin
RUN npm i -g esbuild@${version} --unsafe-perm

# Add Javascript JSON interface script and set as entrypoint
ENV NODE_PATH /usr/local/lib/node_modules
COPY ./esbuild-js /usr/local/bin/esbuild-js
RUN chmod +x /usr/local/bin/esbuild-js

ENTRYPOINT [ "esbuild-js" ]
