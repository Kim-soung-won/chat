package com.blog.chatback.controller.rest;

import com.blog.chatback.controller.ApiResponseDto;
import com.blog.chatback.controller.BaseRestController;
import com.blog.chatback.entity.Room;
import com.blog.chatback.exception.BackendException;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.Room.RoomDto;
import com.blog.chatback.service.Room.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequestMapping("/room")
@RestController
@RequiredArgsConstructor
public class RoomRestController extends BaseRestController<Room, RoomDto, UUID> {

    private final RoomService roomService;

    @Override
    @Autowired
    @Qualifier("roomService")
    protected void setService(BaseService<Room, RoomDto, UUID> service) {
        this.name = "채팅 방";
        this.service = service;
    }

    /**
     * 채팅방에 속한 User 목록 조회
     */
    @RequestMapping("/{roomId}/users")
    public ApiResponseDto getUsersInRoom(
            @PathVariable String roomId
    ) throws BackendException {
        return new ApiResponseDto(true, roomService.getUserList(roomId));
    }

}
