package com.blog.chatback.service.Base;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Data
class PageObject {
    private long length;      //조회된 레코드 크기
    private int size;        //요청한 한 페이지의 레코드 크기
    private int page;        //현재 페이지 번호
    private long totalCount;    //총 데이터 갯수
    private boolean isLast;
}

@Data
public class PageWrapper<D> {

    private List<D> list = new ArrayList<>();
    private PageObject pageObject;      //조회된 레코드 크기

    public PageWrapper() {}

    public PageWrapper(Page<D> page) {
        if (page != null && page.getSize() > 0) {
            this.list = page.getContent();
            this.pageObject.setTotalCount(page.getTotalElements());
            this.pageObject.setSize(page.getSize());
            this.pageObject.setPage(page.getNumber());
            this.pageObject.setLast(page.isLast());
            this.pageObject.setLength(page.getNumberOfElements());
        }
    }
}