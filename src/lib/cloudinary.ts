import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary

export const uploadVideo = async (file: string, folder = 'nada-negm/videos') => {
  return cloudinary.uploader.upload(file, {
    resource_type: 'video',
    folder,
    eager: [{ streaming_profile: 'full_hd', format: 'm3u8' }],
    eager_async: true,
  })
}

export const uploadImage = async (file: string, folder = 'nada-negm/images') => {
  return cloudinary.uploader.upload(file, {
    resource_type: 'image',
    folder,
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })
}

export const deleteMedia = async (publicId: string, resourceType: 'video' | 'image' = 'image') => {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}

export const getVideoThumbnail = (publicId: string, time = '0') => {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    transformation: [
      { start_offset: time, format: 'jpg' },
      { quality: 'auto', fetch_format: 'auto' },
      { width: 800, height: 450, crop: 'fill' },
    ],
  })
}
