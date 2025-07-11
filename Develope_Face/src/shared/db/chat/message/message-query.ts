import prisma from '../../prisma'
import {
  CreateMessageEntity,
  MessageEntity,
  MessageEntityPaginated,
  MessageSearchParams,
} from './message.types'

export class MessageQuery {
  static getAll = async (
    params: MessageSearchParams,
  ): Promise<MessageEntityPaginated> => {
    const {
      keyword,
      pageNo = 0,
      size = 10,
      orderBy = 'created_at',
      order = 'desc',
    } = params

    let prismaOrderBy = { [orderBy]: order }

    const [messages, totalCount] = await prisma.$transaction([
      prisma.message.findMany({
        skip: pageNo,
        take: size,
        orderBy: prismaOrderBy,
        where: keyword ? { content: { contains: keyword } } : undefined,
      }),
      prisma.message.count({
        where: keyword ? { content: { contains: keyword } } : undefined,
      }),
    ])

    return {
      list: messages,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / size),
        currentPage: pageNo,
        pageSize: size,
      },
    }
  }

  static getById = async (
    messageId: string,
  ): Promise<MessageEntity | null> => {
    return await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    })
  }

  static save = async (
    message: CreateMessageEntity,
  ): Promise<MessageEntity> => {
    return await prisma.message.create({
      data: {
        room_id: message.room_id,
        user_id: message.user_id,
        content: message.content,
      },
    })
  }

  static delete = async (messageId: string): Promise<void> => {
    await prisma.message.delete({
      where: {
        id: messageId,
      },
    })
  }
}
