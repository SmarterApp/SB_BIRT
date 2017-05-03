/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
 *************************************************************************/
package irt.report.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import irt.report.mongo.dao.ReportDAO;

@Component
public class BirtScheduler
{

  @Autowired
  private ReportDAO reportDAO;

  public void reportRetentionCheck () {

    try {
      reportDAO.deleteReportAfterRetentionPeriod ();
    } catch (Exception e) {
      e.printStackTrace ();
    }

  }
}
