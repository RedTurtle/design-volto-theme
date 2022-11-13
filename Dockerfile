FROM node:16-buster-slim as build

WORKDIR /home/node/app
USER root

COPY . .

ENV RAZZLE_API_PATH=VOLTO_API_PATH
ENV RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH
ENV RAZZLE_RECAPTCHA_KEY=VOLTO_RECAPTCHA_KEY
# ENV RAZZLE_GA_CODE=VOLTO_GA_CODE
# ENV SENTRY_DSN=VOLTO_SENTRY_DSN

#RUN buildDeps="build-essential ca-certificates git-core openssl" && \
RUN buildDeps="make" && \
    apt-get update && \
    apt-get install -y --no-install-recommends $buildDeps

RUN yarn set version 3.2.3 && \
    yarn --immutable && \
    yarn build && \
    rm -rf /home/node/.cache

#RUN apt-get purge $buildDeps -y && \
#    apt-get clean && \
#    rm -rf /var/lib/apt/lists/*

FROM node:16-buster-slim

WORKDIR /home/node/app
COPY --chown=node --from=build /home/node/app /home/node/app

EXPOSE 3000 3001 4000 4001
ENTRYPOINT ["/home/node/app/entrypoint.sh"]
CMD ["yarn", "start:prod"]

