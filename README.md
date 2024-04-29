The provided code defines a server application using the Hono framework on Cloudflare Workers, integrated with the Expo SDK for handling push notifications.

## Application Setup

- Dependencies: The code uses `hono` for the server framework and `expo-server-sdk` for handling Expo push notifications.
- Middleware: Three middlewares are used:
  - `poweredBy`: Removes or customizes the `X-Powered-By` header.
  - `cors`: Enables CORS (Cross-Origin Resource Sharing).
  - Custom Authorization Middleware: Checks the `Authorization` header against an environment variable `AUTHORIZATION`. If it doesn't match, it returns a `401 Unauthorized` response.

## Routes

- **GET /** Returns a simple greeting message, "Hello IXO!", to test server running.
- **GET /test/:token** A route handled by Notifications.sendTestNotification. It sends a test push notification to an Expo push token.
- **GET /receipt/:ticket** Handled by Notifications.fetchTicketReceipt. It retrieves the receipt for a previously sent push notification based on its ticket.

## Develop

- Ensure you have Cloudflare Workers account and CLI configured.
- Copy `example wrangler.toml` as `wrangler.toml`
- Set the `AUTHORIZATION` variable in the new `wrangler.toml` file with your secret key.

### Install

```
yarn install
```

### Develop

```
yarn dev
```

### Test

```
yarn test
```

### Deploy

```
yarn deploy
```

## Issues

- `/src/handlers/notifications.ts:20`
  - TypeError: Illegal invocation  
     at Expo2.<anonymous> (index.js:11319:54)  
     at Generator.next (<anonymous>)  
     at index.js:11159:71  
     at new Promise (<anonymous>)  
     at \_\_awaiter (index.js:11141:14)  
     at Expo2.requestAsync (index.js:11297:16)  
     at Expo2.<anonymous> (index.js:11198:35)  
     at Generator.next (<anonymous>)  
     at index.js:11159:71  
     at new Promise (<anonymous>) {  
     stack: TypeError: Illegal invocation  
     at Expo2.<anonym…ndex.js:11159:71  
     at new Promise (<anonymous>),  
     message: Illegal invocation  
     }
