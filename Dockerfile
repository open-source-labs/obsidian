FROM hayd/alpine-deno:1.3.0

EXPOSE 3000

WORKDIR /usr/app

COPY . .

CMD [ "run", "--unstable", "--allow-net", "--allow-env", "--allow-read", "testServer.ts", "-c", "tsconfig.json" ]

# deno run --unstable --allow-net --allow-env --allow-read testServer.ts -c tsconfig.json
