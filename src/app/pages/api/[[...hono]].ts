import app from '@/api'; // Import the Hono app
import { handle } from 'hono/vercel';

export default handle(app);