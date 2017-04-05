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
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

@Component
public class ReportDAOImpl implements ReportDAO
{

  private static final String RESULT_COLLECTION        = "test_results";

  private static final String BIRT_STATISTICS          = "birt_statistics";

  private static final String REPORT_DELETE_STATISTICS = "report_delete_statistics";

  @Autowired
  private MongoOperations     mongoTemplate;

  @SuppressWarnings ("unchecked")
  @Override
  public String insertResult (String reportJsonData) throws Exception {

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

      if (reportJsonObj.containsKey ("reportGridData")) {
        JSONObject reportGridDataJsonObj = (JSONObject) parser.parse (reportJsonObj.get ("reportGridData").toString ());

        if (reportGridDataJsonObj.containsKey ("jsGrid")
            && reportGridDataJsonObj.containsKey ("jsTTSGrid")
            && reportGridDataJsonObj.containsKey ("jsAudioRecorderGrid")
            && reportGridDataJsonObj.containsKey ("jsHTML5TestGrid")
            && reportGridDataJsonObj.containsKey ("jsCSS3TestGrid")) {

        } else {

          throw new Exception ("Report Grid Data not found");
        }

      } else {
        throw new Exception ("Report Data not found");
      }

      String reportId = this.getValidReportId ();
      String creationDate = this.getCurrentDate (true);
      reportJsonObj.put ("reportId", reportId);
      reportJsonObj.put ("creationdate", creationDate);
      reportJsonObj.put ("dateAdded", this.getCurrentDate (false));

      mongoTemplate.insert (reportJsonObj, RESULT_COLLECTION);

      this.captureBIRTStatistics (true);

      return reportId;
    }

    return null;
  }

  private String getCurrentDate (Boolean timeStampRequired) {

    SimpleDateFormat simpleDateFormat = null;
    if (timeStampRequired)
      simpleDateFormat = new SimpleDateFormat ("dd-MMM-yyyy 'at' HH:mm z");
    else
      simpleDateFormat = new SimpleDateFormat ("dd-MMM-yyyy");

    Date date = new Date ();
    return simpleDateFormat.format (date);
  }

  private String getValidReportId () {
    String reportId = RandomStringUtils.randomAlphanumeric (Integer.valueOf (System.getProperty ("birt.app.reportid.length"))).toUpperCase ();

    if (getResultByReportId (reportId) != null) {
      reportId = getValidReportId ();
    }

    return reportId;
  }

  @Override
  public JSONObject getResultByReportId (String reportId) {

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

  @Override
  public Long getTotalRecords () {

    Query query = new Query ();
    return mongoTemplate.count (query, RESULT_COLLECTION);
  }

  @Override
  public void captureBIRTStatistics (Boolean report) {
    Query queryAudit = new Query ();
    queryAudit.addCriteria (Criteria.where ("testCount").exists (true));
    queryAudit.addCriteria (Criteria.where ("reportCount").exists (true));

    JSONObject auditMap = (JSONObject) mongoTemplate.findOne (queryAudit, JSONObject.class, BIRT_STATISTICS);

    String lastUpdateDate = this.getCurrentDate (true);

    /**
     * System will first check in BIRT_STATISTICS collection if any record is
     * available, if record is not available then it will insert object with
     * 
     * @testCount (# of times test is run using BIRT)
     * @reportCount (# of times report is submitted in BIRT)
     * @lastUpdateDate (This is timestamp which will indicate when above two
     *                 counts are updated)
     * @reportStatisticsStartDate (Timestamp when BIRT actually started
     *                            collecting BIRT Statistics)
     * 
     * @report : boolean if false then @testCount will be incremented
     *         otherwise @reportCount
     */
    if (auditMap == null) {
      auditMap = new JSONObject ();
      auditMap.put ("testCount", !report ? 1 : 0);
      auditMap.put ("reportCount", report ? 1 : 0);
      auditMap.put ("lastUpdateDate", lastUpdateDate);
      auditMap.put ("reportStatisticsStartDate", lastUpdateDate);
      mongoTemplate.save (auditMap, BIRT_STATISTICS);
    } else {
      if (!report)
        auditMap.put ("testCount", Integer.valueOf (auditMap.get ("testCount").toString ()) + 1);
      else
        auditMap.put ("reportCount", Integer.valueOf (auditMap.get ("reportCount").toString ()) + 1);

      auditMap.put ("lastUpdateDate", lastUpdateDate);
      mongoTemplate.save (auditMap, BIRT_STATISTICS);
    }

  }

  @Override
  public void deleteReportAfterRetentionPeriod () {
    /** Getting Retention Policy # of Days from JVM Param **/
    Integer reportRetentionDays = Integer.parseInt (System.getProperty ("birt.app.report.retention"));

    Calendar calendar = Calendar.getInstance ();
    /** Subtracting # of retention days from Current Date **/
    calendar.add (Calendar.DATE, -reportRetentionDays);

    SimpleDateFormat simpleDateFormat = new SimpleDateFormat ("dd-MMM-yyyy");

    /**
     * Getting reports where dateAdded is less then or equal to ( Current Date -
     * RetentionDays)
     **/
    Query reportDeleteQuery = new Query ().addCriteria (Criteria.where ("dateAdded").lte (simpleDateFormat.format (calendar.getTime ())));
    List<JSONObject> reportsToDelete = (List<JSONObject>) mongoTemplate.find (reportDeleteQuery, JSONObject.class, RESULT_COLLECTION);
    JSONObject reportDeleteObj;
    for (JSONObject reportObj : reportsToDelete) {
      String reportId = reportObj.get ("reportId").toString ();
      Query deleteQuery = new Query ().addCriteria (Criteria.where ("reportId").is (reportId));
      mongoTemplate.remove (deleteQuery, JSONObject.class, RESULT_COLLECTION);

      reportDeleteObj = new JSONObject ();
      reportDeleteObj.put ("reportId", reportId);
      reportDeleteObj.put ("deletedDate", getCurrentDate (true));

      mongoTemplate.insert (reportDeleteObj, REPORT_DELETE_STATISTICS);

    }

  }

}
