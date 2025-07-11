package com.blog.chatback.entity;

import com.blog.chatback.entity.MultiKeys.RoomParticipantsKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room_participant", schema = "chat")
@NamedEntityGraphs({
    @NamedEntityGraph(
            name = "RoomParticipant.withRoom",
            attributeNodes = @NamedAttributeNode("room")
    ),
    @NamedEntityGraph(
            name = "RoomParticipant.withUser",
            attributeNodes = @NamedAttributeNode("user")
    ),
    @NamedEntityGraph(
            name = "RoomParticipant.withAll",
            attributeNodes = {
                    @NamedAttributeNode("room"),
                    @NamedAttributeNode("user")
            }
    )
})
public class RoomParticipant{
    @EmbeddedId
    private RoomParticipantsKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", insertable = false, updatable = false)
    @MapsId("roomId")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @MapsId("userId")
    private User user;

    // 편의 메서드
    public UUID getRoomId() {
        return id != null ? id.getRoomId() : null;
    }

    public UUID getUserId() {
        return id != null ? id.getUserId() : null;
    }
}
