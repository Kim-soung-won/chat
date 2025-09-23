'use client'
import { useEffect, useRef } from 'react'
import { Client, IMessage } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

export interface ChatMessage {
  sender: string
  content: string
  timestamp?: string
}

export const useStompClient = (onMessage: (msg: ChatMessage) => void) => {
  const stompClientRef = useRef<Client | null>(null)

  useEffect(() => {
    const client = new Client({
      brokerURL: undefined, // SockJS를 쓸 경우 여기 비움
      webSocketFactory: () => new SockJS('/dev/ws'),
      reconnectDelay: 5000, // 연결 끊기면 5초마다 재시도
      onConnect: () => {
        console.log('Connected')
        client.subscribe('/topic/room1', (message: IMessage) => {
          onMessage(JSON.parse(message.body))
        })
      },
    })

    stompClientRef.current = client
    client.activate()

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate()
        console.log('Disconnected')
      }
    }
  }, [onMessage])

  return stompClientRef
}
