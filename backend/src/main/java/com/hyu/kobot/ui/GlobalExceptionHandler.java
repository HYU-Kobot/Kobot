package com.hyu.kobot.ui;

import com.hyu.kobot.ui.dto.ErrorMessageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorMessageResponse> runtimeException(RuntimeException e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body(new ErrorMessageResponse(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessageResponse> exception(Exception e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body(new ErrorMessageResponse(e.getMessage()));
    }
}
