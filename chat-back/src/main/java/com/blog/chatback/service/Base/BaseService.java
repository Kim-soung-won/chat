package com.blog.chatback.service.Base;

import com.blog.chatback.exception.BackendException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

@Slf4j
public abstract class BaseService<E, D, ID>{

    protected JpaRepository<E, ID> repository;

    public BaseService(JpaRepository<E, ID> repository) {
        this.repository = repository;
    }

    public BaseService() {}

    abstract public void setRepository(JpaRepository<E, ID> repository);
    protected ObjectMapper mapper = new ObjectMapper();
    abstract public <D> Class<D> getDtoClazz();

    public D save(D dto) throws BackendException {
        repository.save(this.toEntity(dto));
        return null;
    }

    public E toEntity(Object o) throws BackendException {
        try {
            Class clazz = null;
            if (o instanceof Map) {
                clazz = this.getDtoClazz();
                o = mapper.convertValue(o, clazz);
            }
            /*if (o instanceof BaseDto) {
                Method setCreatedAt = o.getClass().getMethod("createdAt", String.class);
                setCreatedAt.invoke(o);
            }*/
            Method toEntityMethod = o.getClass().getMethod("toEntity");
            return (E) toEntityMethod.invoke(o);
        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
            log.error(e.getMessage(), e);
            throw new BackendException("Entity 변환 중 오류발생, " + e.getMessage());
        }
    }
}
