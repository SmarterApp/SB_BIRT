/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
 *************************************************************************/
package irt.test;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.json.simple.JSONObject;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class MongoAppTest
{
  private static final String RESULT_COLLECTION = "test_results";

  private static final String BIRT_STATISTICS   = "birt_statistics";

  public static void main (String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext (MongoDBConfiguration.class);
    MongoOperations mongoDBOperation = (MongoOperations) ctx.getBean ("mongoTemplate");

    System.out.println (mongoDBOperation.collectionExists (RESULT_COLLECTION));
    Query query = new Query (Criteria.where ("reportId").is ("9WQE7KC5"));

    JSONObject returnMap = (JSONObject) mongoDBOperation.findOne (query, JSONObject.class, RESULT_COLLECTION);
    System.out.println (returnMap.toJSONString ());

    Query queryAudit = new Query ();
    queryAudit.addCriteria (Criteria.where ("testCount").exists (true));
    queryAudit.addCriteria (Criteria.where ("reportCount").exists (true));

    JSONObject auditMap = (JSONObject) mongoDBOperation.findOne (queryAudit, JSONObject.class, BIRT_STATISTICS);

    if (auditMap == null) {
      auditMap = new JSONObject ();
      auditMap.put ("testCount", 0);
      auditMap.put ("reportCount", 0);
      mongoDBOperation.save (auditMap, BIRT_STATISTICS);
    } else {
      auditMap.put ("testCount", Integer.valueOf (auditMap.get ("testCount").toString ()) + 1);
      auditMap.put ("reportCount", Integer.valueOf (auditMap.get ("reportCount").toString ()) + 1);
      mongoDBOperation.save (auditMap, BIRT_STATISTICS);
    }

    Calendar cal = Calendar.getInstance ();
    cal.add (Calendar.DATE, -0);
    System.out.println ("Date = " + cal.getTime ());

    SimpleDateFormat simpleDateFormat = new SimpleDateFormat ("dd-MMM-yyyy");

    Query q = new Query ().addCriteria (Criteria.where ("dateAdded").lte (simpleDateFormat.format (cal.getTime ())));

    List<JSONObject> findObj = (List) mongoDBOperation.find (q, JSONObject.class, RESULT_COLLECTION);

    System.out.println (new Date ().toString ());

    SimpleDateFormat sdf = new SimpleDateFormat ("dd-MMM-yyyy 'at' HH:MM z");
    sdf.setTimeZone (TimeZone.getTimeZone ("UTC"));
    Date date = new Date ();
    String sDate = sdf.format (date);
    System.out.println (sDate);

    byte[] decodedValue = Base64.getDecoder ().decode ("WlpEQ1hE"); // Basic
                                                                    // Base64
                                                                    // decoding
                                                                    // ZZDCXD
    System.out.println (new String (decodedValue, StandardCharsets.UTF_8));
  }

}
