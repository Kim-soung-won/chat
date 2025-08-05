import { UserByRoomRequestParamSchema } from '@/shared/api/user/user.contracts'
import { BffRoomService } from '@/shared/bff-api/chat/room/room.service'
import { UserTransform } from '@/shared/bff-api/chat/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')
    console.log('-------------------------------------------------', roomId)

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

    const response = await BffRoomService.getUserList({
      roomId: validatedRoomId,
    })
    return NextResponse.json(
      {
        success: response.data.success,
        data: UserTransform.transformDtosToEntities(response.data.data || []),
        message: response.data.message,
      },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error }, { status: 500 })
    }
    return NextResponse.json(
      { error: '알 수 없는 에러가 발생했습니다.' },
      { status: 500 },
    )
  }
}
