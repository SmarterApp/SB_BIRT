/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * https://bitbucket.org/sbacoss/eotds/wiki/AIR_Open_Source_License
 *************************************************************************/
package irt.test;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

import com.mongodb.MongoClient;

@Configuration
public class MongoDBConfiguration
{
  public @Bean MongoDbFactory mongoDbFactory () throws Exception {
    return new SimpleMongoDbFactory (new MongoClient (), "irt_report");
  }

  public @Bean MongoTemplate mongoTemplate () throws Exception {

    MongoTemplate mongoTemplate = new MongoTemplate (mongoDbFactory ());

    return mongoTemplate;

  }
}
