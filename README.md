# Mantis Explorer

## Development

- Lightweight implementation of an Explorer that runs without db, just using grabs data from web3 implementation.

- The project scaffolding was done with React `create-app` command (an older version, pre react-hooks).

### Installation
```
$ yarn install
```

### Build with Nix 

Build using `nix-build`. The reslting derivation is not meant to be installed
but rather be served by nginx (as is the use case in production). 

### Run
```
$ yarn start

> Compiled successfully!

You can now view Mantis Explorer in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://$YOUR_LOCAL_IP:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

**[DISCLAIMER] AS DEFAULT THE EXPLORER IS ASSUMING THAT A NODE IS RUNNING LOCALLY, WITH RPC API EXPOSED IN: `http://127.0.0.1:8546`**
**IF YOU WANT TO CHANGE THE PROVIDER, PLEASE SETUP THE ENV VARIABLE: WEB3_PROVIDER=$NODE_RPC_URL**

example:
```
# Connect to a Pupa testnet node (VPN access needed)
WEB3_PROVIDER=http://192.168.85.4:8546 yarn start
```

### Tests
```
$ yarn test
```

### Deployment
```
$ yarn deploy
```

