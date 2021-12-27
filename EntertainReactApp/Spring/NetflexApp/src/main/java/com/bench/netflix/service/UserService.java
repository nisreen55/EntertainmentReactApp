package com.bench.netflix.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.bench.netflix.model.User;
import com.bench.netflix.repo.UserRepository;

@Service
public class UserService {
	
	private UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	
	public List<User> getUsers() {
        return userRepository.findAll();
    }
	
	public User saveUser(User user) {
    	return userRepository.save(user);
    }
	
	public User loadUserByUserEmail(String email)  
	{
	    User user = userRepository.findByEmail(email);
	    return user;
	}
	
	

}