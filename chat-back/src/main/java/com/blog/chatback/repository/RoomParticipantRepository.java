package com.blog.chatback.repository;

import com.blog.chatback.entity.MultiKeys.RoomParticipantsKey;
import com.blog.chatback.entity.RoomParticipant;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@Qualifier("roomParticipantRepository")
public interface RoomParticipantRepository extends BaseRepository<RoomParticipant, RoomParticipantsKey> {
    @EntityGraph("RoomParticipant.withRoom")
    List<RoomParticipant> findAllByUserId(UUID userId);

    @EntityGraph("RoomParticipant.withUser")
    List<RoomParticipant> findAllByRoomId(UUID roomId);
}
