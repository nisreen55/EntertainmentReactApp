package com.bench.netflix.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bench.netflix.model.UserList;

@Repository
public interface UserListRepository extends JpaRepository<UserList, Long> {
	@Query("SELECT  u FROM UserList u WHERE u.email = ?1")
    public List<UserList> findByEmail(String email);
	
	@Query("SELECT  u FROM UserList u WHERE u.email = ?1 and u.movieid = ?2")
    public UserList getUserList(String email, String movieid);
	
    boolean existsByEmailAndMovieid(String email, String movieid);
    
    void deleteByEmailAndMovieid(String email, String movieid);
     

}
