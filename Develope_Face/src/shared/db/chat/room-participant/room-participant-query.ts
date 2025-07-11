import prisma from '../../prisma'
import {
  CreateRoomParticipantEntity,
  RoomParticipantEntity,
  SelectRoomListByUserId,
  SelectUserListInRoom,
  SelectUserListInRoomResponse,
} from './room-participant.types'

export class RoomParticipantQuery {
  static getParticipantsInRoom = async (
    roomId: string,
  ): Promise<RoomParticipantEntity[]> => {
    return await prisma.roomParticipant.findMany({
      where: {
        room_id: roomId,
      },
    })
  }

  static addParticipantToRoom = async (
    participant: CreateRoomParticipantEntity,
  ): Promise<RoomParticipantEntity> => {
    return await prisma.roomParticipant.create({
      data: {
        room_id: participant.room_id,
        user_id: participant.user_id,
      },
    })
  }

  static removeParticipantFromRoom = async (
    roomId: string,
    userId: string,
  ): Promise<void> => {
    await prisma.roomParticipant.delete({
      where: {
        room_id_user_id: {
          room_id: roomId,
          user_id: userId,
        },
      },
    })
  }

  static getRoomListByUserId = async (
    params: SelectRoomListByUserId,
  ): Promise<{ rooms: RoomParticipantEntity[]; count: number }> => {
    const {
      size = 10,
      pageNo = 0,
      orderBy = 'created_at',
      order = 'desc',
      userId,
    } = params

    const prismaOrderBy = { room: { [orderBy]: order } } // room 테이블의 created_at으로 정렬

    const [rooms, totalCount] = await prisma.$transaction([
      prisma.roomParticipant.findMany({
        skip: pageNo,
        orderBy: prismaOrderBy,
        where: {
          user_id: userId,
        },
        include: {
          room: true,
        },
      }),
      prisma.roomParticipant.count({
        where: {
          user_id: userId,
        },
      }),
    ])
    console.log(rooms)
    return {
      rooms,
      count: totalCount,
    }
  }

  static getUserListByRoomId = async (
    params: SelectUserListInRoom,
  ): Promise<SelectUserListInRoomResponse> => {
    const { roomId } = params

    const [users, totalCount] = await prisma.$transaction([
      prisma.roomParticipant.findMany({
        select: {
          user: true,
        },
        where: {
          room_id: roomId,
        },
      }),
      prisma.roomParticipant.count({
        where: {
          room_id: roomId,
        },
      }),
    ])
    const userResult = users.map((user) => user.user)
    return {
      users: userResult,
      count: totalCount,
    }
  }
}
