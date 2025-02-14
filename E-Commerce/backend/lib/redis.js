import Redis from "ioredis"
import dotenv from "dotenv"
dotenv.config();
const redis = new Redis(process.env.UPSTASH_REDIS_URL);
export default redis; // Default export

/**
 * ! Redis supports a variety of data types including strings, hashes, lists, sets, and sorted sets. 
 */

/**
 * ?----------- Common Use Cases------------:
 * ! Caching: Storing frequently accessed data (e.g., session information) for faster retrieval.
 * ! Real-time Analytics: Handling high-speed data feeds, like counters or leaderboards.
 * ! Queues: Managing task queues or job scheduling.
 */