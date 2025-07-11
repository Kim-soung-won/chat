package com.blog.chatback.util;

import com.blog.chatback.constants.CodeConstants;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Array;
import java.lang.reflect.GenericArrayType;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

@Slf4j
public class DataTypeUtil {

    public static int checkType(Object value) {
        String type;
        // Class 객체인 경우 클래스명 추출
        if (value instanceof Class) {
            type = ((Class<?>) value).getName();
        } else {
            // 아닐 경우 Class객체로 변환 후 이름 추출
            type = value.getClass().getName();
        }
        switch (type) {
            case "java.lang.Byte":
            case "java.lang.Short":
            case "java.lang.Integer":
            case "java.lang.Long":
                return CodeConstants.FIELD_TYPE_INTEGER;
            case "java.lang.Double":
            case "java.lang.Float":
                return CodeConstants.FIELD_TYPE_REAL;
            case "java.lang.Boolean":
                return CodeConstants.FIELD_TYPE_BOOLEAN;
            case "java.util.Date":
            case "java.time.LocalDate":
            case "java.time.LocalDateTime":
                return CodeConstants.FIELD_TYPE_DATE;
            case "java.util.UUID":
                return CodeConstants.FIELD_TYPE_UUID;
            case "java.lang.String":
            default:
                return CodeConstants.FIELD_TYPE_STRING;
        }
    }

//    public static Object parseType(int type, Object value) {
//        String valueStr = (String) value;
//        switch (type) {
//            case CodeConstants.FIELD_TYPE_INTEGER:
//                return Integer.valueOf(valueStr);
//            case CodeConstants.FIELD_TYPE_REAL:
//                return Double.valueOf(valueStr);
//            case CodeConstants.FIELD_TYPE_BOOLEAN:
//                return Boolean.valueOf(valueStr);
//            case CodeConstants.FIELD_TYPE_STRING:
//            default:
//                return valueStr;
//        }
//    }

    // 클래스의 Type(Class의 상위 객체) 정보를 반환
    public static Type[] getGenericType(Class<?> target) {
        if (target == null)
            return new Type[0];
        // Generic을 포함한 상속받는 인터페이스 정보를 추출
        Type[] types = target.getGenericInterfaces();
        // 상속 받는 인터페이스가 있을 경우 제네릭 정보 반환
        if (types.length > 0) {
            return types;
        }
        // 상속받는 인터페이스가 없을 경우, 상위 클래스의 정보를 추출
        Type type = target.getGenericSuperclass();
        if (type != null) {
            if (type instanceof ParameterizedType) {
                return new Type[] { type }; // 부모 클래스의 제네릭 정보 반환
            }
        }
        return new Type[0]; // 제너릭 타입 없음, 그냥 단순 Class
    }

    // Type 객체로부터 실제 Class 객체를 반환
    public static Class<?> getClass(Type type) {
        // 일반 Class 타입인 경우
        if (type instanceof Class) {
            return (Class<?>) type;
        }
        // 제네릭 타입인 경우
        else if (type instanceof ParameterizedType) {
            return getClass(((ParameterizedType) type).getRawType());
        }
        // 제네릭 배열인 경우
        else if (type instanceof GenericArrayType) {
            Type componentType = ((GenericArrayType) type).getGenericComponentType();
            Class<?> componentClass = getClass(componentType);
            if (componentClass != null) {
                return Array.newInstance(componentClass, 0).getClass();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
