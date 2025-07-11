package com.blog.chatback.repository;

import com.blog.chatback.entity.MultiKeys.RoomParticipantsKey;
import com.blog.chatback.entity.RoomParticipant;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Qualifier("roomParticipantRepository")
public interface RoomParticipantRepository extends JpaRepository<RoomParticipant, RoomParticipantsKey> {
}
