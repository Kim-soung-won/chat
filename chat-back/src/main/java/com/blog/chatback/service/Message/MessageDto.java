package com.blog.chatback.service.Message;

import com.blog.chatback.entity.Message;
import com.blog.chatback.service.Base.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class MessageDto extends BaseDto {
    private String content;
    private UUID roomId;
    private UUID userId;

    public MessageDto(Message message) {
        super(message);
        this.content = message.getContent();
        this.roomId = message.getRoomId();
        this.userId = message.getUserId();
    }

    @Override
    public Message toEntity() {
        return Message.builder()
                .content(this.content)
                .roomId(this.roomId)
                .userId(this.userId)
                .build();
    }
}
