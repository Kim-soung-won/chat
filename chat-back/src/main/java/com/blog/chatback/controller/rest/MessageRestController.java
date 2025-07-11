package com.blog.chatback.controller.rest;

import com.blog.chatback.controller.BaseRestController;
import com.blog.chatback.entity.Message;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.Message.MessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequestMapping("/message")
@RestController
public class MessageRestController extends BaseRestController<Message, MessageDto, UUID> {

    @Override
    @Autowired
    @Qualifier("messageService")
    protected void setService(BaseService<Message, MessageDto, UUID> service) {
        this.name = "채팅 메시지";
        this.service = service;
    }
}
