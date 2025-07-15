package com.blog.chatback.repository;

import com.blog.chatback.entity.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@Qualifier("userRepository")
public interface UserRepository extends BaseRepository<User, UUID> {
}
