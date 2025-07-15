package com.blog.chatback.service.Base;

import com.blog.chatback.exception.BackendException;
import com.blog.chatback.repository.BaseRepository;
import com.blog.chatback.util.DataTypeUtil;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
public abstract class BaseService<E, D, ID>{

    protected BaseRepository<E, ID> repository;

    public BaseService(BaseRepository<E, ID> repository) {
        this.repository = repository;
    }

    public BaseService() {}

    abstract public void setRepository(BaseRepository<E, ID> repository);
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

    protected D toDto(Object o) throws BackendException {

        Class<D> clazz = null;
        if (o instanceof Map) {
            clazz = this.getDtoClazz();
            o = mapper.convertValue(o, clazz);
        }
        return (D) o;

    }

    public D save(D dto) throws BackendException {
        repository.save(this.toEntity(dto));
        return null;
    }

    @Transactional(readOnly = true)
    public List<D> getAll() throws BackendException {
        return (List<D>) this.repository.findAll();
    }

    /**
     * pid 필드에 해당하는 값이 같은 데이터만 조회
     * @param pidField 필드 이름
     * @param pid 필드 값
     * @return 조회 결과 DTO List
     * @throws BackendException
     */
    @Transactional(readOnly = true)
    public List<D> getAllByPid(String pidField, String pid) throws BackendException {
        Specification<E> spec = new Specification<E>() {
            @Override
            public Predicate toPredicate(Root<E> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(pidField), pid);
            }
        };
        List<E> entities = repository.findAll(spec);
        return entities.stream().map(e -> {
            try {
                return this.toDto(e);
            } catch (BackendException ex) {
                throw new RuntimeException(ex);
            }
        }).toList();
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
