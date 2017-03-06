// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
(function(Util) {

  var resultArray = [];

  var ttsTestArray = [];

  var html5TestArray = [];

  var css3TestArray = [];

  var ttsManualTestArray = [];

  var capabilityTestArray = [];

  var processTestArray = [];

  var MACREGEX = new RegExp(
      "^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$");

  var Validation = {};

  Validation.isMacAddressValid = function(macAddress) {
    return macAddress != null && MACREGEX.test(macAddress);
  };

  Validation.isIPAddressValid = function(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0 -9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        .test(ipaddress)) {
      return (true)
    }
    return (false)
  };

  /**
   * This method will set individual test details in a final JSON array
   * 
   * 
   * @testName : testName key to be read from irpSpect.js
   * @testBrowserType : Browser Type to identified whether it is
   *                  certified/securebrowser or mobile securebrowser
   * @result : true/false based on API specification test
   * @details : Details about test
   * @section : Result Grid Section like TTS / TTS_MANUAL or null
   */

  Validation.setIRTTestResults = function(testName, testBrowserType, result,
      details, section) {
    var apiSpec = "";
    if (section == 'TTS') {
      apiSpec = irtApiSpecConstant + specSeparator + specTTSApi + specSeparator
          + testName;
    } else if (section == 'TTS_MANUAL') {
      apiSpec = irtApiSpecConstant + specSeparator + specTTSManualApi
          + specSeparator + testName;
    } else if (section == 'CAPABILITY_MANUAL') {
      apiSpec = irtApiSpecConstant + specSeparator + specCapabilityManualApi
          + specSeparator + testName;
    } else if (section == 'PROCESS_MANUAL') {
      apiSpec = irtApiSpecConstant + specSeparator + specProcessManualApi
          + specSeparator + testName;
    } else {
      apiSpec = irtApiSpecConstant + specSeparator + specBrowserapi
          + specSeparator + testName;
    }

    var apiSpecObject = eval(apiSpec);

    var testApi = "";
    if (testBrowserType == null) {
      testApi = apiSpecObject.testApi;
    } else {
      testApi = eval(apiSpec + '.testApi_' + testBrowserType);
    }

    if (result === true) {
      apiSpecObject.testPoints = apiSpecObject.points;
    }

    if (details == 'testApi_removed' || details == 'testApi_exists') {

      details = eval(irtApiSpecConstant + specSeparator + specMessage
          + specSeparator + details);
    }

    apiSpecObject.testResult = result;
    apiSpecObject.details = details;
    apiSpecObject.testApi = testApi;

    if (section == 'TTS') {
      ttsTestArray.push(apiSpecObject);
    } else if (section == 'TTS_MANUAL') {
      apiSpecObject.testResult = null;
      ttsManualTestArray.push(apiSpecObject);
    } else if (section == 'CAPABILITY_MANUAL') {
      apiSpecObject.testResult = null;
      capabilityTestArray.push(apiSpecObject);
    } else if (section == 'PROCESS_MANUAL') {
      apiSpecObject.testResult = null;
      processTestArray.push(apiSpecObject);
    } else {
      resultArray.push(apiSpecObject);
    }

  };

  Validation.setTTSItemDetail = function(currentTTSTest, currentManualApi,
      result) {

    var itemDetail = {};

    var specObj = eval(irtApiSpecConstant + specSeparator + currentManualApi
        + specSeparator + currentTTSTest);
    specObj.testResult = result;

    $.extend(itemDetail, specObj);

    return itemDetail;

  };

  Validation.mergeTTSResultIntoResult = function() {

    ttsManualTestArray.forEach(function(element) {
      ttsTestArray.push(element);
    });

  };

  Validation.mergeCapabilityResultIntoResult = function() {

    capabilityTestArray.forEach(function(element) {
      resultArray.push(element);
    });

  };

  Validation.mergeProcessResultIntoResult = function() {

    processTestArray.forEach(function(element) {
      resultArray.push(element);
    });

  };

  Validation.formulateJsonForReport = function() {

    if (processTestArray.length == 0) {
      populateReportGrid(Object.keys(IRT.ProcessTest), process_section);
      Validation.mergeProcessResultIntoResult();
    }

    if (capabilityTestArray.length == 0) {
      populateReportGrid(Object.keys(IRT.CapabilityTest), capability_section);
      Validation.mergeCapabilityResultIntoResult();
    }

    if (ttsManualTestArray.length == 0) {
      populateReportGrid(Object.keys(TTS.Test), ttsmanual_section);
      Validation.mergeTTSResultIntoResult();
    }

    if (html5TestArray.length == 0) {
      html5TestArray.push(Validation.setTTSItemDetail('HTML5',
          specExternalTest, null));
    }

    if (css3TestArray.length == 0) {
      css3TestArray.push(Validation.setTTSItemDetail('CSS3', specExternalTest,
          null));
    }

    var itemDetail = {};
    $.extend(itemDetail, {
      "externalReportConfig" : {
        "jsGrid" : false,
        "jsTTSGrid" : false,
        "jsHTML5TestGrid" : true,
        "jsCSS3TestGrid" : true
      },
      "reportGridData" : {
        "jsGrid" : resultArray,
        "jsTTSGrid" : ttsTestArray,
        "jsHTML5TestGrid" : html5TestArray,
        "jsCSS3TestGrid" : css3TestArray
      },
      "headerHTML" : {
        "css3TestHeader" : $('#css3TestHeader').html(),
        "browserAPI" : $('#browserAPI').html(),
        "textToSpeechAPI" : $('#textToSpeechAPI').html(),
        "html5TestHeader" : $('#html5TestHeader').html()
      },
      "reportInfo" : {
        "name" : $.cookie("name"),
        "organization" : $.cookie("organization"),
        "email" : $.cookie("emailId"),
        "browserInfo" : $.cookie("browserDetails")
      },
      "version" : $.cookie("version")
    });

    return itemDetail;
  };

  Validation.getProcessManualResult = function() {
    return processTestArray;
  };

  Validation.getCapabilityManualResult = function() {
    return capabilityTestArray;
  };

  Validation.getTTSManualResult = function() {
    return ttsManualTestArray;
  };

  Validation.getTTSResult = function() {
    return ttsTestArray;
  };

  Validation.getResult = function() {
    return resultArray;
  };

  Validation.getResultScore = function() {
    var total = this.getResult().length;
    return total;
  };

  Validation.getTTSResultScore = function() {
    var total = this.getTTSResult().length;
    return total;
  };

  Validation.setHtml5TestArray = function(extTestResultArray) {
    html5TestArray = extTestResultArray.slice();
  };

  Validation.getHtml5TestArray = function() {
    return html5TestArray;
  };

  Validation.setCSS3TestArray = function(extTestResultArray) {
    css3TestArray = extTestResultArray.slice();
  };

  Validation.getCSS3TestArray = function() {
    return css3TestArray;
  };

  Util.Validation = Validation;

})(Util);
