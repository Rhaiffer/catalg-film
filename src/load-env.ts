import * as dotenv from 'dotenv';
import * as fs from 'fs';

export function loadEnv() {
  if (fs.existsSync('.env.local')) {
    dotenv.config({ path: '.env.local' });
  } else if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
  } else {
    console.error('No .env file found');
    process.exit(1);
  }
}
