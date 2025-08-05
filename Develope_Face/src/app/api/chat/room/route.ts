import { RoomByUserRequestParamSchema } from '@/shared/api/room/room.contracts'
import { RoomBffTransform } from '@/shared/bff-api/chat/room'
import { BffUserService } from '@/shared/bff-api/chat/user/user.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    const validationResult = RoomByUserRequestParamSchema.safeParse({ userId })
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: '요청 파라미터가 부적절합니다.',
          details: validationResult.error.flatten(),
        },
        { status: 409 },
      )
    }

    const { userId: validatedUserId } = validationResult.data
    console.log('validatedUserId :', validatedUserId)
    const response = await BffUserService.getRoomList({
      userId: validatedUserId,
      // pageNo: 0,
      // size: 10,
      // order: 'desc',
    })

    return NextResponse.json(
      {
        success: response.data.success,
        data: RoomBffTransform.transformDtosToEntities(
          response.data.data || [],
        ),
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
