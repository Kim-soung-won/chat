package com.blog.chatback.service.RoomParticipant;

import com.blog.chatback.entity.MultiKeys.RoomParticipantsKey;
import com.blog.chatback.entity.RoomParticipant;
import com.blog.chatback.repository.BaseRepository;
import com.blog.chatback.repository.RoomParticipantRepository;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.Room.RoomDto;
import com.blog.chatback.service.User.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier("roomParticipantService")
public class RoomParticipantService extends BaseService<RoomParticipant, RoomParticipantDto, RoomParticipantsKey> {

    private RoomParticipantRepository roomParticipantRepository;

    @Autowired
    public RoomParticipantService(RoomParticipantRepository repository) {
        super(repository);
        roomParticipantRepository = (RoomParticipantRepository) repository;
    }



    @Override
    @Qualifier("roomParticipantRepository")
    public void setRepository(BaseRepository<RoomParticipant, RoomParticipantsKey> repository) {
        this.repository = repository;
    }

    @Override
    public Class getDtoClazz() {
        return RoomParticipantDto.class;
    }

    public List<UserDto> getUsersByRoomId(String roomId){
        return roomParticipantRepository.findAllByRoomId(UUID.fromString(roomId)).stream().map(e -> new UserDto(e.getUser())).toList();
    }

    public List<RoomDto> getRoomsByUserId(String userId){
        return roomParticipantRepository.findAllByUserId(UUID.fromString(userId)).stream().map(e -> new RoomDto(e.getRoom())).toList();
    }
}
