/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * https://bitbucket.org/sbacoss/eotds/wiki/AIR_Open_Source_License
 *************************************************************************/
package irt.test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import irt.report.mongo.model.BrowserTestResult;

public class MongoAppTest
{
  private static final String RESULT_COLLECTION    = "test_results";
  private static final String REPORT_ID_COLLECTION = "reportid";

  public static void main (String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext (MongoDBConfiguration.class);
    MongoOperations mongoDBOperation = (MongoOperations) ctx.getBean ("mongoTemplate");

    System.out.println (mongoDBOperation.collectionExists (RESULT_COLLECTION));
    Query query = new Query (Criteria.where ("reportId").is (101));

    BrowserTestResult returnMap = (BrowserTestResult) mongoDBOperation.findOne (query, BrowserTestResult.class, RESULT_COLLECTION);

    System.out.println (returnMap);
  }

}
