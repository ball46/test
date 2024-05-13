import { Injectable } from '@nestjs/common';

@Injectable()
/* The AppService class in TypeScript returns the string 'Hello World!' when the getHello method is
called. */
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
