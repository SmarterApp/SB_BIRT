/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
 *************************************************************************/
package irt.test;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.json.simple.JSONObject;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class MongoAppTest
{
  private static final String RESULT_COLLECTION = "test_results";

  public static void main (String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext (MongoDBConfiguration.class);
    MongoOperations mongoDBOperation = (MongoOperations) ctx.getBean ("mongoTemplate");

    System.out.println (mongoDBOperation.collectionExists (RESULT_COLLECTION));
    Query query = new Query (Criteria.where ("reportId").is (101));

    JSONObject returnMap = (JSONObject) mongoDBOperation.findOne (query, JSONObject.class, RESULT_COLLECTION);
    System.out.println (returnMap.toJSONString ());
    System.out.println (new Date ().toString ());

    SimpleDateFormat sdf = new SimpleDateFormat ("dd-MMM-yyyy 'at' HH:MM z");
    Date date = new Date ();
    String sDate = sdf.format (date);
    System.out.println (sDate);
  }

}
