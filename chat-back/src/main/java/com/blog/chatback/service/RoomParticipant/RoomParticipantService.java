package com.blog.chatback.service.RoomParticipant;

import com.blog.chatback.entity.MultiKeys.RoomParticipantsKey;
import com.blog.chatback.entity.RoomParticipant;
import com.blog.chatback.repository.RoomParticipantRepository;
import com.blog.chatback.service.Base.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
@Qualifier("roomParticipantService")
@RequiredArgsConstructor
public class RoomParticipantService extends BaseService<RoomParticipant, RoomParticipantDto, RoomParticipantsKey> {

    @Autowired
    public RoomParticipantService(RoomParticipantRepository repository) {
        super(repository);
    }

    @Override
    @Qualifier("roomParticipantRepository")
    public void setRepository(JpaRepository<RoomParticipant, RoomParticipantsKey> repository) {
        this.repository = repository;
    }

    @Override
    public Class getDtoClazz() {
        return RoomParticipantDto.class;
    }
}
