package com.blog.chatback.Controller;

import com.blog.chatback.entity.User;
import com.blog.chatback.service.Base.BaseService;
import com.blog.chatback.service.User.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequestMapping("/user")
@RestController
public class UserRestController extends BaseRestController<User, UserDto, UUID>{

    @Override
    @Autowired
    @Qualifier("userService")
    protected void setService(BaseService<User, UserDto, UUID> service) {
        this.name = "사용자";
        this.service = service;
    }
}
