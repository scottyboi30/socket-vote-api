import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  
  private readonly envConfig: { [key: string]: string };

  constructor() {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
    ) {
      this.envConfig = {
        MONGODB_URI: process.env.MONGODB_URI
      };
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}