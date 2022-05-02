FROM adoptopenjdk/openjdk11:alpine

ARG version=${GRAPHDB_VERSION}
ARG edition=${GRAPHDB_EDITION}

# Install required tools
RUN apk add --no-cache bash util-linux procps net-tools busybox-extras less curl

# Unpack and install GraphDB
ADD deployment/graphdb/graphdb-${edition}-${version}-dist.zip /tmp/
RUN mkdir -p /opt/graphdb && \
    cd /opt/graphdb && \
    unzip /tmp/graphdb-${edition}-${version}-dist.zip && \
    rm /tmp/graphdb-${edition}-${version}-dist.zip && \
    mv graphdb-${edition}-${version} dist && \
    mkdir -p /opt/graphdb/home

ENV PATH=/opt/graphdb/dist/bin:$PATH

# Import data
COPY backend/database/data /tmp/data
COPY backend/database/conf/TK_SDG-config.ttl /tmp/conf/TK_SDG-config.ttl

ENV GDB_JAVA_OPTS="-Dgraphdb.home=/opt/graphdb/home"
ENV GRAPHDB_EXTERNAL_URL=${GRAPHDB_EXTERNAL_URL}

# Run graphdb
ENTRYPOINT ["/bin/sh", "-c"]
# Docker does not have access to volume during build, so we run the preload on startup if the repository does not exist
CMD ["if [ ! -d /opt/graphdb/home/data/repositories/TK_SDG ]; then  \ 
/opt/graphdb/dist/bin/preload -c /tmp/conf/TK_SDG-config.ttl -f -p /tmp/data/* ; fi; \ 
/opt/graphdb/dist/bin/graphdb -Dgraphdb.home=/opt/graphdb/home"]

EXPOSE 7200