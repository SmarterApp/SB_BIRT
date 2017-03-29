/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
 *************************************************************************/
package irt.report.mongo.dao;

import org.json.simple.JSONObject;

public interface ReportDAO
{

  public String insertResult (String reportJsonData) throws Exception;

  public JSONObject getResultByReportId (String reportId);

  public Long getTotalRecords ();

  public void captureBIRTStatistics (Boolean report);

}
