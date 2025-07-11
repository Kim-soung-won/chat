package com.blog.chatback.entity.MultiKeys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RoomParticipantsKey implements Serializable {
    @Column(name = "room_id")
    private UUID roomId;
    @Column(name = "user_id")
    private UUID userId;
}
