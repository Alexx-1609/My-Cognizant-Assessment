package com.cognizant.orm_learn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.orm_learn.entity.Country;

public interface CountryRepository extends JpaRepository<Country, String> {

}