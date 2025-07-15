package com.blog.chatback.service.Message;

import com.blog.chatback.entity.Message;
import com.blog.chatback.repository.BaseRepository;
import com.blog.chatback.repository.MessageRepository;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.Base.PageWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Qualifier("messageService")
@RequiredArgsConstructor
public class MessageService extends BaseService<Message, MessageDto, UUID> {
    private MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository repository) {
        super(repository);
        this.messageRepository = repository;
    }

    @Override
    @Qualifier("messageRepository")
    public void setRepository(BaseRepository<Message, UUID> repository) {
        this.repository = repository;
    }

    @Override
    public Class getDtoClazz() {
        return MessageDto.class;
    }

    /**
     * 채팅방 내부의 Message 목록 조회
     * @param id 채팅방 ID
     * @param time 마지막 Message 시간
     * @return Message DTO List
     */
    public PageWrapper<MessageDto> getMessagesByRoomId(String id, String time) {
        UUID roomId = UUID.fromString(id);
        // Message 조회 사이즈
        Pageable page = PageRequest.of(0, 20, Sort.by("createdAt").descending());

        Page<Message> messagePage;

        // 최초 조회시
        if (time == null) {
            messagePage = messageRepository.findAllByRoomIdOrderByCreatedAtDesc(roomId, page);
        } else {
            // 스크롤을 통한 메세지 추가 조회시
            LocalDateTime cursorTime = LocalDateTime.parse(time); // 시간 파싱
            messagePage = messageRepository.findByRoomIdWithCursor(roomId, cursorTime, page);
        }

        // Page<Message>를 Page<MessageDto>로 변환
        return new PageWrapper<MessageDto>(messagePage.map(MessageDto::new));
    }
}
