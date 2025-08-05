package com.blog.chatback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * EnableWebSocketMessageBroker
 *      - WebSocketMessageBroker를 활성화한다.
 *      - STOMP(Simple Text Oriented Messaging Protocol)를 사용할 수 잇게해준다.
 *      - WebSocket 메시징 관련 여러 컴포넌트 설정 및 등록
 *
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 클라이언트가 메시지를 구독(Subscribe)할 수 있는 prefix 설정
        // 클라이언트는 /topic/{roomId}와 같은 경로로 구독하게 됩니다.
        config.enableSimpleBroker("/topic");

        // 클라이언트가 서버로 메시지를 발행(Publish)할 때 사용할 prefix 설정
        // 클라이언트는 /app/chat.sendMessage와 같은 경로로 메시지를 보냅니다.
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // WebSocket 연결을 위한 엔드포인트 설정
        // 클라이언트는 ws://localhost:8080/ws로 접속하게 됩니다.
        registry.addEndpoint("/ws").withSockJS();
    }
}
