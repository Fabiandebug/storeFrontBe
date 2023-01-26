# Storefront Backend Project
### To run the project

### Install the dependincies
```
npm install
```
### Start Docker

docker compose up

### Connect to container
docker exec -it storefront-backend-postgres-1 bash
### Connect to psql
psql -U posgres
### Create databases and user
```
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
CREATE USER storeuser WITH SUPERUSER PASSWORD 'password123';

\c storefront
GRANT ALL PRIVILEGES ON DATABASE storefront TO storeuser;
\c storefront_test
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storeuser;
```

### Add .env file and add the following
```
POSTGRES_HOST="127.0.0.1"
POSTGRES_DB="storefront"
POSTGRES_TEST_DB="storefront_test"
POSTGRES_USER="storeuser"
POSTGRES_PASSWORD="password123"
ENV="dev"
BCRYPT_PASSWORD="my_super_secret_password"
SALT_ROUNDS="10"
TOKEN_SECRET="my_super_secret_tkn"
```

### Before test make a db migration with
```
db-migrate up

```
### To pull down migrations
dg-migrate down
```
```
### npm-run Scripts

- npm run lint-eslit
-  npm run prettier-prettier
-  npm run test -run test 
- npm run start - start server
- npm run build - build solution


### Project Dependencies
"author": "Udacity",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "typescript": "^4.1.3"
  
  "devDependencies": 
    "@types/bcrypt": "^5.0.0",
    "@types/body-parser": "^1.19.2",
    "@types/eslint": "^8.4.6",
    "@types/express": "^4.17.15",
    "@types/jasmine": "^3.6.3",
    "@types/jsonwebtoken": "^8.5.9",
    "@types/pg": "^7.14.7",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.49.0",
    "@typescript-eslint/parser": "^5.37.0",
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.1",
    "cross-env": "^7.0.3",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotenv": "^16.0.2",
    "eslint": "^8.23.1",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "jasmine": "^3.6.4",
    "jasmine-spec-reporter": "^7.0.0",
    "jasmine-ts": "^0.3.0",
    "jsonwebtoken": "^9.0.0",
    "nodemon": "^2.0.20",
    "pg": "^8.8.0",
    "prettier": "^2.7.1",
    "save-dev": "^0.0.1-security",
    "supertest": "^6.3.3",
    "ts-node": "^10.9.1",
    "ts-node-dev": "^2.0.0",
    "tsc-watch": "^4.2.9"
  
### Project Enpoints

[GET(/)] Home route
[GET(/shop)]Shop route

User
[post('/shop/users')]
[get('/shop/users)]
[get('/shop/users/:id')]
[post('/shop/users/authenticate')]
[put('/shop/users/:id')]
[delete('/shop/users/:id')]

Products
[post('/shop/products')]
[get('/shop/products')]
[get('/shop/products/:id)]
[put('/shop/products/:id')]
[delete('/shop/products/:id')]

Orders
[post('/shop/orders')]
[get('/shop/orders/active/:userId')]
[put('/shop/orders/:id')]
[delete('/shop/orders/:id')]


```






