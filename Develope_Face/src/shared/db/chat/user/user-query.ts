import prisma from '../../prisma'
import {
  CreateUserEntity,
  UserEntity,
  UserEntityPaginated,
  UserSearchParams,
} from './user.types'

export class UserQuery {
  static getAll = async (
    params: UserSearchParams,
  ): Promise<UserEntityPaginated> => {
    const {
      keyword,
      pageNo = 0,
      size = 10,
      orderBy = 'created_at',
      order = 'desc',
    } = params

    let prismaOrderBy = { [orderBy]: order }

    const [users, totalCount] = await prisma.$transaction([
      prisma.user.findMany({
        skip: pageNo,
        take: size,
        orderBy: prismaOrderBy,
        where: keyword ? { username: { contains: keyword } } : undefined,
      }),
      prisma.user.count({
        where: keyword ? { username: { contains: keyword } } : undefined,
      }),
    ])

    return {
      list: users,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / size),
        currentPage: pageNo,
        pageSize: size,
      },
    }
  }

  static getById = async (userId: string): Promise<UserEntity | null> => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
  }

  static save = async (user: CreateUserEntity): Promise<UserEntity> => {
    return await prisma.user.create({
      data: {
        username: user.username,
      },
    })
  }

  static delete = async (userId: string): Promise<void> => {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }
}
