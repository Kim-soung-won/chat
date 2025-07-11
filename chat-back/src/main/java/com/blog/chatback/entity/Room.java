package com.blog.chatback.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Table(name = "room", schema = "chat")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@NamedEntityGraph(
        name = "Room.withParticipants",
        attributeNodes = @NamedAttributeNode("participants")
)
public class Room extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<RoomParticipant> participants;
}
