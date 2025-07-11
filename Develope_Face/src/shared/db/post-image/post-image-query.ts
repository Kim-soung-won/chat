import prisma from '../prisma'
import { CreatePostImagesEntity, PostImagesEntity } from './post-image.types'

export class PostImageQuery {
  static getByPostId = async (postId: number): Promise<PostImagesEntity[]> => {
    const postImages = await prisma.postImages.findMany({
      where: {
        post_id: postId,
      },
    })
    return postImages
  }

  static save = async (postImage: CreatePostImagesEntity) => {
    return await prisma.postImages.create({
      data: {
        post_id: postImage.post_id,
        image_url: postImage.image_url,
        file_name: postImage.file_name,
        storage_file_path: postImage.storage_file_path,
        alt_text: postImage.alt_text,
        mime_type: postImage.mime_type,
        size_kb: postImage.size_kb,
        created_at: new Date(),
      },
    })
  }

  static deleteByPostId = async (postId: number): Promise<void> => {
    await prisma.postImages.deleteMany({
      where: {
        post_id: postId,
      },
    })
  }
}
