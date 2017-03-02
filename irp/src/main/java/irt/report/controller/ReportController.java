/*************************************************************************
 * Educational Online Test Delivery System Copyright (c) 2017 American
 * Institutes for Research
 *
 * Distributed under the AIR Open Source License, Version 1.0 See accompanying
 * file AIR-License-1_0.txt or at
 * https://bitbucket.org/sbacoss/eotds/wiki/AIR_Open_Source_License
 *************************************************************************/
package irt.report.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.QueryParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import irt.report.mongo.dao.ReportDAO;

@Controller
@RequestMapping ("/report")
public class ReportController
{

  @Autowired
  private ReportDAO reportDAO;

  @RequestMapping (value = "/getReport/{reportId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public Object getReport (HttpServletRequest request,
      HttpServletResponse response, @PathVariable ("reportId") Long reportId) throws Exception {

    return reportDAO.getResultByReportId (reportId);

  }

  @RequestMapping (value = "/saveReport", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public Object saveReport (HttpServletRequest request,
      HttpServletResponse response, @QueryParam ("reportJsonData") String reportJsonData) throws Exception {

    Map<String, Object> returnMap = new LinkedHashMap<String, Object> ();

    reportDAO.insertResult (reportJsonData);

    returnMap.put ("success", true);
    return returnMap;

  }

}
