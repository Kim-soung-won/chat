package com.blog.chatback.controller.rest;

import com.blog.chatback.controller.ApiResponseDto;
import com.blog.chatback.controller.BaseRestController;
import com.blog.chatback.entity.User;
import com.blog.chatback.exception.BackendException;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.Room.RoomDto;
import com.blog.chatback.service.User.UserDto;
import com.blog.chatback.service.User.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserRestController extends BaseRestController<User, UserDto, UUID> {

    private final UserService roomService;
    private UserService userService;

    @Override
    @Autowired
    @Qualifier("userService")
    protected void setService(BaseService<User, UserDto, UUID> service) {
        this.name = "사용자";
        this.service = service;
    };

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    /**
     * 채팅방에 속한 User 목록 조회
     */
    @RequestMapping("/{roomId}/rooms")
    public ApiResponseDto<List<RoomDto>> getRoomsInUser(
            @PathVariable String roomId
    ) throws BackendException {
        return new ApiResponseDto<List<RoomDto>>(true, userService.getRoomList(roomId));
    }
}
