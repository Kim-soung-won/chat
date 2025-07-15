package com.blog.chatback.repository;

import com.blog.chatback.entity.Message;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
@Qualifier("messageRepository")
public interface MessageRepository extends BaseRepository<Message, UUID> {
    Page<Message> findAllByRoomIdOrderByCreatedAtDesc(UUID roomId, Pageable pageable);

    @Query("SELECT m FROM Message m WHERE m.roomId = :roomId AND m.createdAt < :cursor ORDER BY m.createdAt DESC")
    Page<Message> findByRoomIdWithCursor(
            @Param("roomId") UUID roomId,
            @Param("cursor") LocalDateTime cursor,
            Pageable pageable
    );
}
