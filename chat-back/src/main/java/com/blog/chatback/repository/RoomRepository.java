package com.blog.chatback.repository;

import com.blog.chatback.entity.Room;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@Qualifier("roomRepository")
public interface RoomRepository extends BaseRepository<Room, UUID> {
}
