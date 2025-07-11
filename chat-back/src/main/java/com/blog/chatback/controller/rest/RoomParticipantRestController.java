package com.blog.chatback.controller.rest;

import com.blog.chatback.controller.BaseRestController;
import com.blog.chatback.entity.MultiKeys.RoomParticipantsKey;
import com.blog.chatback.entity.RoomParticipant;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.RoomParticipant.RoomParticipantDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/room-participant")
public class RoomParticipantRestController extends BaseRestController<RoomParticipant, RoomParticipantDto, RoomParticipantsKey> {

    @Autowired
    @Qualifier("roomParticipantService")
    @Override
    protected void setService(BaseService<RoomParticipant, RoomParticipantDto, RoomParticipantsKey> service) {
        this.name = "방 참여자";
        this.service = service;
    }
}
