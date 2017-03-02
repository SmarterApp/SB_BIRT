/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * https://bitbucket.org/sbacoss/eotds/wiki/AIR_Open_Source_License
 *************************************************************************/

package irt.report.mongo.dao;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import irt.report.mongo.model.BrowserTestResult;
import irt.report.mongo.model.ReportID;

@Component
public class ReportDAOImpl implements ReportDAO
{

  private static final String RESULT_COLLECTION    = "test_results";
  private static final String REPORT_ID_COLLECTION = "reportid";

  @Autowired
  private MongoOperations     mongoTemplate;

  @Override
  public void insertResult (String reportJsonData) throws Exception {

    JSONParser parser = new JSONParser ();
    JSONObject reportJsonObj = (JSONObject) parser.parse (reportJsonData);

    if (reportJsonObj != null) {

      Long reportId = (long) 100;
      ReportID reportIdFromCollection = mongoTemplate.findOne (new Query (), ReportID.class, REPORT_ID_COLLECTION);

      ReportID reportIdObjToSave = new ReportID ();

      if (reportIdFromCollection != null) {
        reportId = reportIdFromCollection.getReportId () + 1;
        reportIdObjToSave.setReportId (reportId);
        mongoTemplate.findAndModify (new Query (Criteria.where ("reportId").is (reportIdFromCollection.getReportId ())), new Update ().update ("reportId", reportId), ReportID.class,
            REPORT_ID_COLLECTION);
      } else {
        reportIdObjToSave.setReportId (reportId);
        mongoTemplate.insert (reportIdObjToSave, REPORT_ID_COLLECTION);

      }

      reportJsonObj.put ("reportId", reportId);

      mongoTemplate.insert (reportJsonObj, RESULT_COLLECTION);
    }
  }

  @Override
  public BrowserTestResult getResultByReportId (Long reportId) {

    Query query = new Query (Criteria.where ("reportId").is (reportId));

    return (BrowserTestResult) mongoTemplate.findOne (query, BrowserTestResult.class, RESULT_COLLECTION);

  }

}
