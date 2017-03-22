/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
 *************************************************************************/

package irt.report.mongo.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

@Component
public class ReportDAOImpl implements ReportDAO
{

  private static final String RESULT_COLLECTION = "test_results";

  @Autowired
  private MongoOperations     mongoTemplate;

  @Override
  public Long insertResult (String reportJsonData) throws Exception {

    JSONParser parser = new JSONParser ();
    JSONObject reportJsonObj = (JSONObject) parser.parse (reportJsonData);

    if (reportJsonObj != null) {

      if (reportJsonObj.containsKey ("captchaInfo") && reportJsonObj.containsKey ("captchaInfoHash")) {

        String captchaInfo = reportJsonObj.get ("captchaInfo").toString ();
        String captchaInfoHash = String.valueOf (reportJsonObj.get ("captchaInfoHash"));
        if (!captchaHashCalculation (captchaInfo).equals (captchaInfoHash)) {
          throw new Exception ("Invalid Captcha info found");
        }
      } else {
        throw new Exception ("Captcha info not found");
      }

      /**
       * Setting default value for reportid to 100
       */
      Long reportId = (long) 100;

      Query query = new Query ();

      query.with (new Sort (new Order (Direction.DESC, "reportId")));

      List<JSONObject> reportIds = mongoTemplate.find (query, JSONObject.class, RESULT_COLLECTION);

      /**
       * Incrementing reportid by 1 by fetching data from test_results
       * collection
       */
      for (JSONObject dbReportId : reportIds) {
        reportId = Long.valueOf (dbReportId.get ("reportId").toString ()) + 1;
        break;
      }

      SimpleDateFormat simpleDateFormat = new SimpleDateFormat ("dd-MMM-yyyy 'at' HH:mm z");
      Date date = new Date ();
      String creationDate = simpleDateFormat.format (date);

      reportJsonObj.put ("reportId", reportId);
      reportJsonObj.put ("creationdate", creationDate);

      mongoTemplate.insert (reportJsonObj, RESULT_COLLECTION);
      return reportId;
    }

    return null;
  }

  @Override
  public JSONObject getResultByReportId (Long reportId) {

    Query query = new Query (Criteria.where ("reportId").is (reportId));

    return (JSONObject) mongoTemplate.findOne (query, JSONObject.class, RESULT_COLLECTION);

  }

  /**
   * Compute the hash value to check for "real person captcha" submission.
   * 
   * @param value
   *          the entered value
   * @return its hash value
   */
  private String captchaHashCalculation (String value) {
    int hash = 5381;
    value = value.toUpperCase ();
    for (int i = 0; i < value.length (); i++) {
      hash = ((hash << 5) + hash) + value.charAt (i);
    }
    return String.valueOf (hash);
  }

}
