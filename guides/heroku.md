#Heroku Guide

*Disclaimer: this guide assumes you are using typescript*

### tsconfig.json configuration
```
{
     "outDir": "./dist", // folder where javascript gets generated
     "rootDir": "./src", // folder where all .ts files are 
     "target": "es6",      
}
```
---
### Files on root folder

Create a file named `Procfile` with the following contents (Heroku requirement)
```
web: node dist/index.js
```
---
### Scripts
Script that gets exectuted to run application
```
"start": "node dist/index.js",
```

This script gets executed after installment of dependencies
```
"postinstall": "tsc && rm -v -rf src",
```
This scripts come in handy for a speedy development
```
"commit": "git add .. && git commit -m \\\"Heroku\\\"",
"push": "git push",
"push:heroku": "git push heroku HEAD:master"
```
Id using env-cmd use this script
```
"dev": "env-cmd -f config/.env ts-node-dev src/index.ts",
```
### Useful packages
1. env-cmd -
Custom .env variables get inserted into application
2. ts-node-dev -
Better version of nodemon used for typescript
