/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * https://bitbucket.org/sbacoss/eotds/wiki/AIR_Open_Source_License
 *************************************************************************/
package irt.report.mongo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "test_results")
public class BrowserTestResult
{

  @Id
  private String _id;

  private Long   reportId;
  private String name;
  private String email;
  private String organization;
  private String browserInfo;
  private String creationdate;
  private String externalReportConfig;
  private String jsGrid;
  private String jsTTSGrid;
  private String jsHTML5TestGrid;
  private String jsCSS3TestGrid;
  private String headerHTML;

  public String get_id () {
    return _id;
  }

  public void set_id (String _id) {
    this._id = _id;
  }

  public Long getReportId () {
    return reportId;
  }

  public void setReportId (Long reportId) {
    this.reportId = reportId;
  }

  public String getName () {
    return name;
  }

  public void setName (String name) {
    this.name = name;
  }

  public String getEmail () {
    return email;
  }

  public void setEmail (String email) {
    this.email = email;
  }

  public String getOrganization () {
    return organization;
  }

  public void setOrganization (String organization) {
    this.organization = organization;
  }

  public String getBrowserInfo () {
    return browserInfo;
  }

  public void setBrowserInfo (String browserInfo) {
    this.browserInfo = browserInfo;
  }

  public String getCreationdate () {
    return creationdate;
  }

  public void setCreationdate (String creationdate) {
    this.creationdate = creationdate;
  }

  public String getExternalReportConfig () {
    return externalReportConfig;
  }

  public void setExternalReportConfig (String externalReportConfig) {
    this.externalReportConfig = externalReportConfig;
  }

  public String getJsGrid () {
    return jsGrid;
  }

  public void setJsGrid (String jsGrid) {
    this.jsGrid = jsGrid;
  }

  public String getJsTTSGrid () {
    return jsTTSGrid;
  }

  public void setJsTTSGrid (String jsTTSGrid) {
    this.jsTTSGrid = jsTTSGrid;
  }

  public String getJsHTML5TestGrid () {
    return jsHTML5TestGrid;
  }

  public void setJsHTML5TestGrid (String jsHTML5TestGrid) {
    this.jsHTML5TestGrid = jsHTML5TestGrid;
  }

  public String getJsCSS3TestGrid () {
    return jsCSS3TestGrid;
  }

  public void setJsCSS3TestGrid (String jsCSS3TestGrid) {
    this.jsCSS3TestGrid = jsCSS3TestGrid;
  }

  public String getHeaderHTML () {
    return headerHTML;
  }

  public void setHeaderHTML (String headerHTML) {
    this.headerHTML = headerHTML;
  }

}
