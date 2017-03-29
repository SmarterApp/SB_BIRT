package irt.report.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import irt.report.mongo.dao.ReportDAO;

@Component
public class BirtScheduler
{

  @Autowired
  private ReportDAO reportDAO;

  public void run () {

    // System.out.println ("Getting # of Records in DB " +
    // reportDAO.getTotalRecords ());

    /*
     * System.out.println (RandomStringUtils.randomAlphanumeric (20).toUpperCase
     * ());
     */
  }
}
