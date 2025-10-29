FROM registry.access.redhat.com/ubi8/nodejs-16

# Create app directory
WORKDIR /tmp

USER root
# copy packge.json to the workdir
COPY Application/src/package*.json ./


# install npm dependencies
RUN npm install && npm audit fix --force

# Copy application file to the 
COPY Application/src .

# create local env varibel for the PORT
# use key=value format to avoid legacy warning
ENV PORT=8080

USER 1001

EXPOSE 8080
CMD [ "node", "server.js" ]