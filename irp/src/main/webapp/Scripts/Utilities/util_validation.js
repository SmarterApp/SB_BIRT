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

  var ttsManualTestArray = [];

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

  Validation.setIRPTestResults = function(testName, testBrowserType, result,
      details, section) {
    var apiSpec = "";
    if (section == 'TTS') {
      apiSpec = irpApiSpecConstant + specSeparator + specTTSApi + specSeparator
          + testName;
    } else if (section == 'TTS_MANUAL') {
      apiSpec = irpApiSpecConstant + specSeparator + specTTSManualApi
          + specSeparator + testName;
    } else if (section == 'BROWSER_MANUAL') {
      apiSpec = irpApiSpecConstant + specSeparator + specBrowserManualApi
          + specSeparator + testName;
    } else {
      apiSpec = irpApiSpecConstant + specSeparator + specBrowserapi
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

      details = eval(irpApiSpecConstant + specSeparator + specMessage
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
    } else {
      resultArray.push(apiSpecObject);
    }

  };

  Validation.setTTSItemDetail = function(currentTTSTest, result) {

    var itemDetail = {};

    var specObj = eval(irpApiSpecConstant + specSeparator + specTTSManualApi
        + specSeparator + currentTTSTest);
    specObj.testResult = result;

    $.extend(itemDetail, specObj);

    return itemDetail;

  };

  Validation.mergeTTSResultIntoResult = function() {

    ttsManualTestArray.forEach(function(element) {

      if (element.testResult == null) {
        element.testResult = false;
      }
      ttsTestArray.push(element);
    });

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

  Util.Validation = Validation;

})(Util);
