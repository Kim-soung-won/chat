package com.blog.chatback.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BackendException extends Exception {

    private String errorCode;
    private String reason;
    private String head;

    public BackendException(String message) {
        super(message);
    }

    public BackendException(String head, Throwable cause) {
        super(head + ", " + cause.getMessage(), cause);
    }

    public BackendException(String errorCode, String head, Throwable cause) {
        super(head + ", " + cause.getMessage(), cause);
        this.errorCode = errorCode;
    }

    public BackendException(String errorCode, String head, String reason, Throwable cause) {
        super(head + ", " + cause.getMessage(), cause);
        this.head = head;
        this.errorCode = errorCode;
        this.reason = reason;
    }

    @Override
    public String getMessage() {
        StringBuilder message = new StringBuilder();
        if (errorCode != null) {
            message.append("[").append(this.errorCode).append("] ");
        }
        message.append(super.getMessage());
        if (reason != null) {
            message.append(" - Reason: ").append(this.reason);
        }
        return message.toString();
    }
}
