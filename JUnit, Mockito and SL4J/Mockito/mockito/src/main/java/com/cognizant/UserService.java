package com.cognizant;

public class UserService {

    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public void registerUser(String username) {
        repository.saveUser(username);
    }
}