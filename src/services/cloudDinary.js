import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const streamUpload = (buffer, type) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto', 
        folder: type,
      },
      (error, result) => {
        if (result) {
          resolve(result); 
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default async (buffer, type) => {
  try {
    const result = await streamUpload(buffer, type);
    return result; 
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};
