package com.dbgeneration.config;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.dbgeneration.entity.Role;
import com.dbgeneration.entity.User;
import com.dbgeneration.repository.RoleRepository;
import com.dbgeneration.repository.UserRepository;

@Component
public class DataSeedingListener implements ApplicationListener<ContextRefreshedEvent> {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
//		// Roles
//		if (roleRepository.findByName("ROLE_ADMIN") == null) {
//			roleRepository.save(new Role("ROLE_ADMIN"));
//		}
//
//		if (roleRepository.findByName("ROLE_MEMBER") == null) {
//			roleRepository.save(new Role("ROLE_MEMBER"));
//		}
//
//		// Admin account
//		if (userRepository.findByEmail("duyen@gmail.com") == null) {
//			User admin = new User();
//			admin.setEmail("admin@gmail.com");
//			admin.setPassword(passwordEncoder.encode("123456"));
//			HashSet<Role> roles = new HashSet<>();
//			roles.add(roleRepository.findByName("ROLE_ADMIN"));
//			admin.setRoles(roles);
//			userRepository.save(admin);
//		}
//
//		// Member account
//		if (userRepository.findByEmail("duyen2@gmail.com") == null) {
//			User user = new User();
//			user.setEmail("member@gmail.com");
//			user.setPassword(passwordEncoder.encode("123456"));
//			HashSet<Role> roles = new HashSet<>();
//			roles.add(roleRepository.findByName("ROLE_MEMBER"));
//			user.setRoles(roles);
//			userRepository.save(user);
//		}
	}

}
