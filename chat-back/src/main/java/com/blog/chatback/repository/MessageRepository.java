package com.blog.chatback.repository;

import com.blog.chatback.entity.Message;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@Qualifier("messageRepository")
public interface MessageRepository extends JpaRepository<Message, UUID> {
}
