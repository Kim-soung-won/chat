import { UserByRoomRequestParamSchema } from '@/shared/api/chat/user/user.contracts'
import { UserResponseParam } from '@/shared/api/chat/user/user.type'
import { RoomParticipantQuery } from '@/shared/db/chat'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')

    const validationResult = UserByRoomRequestParamSchema.safeParse({ roomId })
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: '요청 파라미터가 부적절합니다.',
          details: validationResult.error.flatten(),
        },
        { status: 409 },
      )
    }

    const { roomId: validatedRoomId } = validationResult.data

    const userList: { users: UserResponseParam[]; count: number } =
      await RoomParticipantQuery.getUserListByRoomId({
        roomId: validatedRoomId,
      })
    return NextResponse.json(userList, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(
      { error: '알 수 없는 에러가 발생했습니다.' },
      { status: 500 },
    )
  }
}
