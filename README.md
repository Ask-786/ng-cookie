# Ng Cookie Service

Ng Cookie Service is a simple cookie service for Angular applications.
This is heavily inspired by [ngx-cookie-service](https://github.com/stevermeister/ngx-cookie-service).
But only intended to be used with Angular 19 currently.

## Usage

```typescript
import { NgCookieService } from "ngx-cookie-service";
import { Component, inject } from "@angular/core";

@Component({
  selector: "my-component",
  template: `<h1>Hello World</h1>`,
  providers: [NgCookieService],
})
export class HelloComponent {
  cookieService = inject(NgCookieService);

  constructor() {
    this.cookieService.set("token", "Hello World");
    console.log(this.cookieService.get("token"));
  }
}
```

## Server Side Rendering

This library out of the box supports server side rendering (SSR).
However, to get access to the cookie, your appilcation need to be in hybrid render mode (from angular 19).

See [Accessing request and response via DI](https://angular.dev/guide/hybrid-rendering#accessing-request-and-response-via-di) for more information.

# API

## check(name: string): boolean;

```typescript
const cookieExists: boolean = cookieService.check("test");
```

Checks if a cookie with the given`name` can be accessed or found.

## get(name: string): string;

```typescript
const value: string = cookieService.get("test");
```

Gets the value of the cookie with the specified `name`.

## getAll(): {};

```typescript
const allCookies: {} = cookieService.getAll();
```

Returns a map of key-value pairs for cookies that can be accessed.

## set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'Strict' | 'None'): void;

## set(name: string, value: string, options?: { expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'None' | 'Strict'}): void;

```typescript
cookieService.set("test", "Hello World");
cookieService.set("test", "Hello World", { expires: 2, sameSite: "Lax" });
```

Sets a cookie with the specified `name` and `value`. It is good practice to specify a path. If you are unsure about the
path value, use `'/'`. If no path or domain is explicitly defined, the current location is assumed. `sameSite` defaults
to `Lax`.

**Important:** For security reasons, it is not possible to define cookies for other domains. Browsers do not allow this.
Read [this](https://stackoverflow.com/a/1063760) and [this](https://stackoverflow.com/a/17777005/1007003) StackOverflow
answer for a more in-depth explanation.

**Important:** Browsers do not accept cookies flagged sameSite = 'None' if secure flag isn't set as well. CookieService
will override the secure flag to true if sameSite='None'.

## delete(name: string, path?: string, domain?: string, secure?: boolean, sameSite: 'Lax' | 'None' | 'Strict' = 'Lax'): void;

```typescript
cookieService.delete("test");
```

Deletes a cookie with the specified `name`. It is best practice to always define a path. If you are unsure about the
path value, use `'/'`.

**Important:** For security reasons, it is not possible to delete cookies for other domains. Browsers do not allow this.
Read [this](https://stackoverflow.com/a/1063760) and [this](https://stackoverflow.com/a/17777005/1007003) StackOverflow
answer for a more in-depth explanation.

## deleteAll(path?: string, domain?: string, secure?: boolean, sameSite: 'Lax' | 'None' | 'Strict' = 'Lax'): void;

```typescript
cookieService.deleteAll();
```

Deletes all cookies that can currently be accessed. It is best practice to always define a path. If you are unsure about
the path value, use `'/'`.
