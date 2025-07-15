package com.blog.chatback.service.User;

import com.blog.chatback.entity.User;
import com.blog.chatback.exception.BackendException;
import com.blog.chatback.repository.BaseRepository;
import com.blog.chatback.repository.UserRepository;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.Room.RoomDto;
import com.blog.chatback.service.RoomParticipant.RoomParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier("userService")
@RequiredArgsConstructor
public class UserService extends BaseService<User, UserDto, UUID> {

    private RoomParticipantService roomParticipantService;

    @Autowired
    public UserService(UserRepository repository, RoomParticipantService roomParticipantService) {
        super(repository);
        this.roomParticipantService = roomParticipantService;
    }

    @Override
    @Qualifier("userRepository")
    public void setRepository(BaseRepository<User, UUID> repository) {
        this.repository = repository;
    }

    @Override
    public Class getDtoClazz() {
        return UserDto.class;
    }

    public List<RoomDto> getRoomList(String userId) throws BackendException {
        return roomParticipantService.getRoomsByUserId(userId);
    }
}
