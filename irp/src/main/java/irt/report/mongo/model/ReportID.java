/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
 *************************************************************************/
package irt.report.mongo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "reportid")
public class ReportID
{

  @Id
  private String _id;

  private Long   reportId;

  public Long getReportId () {
    return reportId;
  }

  public void setReportId (Long reportId) {
    this.reportId = reportId;
  }

}
