import prisma from '../../prisma'
import {
  CreateRoomEntity,
  RoomEntity,
  RoomEntityPaginated,
  RoomSearchParams,
} from './room.types'

export class RoomQuery {
  static getByAll = async (
    params: RoomSearchParams,
  ): Promise<RoomEntityPaginated> => {
    const {
      keyword,
      pageNo = 0,
      size = 10,
      orderBy = 'created_at',
      order = 'desc',
    } = params

    let prismaOrderBy = { [orderBy]: order }

    const [rooms, totalCount] = await prisma.$transaction([
      prisma.room.findMany({
        skip: pageNo,
        take: size,
        orderBy: prismaOrderBy,
        where: keyword ? { name: { contains: keyword } } : undefined,
      }),
      prisma.room.count({
        where: keyword ? { name: { contains: keyword } } : undefined,
      }),
    ])

    return {
      list: rooms,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / size),
        currentPage: pageNo,
        pageSize: size,
      },
    }
  }

  static getById = async (roomId: string): Promise<RoomEntity | null> => {
    return await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    })
  }

  static save = async (room: CreateRoomEntity): Promise<RoomEntity> => {
    return await prisma.room.create({
      data: {
        name: room.name,
      },
    })
  }

  static delete = async (roomId: string): Promise<void> => {
    await prisma.room.delete({
      where: {
        id: roomId,
      },
    })
  }
}
