/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
 *************************************************************************/

package irt.report.mongo.dao;

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

import irt.report.mongo.model.BrowserTestResult;

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

      /**
       * Setting default value for reportid to 100
       */
      Long reportId = (long) 100;

      Query query = new Query ();

      query.with (new Sort (new Order (Direction.DESC, "reportId")));

      List<BrowserTestResult> reportIds = mongoTemplate.find (query, BrowserTestResult.class, RESULT_COLLECTION);

      /**
       * Incrementing reportid by 1 by fetching data from test_results
       * collection
       */
      for (BrowserTestResult dbReportId : reportIds) {
        reportId = Long.valueOf (dbReportId.getReportId ()) + 1;
        break;
      }

      reportJsonObj.put ("reportId", reportId);
      reportJsonObj.put ("creationdate", new Date ());

      mongoTemplate.insert (reportJsonObj, RESULT_COLLECTION);
      return reportId;
    }

    return null;
  }

  @Override
  public BrowserTestResult getResultByReportId (Long reportId) {

    Query query = new Query (Criteria.where ("reportId").is (reportId));

    return (BrowserTestResult) mongoTemplate.findOne (query, BrowserTestResult.class, RESULT_COLLECTION);

  }

}
