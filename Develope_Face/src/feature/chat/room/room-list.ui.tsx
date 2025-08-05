'use client'
import { RoomQueires } from '@/entity/chat/room/room.queries'
import { useQuery } from '@tanstack/react-query'

export function RoomList() {
  const { data, isSuccess } = useQuery(
    RoomQueires.roomsQuery('29024642-73af-40f4-98ed-5cfa78cda280'),
  )

  return (
    <div>
      {isSuccess && (
        <ul>
          {data.map((room) => (
            <li style={{ marginTop: 10, background: 'skyBlue' }} key={room.id}>
              {room.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
