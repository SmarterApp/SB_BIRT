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

    reportDAO.deleteReportAfterRetentionPeriod ();

  }
}
