import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const tokenKey = uuidv4();
console.log(`VITE_PUBLIC_TOKEN=${tokenKey}`);

const jwtSecretKey = crypto.randomBytes(64).toString('hex');
console.log(`VITE_PUBLIC_JWT_SECRET=${jwtSecretKey}`);
