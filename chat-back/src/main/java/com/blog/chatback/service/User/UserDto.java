package com.blog.chatback.service.User;

import com.blog.chatback.entity.User;
import com.blog.chatback.service.Base.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class UserDto extends BaseDto {
    private String userName;
    private UUID id;


    public UserDto(User user) {
        super(user);
        this.userName = user.getUserName();
        this.id = user.getId();
    }

    @Override
    public User toEntity() {
        return User.builder()
                .id(this.id)
                .userName(this.userName)
                .build();
    }
}
