package com.cognizant;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class UserServiceTest {

    @Test
    void testRegisterUser() {

        UserRepository mockRepo = mock(UserRepository.class);

        UserService service = new UserService(mockRepo);

        service.registerUser("Utkarsh");

        verify(mockRepo).saveUser("Utkarsh");
    }
}