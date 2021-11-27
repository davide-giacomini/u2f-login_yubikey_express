# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

- For Caddy you have to go to github, clone the repository of caddy, checkout the version 1.0.3, do cd caddy/caddy, run ```go build``` and copy the caddy binary in the system (I did ```sudo cp caddy /usr/bin```). The problem seemed the tls version, but I have a tls version of 3 so maybe it's other. I am using deprecated libraries, that's why