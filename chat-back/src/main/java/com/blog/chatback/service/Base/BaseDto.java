package com.blog.chatback.service.Base;

import com.blog.chatback.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false) // equals와 hashcode 메소드가 부모 클래스 필드까지 고려 여부
public abstract class BaseDto {
    protected String createdAt;

    public BaseDto() {
    }

    public BaseDto(BaseEntity entity) {
        this.createdAt = entity.getCreatedAt() != null ? entity.getCreatedAt().toString() : null;
    }

    abstract public Object toEntity();
}
