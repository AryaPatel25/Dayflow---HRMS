import { config as conf } from "dotenv";
conf();

const _config = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    databaseUrl: process.env.MONGO_CONNECTION_STRING,
    cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
    // frontendDomain:
};

export const config = Object.freeze(_config);

// Object.freeze() is used to make an object completely immutable.
// In simple words: After you freeze an object, no one can change, delete, or add properties.