package com.blog.chatback.Controller;

import com.blog.chatback.exception.BackendException;
import com.blog.chatback.service.Base.BaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Slf4j
public abstract class BaseRestController<E, D, ID>{

    protected String name;
    abstract protected void setService(BaseService<E, D, ID> service);

    protected BaseService<E, D, ID> service;

    @RequestMapping(value = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponseDto<?> add(
            @RequestBody D o
    ) throws BackendException {
        try {
            return new ApiResponseDto<>(true, ((BaseService<E, D, ID>)this.service).save(o));
        } catch (BackendException e) {
            log.error(e.getMessage(), e);
            return new ApiResponseDto<>(false, this.name + " 등록 중 오류발생");
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponseDto<?> delete(
           @PathVariable(value = "id") String id
    ) throws BackendException {
        try {
            return new ApiResponseDto<>(true, ((BaseService<E, D, ID>)this.service).delete(id));
        } catch (BackendException e) {
            log.error(e.getMessage(), e);
            return new ApiResponseDto<>(false, this.name + " 삭제 중 오류발생");
        }
    }
}
