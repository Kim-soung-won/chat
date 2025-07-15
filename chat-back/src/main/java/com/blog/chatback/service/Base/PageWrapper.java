package com.blog.chatback.service.Base;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Data
public class PageWrapper<D> {

    private List<D> list = new ArrayList<>();
    private long length;      //조회된 레코드 크기
    private int size;        //요청한 한 페이지의 레코드 크기
    private int page;        //현재 페이지 번호
    private long totalCount;    //총 데이터 갯수
    private boolean isLast;

    public PageWrapper() {}

    public PageWrapper(Page page) {
        if (page != null && page.getSize() > 0) {
            this.list = page.getContent();
            this.totalCount = page.getTotalElements();
            this.size = page.getSize();
            this.page = page.getNumber();
            this.isLast = page.isLast();
            this.length = page.getNumberOfElements();
        }
    }
}
