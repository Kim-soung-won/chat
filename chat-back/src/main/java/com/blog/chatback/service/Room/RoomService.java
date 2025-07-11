package com.blog.chatback.service.Room;

import com.blog.chatback.entity.Room;
import com.blog.chatback.repository.RoomRepository;
import com.blog.chatback.service.Base.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Qualifier("roomService")
@RequiredArgsConstructor
public class RoomService extends BaseService<Room, RoomDto, UUID> {

    @Autowired
    public RoomService(RoomRepository repository) {
        super(repository);
    }

    @Override
    @Qualifier("roomRepository")
    public void setRepository(JpaRepository<Room, UUID> repository) {
        this.repository = repository;
    }

    @Override
    public Class getDtoClazz() {
        return RoomDto.class;
    }
}
