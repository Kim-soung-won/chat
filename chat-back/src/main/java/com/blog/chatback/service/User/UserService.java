package com.blog.chatback.service.User;

import com.blog.chatback.entity.User;
import com.blog.chatback.repository.UserRepository;
import com.blog.chatback.service.Base.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Qualifier("userService")
@RequiredArgsConstructor
public class UserService extends BaseService<User, UserDto, UUID> {

    @Autowired
    public UserService(UserRepository repository) {
        super(repository);
    }

    @Override
    @Qualifier("userRepository")
    public void setRepository(JpaRepository<User, UUID> repository) {
        this.repository = repository;
    }

    @Override
    public Class getDtoClazz() {
        return UserDto.class;
    }
}
