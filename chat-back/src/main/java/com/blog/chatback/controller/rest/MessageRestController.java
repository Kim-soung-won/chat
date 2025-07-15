package com.blog.chatback.controller.rest;

import com.blog.chatback.controller.ApiResponseDto;
import com.blog.chatback.controller.BaseRestController;
import com.blog.chatback.entity.Message;
import com.blog.chatback.exception.BackendException;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.Message.MessageDto;
import com.blog.chatback.service.Message.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequestMapping("/message")
@RestController
@RequiredArgsConstructor
public class MessageRestController extends BaseRestController<Message, MessageDto, UUID> {

    private final MessageService messageService;

    @Override
    @Autowired
    @Qualifier("messageService")
    protected void setService(BaseService<Message, MessageDto, UUID> service) {
        this.name = "채팅 메시지";
        this.service = service;
    }

    /**
     * 채팅방 메세지 목록 조회
     * @param roomId 채팅방 ID
     * @param time 마지막 메시지 시간
     */
    @RequestMapping("/{roomId}")
    public ApiResponseDto getMessagesByRoomId(
            @PathVariable String roomId,
            @RequestParam(required = false) String time
    ) throws BackendException {
        return new ApiResponseDto(true, messageService.getMessagesByRoomId(roomId, time));
    }
}
