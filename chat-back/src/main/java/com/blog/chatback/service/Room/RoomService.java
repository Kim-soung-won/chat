package com.blog.chatback.service.Room;

import com.blog.chatback.entity.Room;
import com.blog.chatback.exception.BackendException;
import com.blog.chatback.repository.BaseRepository;
import com.blog.chatback.repository.RoomRepository;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.RoomParticipant.RoomParticipantService;
import com.blog.chatback.service.User.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier("roomService")
@RequiredArgsConstructor
public class RoomService extends BaseService<Room, RoomDto, UUID> {

    private RoomParticipantService roomParticipantService;

    @Autowired
    public RoomService(RoomRepository repository, RoomParticipantService roomParticipantService) {
        super(repository);
        this.roomParticipantService = roomParticipantService;
    }

    @Override
    @Qualifier("roomRepository")
    public void setRepository(BaseRepository<Room, UUID> repository) {
        this.repository = repository;
    }

    @Override
    public Class getDtoClazz() {
        return RoomDto.class;
    }

    /**
     * 방을 구성하는 User 목록조회
     */
    public List<UserDto> getUserList(String roomId) throws BackendException {
        return roomParticipantService.getUsersByRoomId(roomId);
    }
}
