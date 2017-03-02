/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * https://bitbucket.org/sbacoss/eotds/wiki/AIR_Open_Source_License
 *************************************************************************/
package irt.report.mongo.dao;

import irt.report.mongo.model.BrowserTestResult;

public interface ReportDAO
{

  public void insertResult (String reportJsonData) throws Exception;

  public BrowserTestResult getResultByReportId (Long reportId);

}
