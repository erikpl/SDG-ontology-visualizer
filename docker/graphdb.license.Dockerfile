ARG edition=${GRAPHDB_EDITION:-se}
ARG version=${GRAPHDB_VERSION:-9.10.1}

FROM ontotext/graphdb:${version}-${edition}


# Add License
COPY deployment/license/graphdb.license /opt/graphdb/dist/license/graphdb.license

# Add config
COPY backend/database/conf/TK_SDG-config.ttl /tmp/conf/TK_SDG-config.ttl

# Import data
COPY backend/database/data /tmp/data
ENV GDB_JAVA_OPTS="-Dgraphdb.home=/opt/graphdb/home"
ENV GRAPHDB_EXTERNAL_URL=${GRAPHDB_EXTERNAL_URL}

ENTRYPOINT [ "sh", "-c" ]
# Docker does not have access to volume during build, so we run the preload on startup if the repository does not exist
CMD ["if [ ! -d /opt/graphdb/home/data/repositories/TK_SDG ]; then  \ 
/opt/graphdb/dist/bin/preload -c /tmp/conf/TK_SDG-config.ttl -f -p /tmp/data/* ; fi; \ 
/opt/graphdb/dist/bin/graphdb -Dgraphdb.home=/opt/graphdb/home -Dgraphdb.license.file=/opt/graphdb/dist/license/graphdb.license"]

EXPOSE 7200