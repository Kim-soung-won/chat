package com.blog.chatback.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Table(name = "user", schema = "chat")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@NamedEntityGraph(
        name = "User.withParticipants",
        attributeNodes = @NamedAttributeNode("participants")
)
public class User extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "username")
    private String userName;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<RoomParticipant> participants;
}
