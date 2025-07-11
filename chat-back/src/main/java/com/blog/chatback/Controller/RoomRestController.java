package com.blog.chatback.Controller;

import com.blog.chatback.entity.Room;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.Room.RoomDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequestMapping("/room")
@RestController
public class RoomRestController extends BaseRestController<Room, RoomDto, UUID> {
    @Override
    @Autowired
    @Qualifier("roomService")
    protected void setService(BaseService<Room, RoomDto, UUID> service) {
        this.name = "채팅 방";
        this.service = service;
    }
}
