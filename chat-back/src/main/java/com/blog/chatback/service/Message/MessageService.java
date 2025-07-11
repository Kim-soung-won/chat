package com.blog.chatback.service.Message;

import com.blog.chatback.entity.Message;
import com.blog.chatback.repository.MessageRepository;
import com.blog.chatback.service.Base.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Qualifier("messageService")
@RequiredArgsConstructor
public class MessageService extends BaseService<Message, MessageDto, UUID> {

    @Autowired
    public MessageService(MessageRepository repository) {
        super(repository);
    }

    @Override
    @Qualifier("messageRepository")
    public void setRepository(JpaRepository<Message, UUID> repository) {
        this.repository = repository;
    }

    @Override
    public Class getDtoClazz() {
        return MessageDto.class;
    }
}
