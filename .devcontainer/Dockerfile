# [Choice] Debian OS version: bullseye, buster
ARG VARIANT=bullseye
ARG BUILDPLATFORM=linux/amd64
FROM --platform=${BUILDPLATFORM} mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# ENV DENO_INSTALL=/deno
# RUN mkdir -p /deno \
#     && curl -fsSL https://deno.land/x/install/install.sh | sh \
#     && chown -R vscode /deno

# ENV PATH=${DENO_INSTALL}/bin:${PATH} \
#     DENO_DIR=${DENO_INSTALL}/.cache/deno

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
   && apt-get -y install --no-install-recommends npm python3-pip
