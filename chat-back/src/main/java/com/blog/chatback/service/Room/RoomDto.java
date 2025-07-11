package com.blog.chatback.service.Room;

import com.blog.chatback.entity.Room;
import com.blog.chatback.service.Base.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class RoomDto extends BaseDto {

    private UUID id;
    private String name;

    @Override
    public Room toEntity() {
        return Room.builder()
                .id(this.id)
                .name(this.name)
                .build();
    }
}
