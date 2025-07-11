package com.blog.chatback.service.Base;

import com.blog.chatback.exception.BackendException;
import com.blog.chatback.util.DataTypeUtil;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Map;
import java.util.UUID;

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
    protected int pkType = 1;

    @EventListener(ApplicationReadyEvent.class)
    public void init() {

        // DTO를 받았을때, 없는 필드가 들어올 경우 해당 필드 값은 무시
        this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        // 필드 대소문자 구분 X
        this.mapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

        /*
          Reflection을 이용하는 이유
          Generic 정보는 Compile Time에 추출되기 때문에, Runtime에 추출할 수 없다.
          Reflection Type을 이용해 Generic 정보를 추출하고 보존한다.
         */
        // Repository가 상속받는 인터페이스 타입 Generic 포함하여 추출
        Type cls = DataTypeUtil.getGenericType(this.repository.getClass())[0];

        // JpaRepository에 들어있는 Generic 목록 추출
        Type[] jpaCls = DataTypeUtil.getGenericType(DataTypeUtil.getClass(cls));

        // 두번째로 들어가는 Jpa ID Generic 타입 추출
        Type idType = DataTypeUtil.getClass(((ParameterizedType) jpaCls[0]).getActualTypeArguments()[1]);

        // int 코드값으로 변환
        this.pkType = DataTypeUtil.checkType(idType);
    }

    public D save(D dto) throws BackendException {
        repository.save(this.toEntity(dto));
        return null;
    }


    public boolean delete(Object o) throws BackendException {
        E entity = this.toEntity(o);
        this.repository.delete(entity); // 단일 객체 삭제
        return true;
    }


    public boolean delete(String id) throws BackendException {
        if (this.pkType != 1) {
            switch (this.pkType) {
                case 2:
                    return this.deleteByIntegerId(id);
                case 3:
                    return this.deleteByLongId(id);
                case 4:
                    return this.deleteByStringId(id);
                case 6:
                    return this.deleteByUUIDId(id);
                default:
                    throw new BackendException("Unsupported primary key type: " + this.pkType);
            }
        }
        return this.deleteByStringId(id);
    }

    public boolean deleteByIntegerId(String id) {
        try {
            int _id = Integer.parseInt(id);
            this.repository.deleteById((ID) Integer.valueOf(_id));
            return true;
        } catch (NumberFormatException e) {
            return this.deleteByStringId(id);
        } catch (EmptyResultDataAccessException e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public boolean deleteByUUIDId(String id) {
        try {
            UUID _id = UUID.fromString(id);
            this.repository.deleteById((ID) _id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            log.error(e.getMessage());
            return false;
        }
    }

    /**
     * 삭제 (String ID)
     *
     * @param id 삭제할 데이터 PK
     * @return 성공/실패 여부
     */
    public boolean deleteByStringId(String id) {
        try {
            this.repository.deleteById((ID) id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            log.error(e.getMessage());
            return true;
        }
    }

    /**
     * 삭제 (Long ID)
     *
     * @param id 삭제할 데이터 PK
     * @return 성공/실패 여부
     * <p>
     * 2022.09.27 Long Type 때문에 수정
     */
    public boolean deleteByLongId(String id) {
        try {
            Long _id = Long.parseLong(id);
            this.repository.deleteById((ID) Long.valueOf(_id));
            return true;
        } catch (NumberFormatException e) {
            // 파라미터 값(ID)이 Long 가 아닌경우 String 으로 처리
            this.deleteByStringId(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            log.error(e.getMessage());
            return true;
        }
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
