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

  var irpApiSpecConstant = 'irp.ApiSpecs.';

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
   * @id : Constant key to be read from message.properties
   * @testName : testName key to be read from message.properties
   * @testAPI : API signature key which is tested and to be read from
   *          message.properties
   * @result : true/false based on API specification test
   * @details : Details about test
   * 
   */
  /*
   * Validation.setResultItems = function(id, testName, testAPI, result,
   * details) {
   * 
   * var points = 0;
   * 
   * if (result === true) { points = messageResource.get(testName + '.points',
   * 'message'); }
   * 
   * if (details == 'testApi.removed' || details == 'testApi.exists') { details =
   * messageResource.get(details, 'message'); } resultArray.push({ "id" :
   * messageResource.get(id, 'message'), "testName" :
   * messageResource.get(testName, 'message'), "testApi" :
   * messageResource.get(testAPI, 'message'), "testResult" : result, "details" :
   * details, "points" : points }); };
   */

  /*
   * Validation.setTTSTestResultItems = function(id, testName, testApi, result,
   * details) {
   * 
   * var points = 0;
   * 
   * if (result === true) { points = messageResource.get(testName + '.points',
   * 'message'); }
   * 
   * ttsTestArray.push({ "id" : messageResource.get(id, 'message'), "testName" :
   * messageResource.get(testName, 'message'), "testApi" : testApi != null ?
   * messageResource.get(testApi, 'message') : '', "testResult" : result,
   * "details" : details, "testApi_certified" : "", "testApi_certified_edge" :
   * "", "testApi_SB" : "", "testApi_mobile" : "", "points" : "1", "required" :
   * true, "testPoints" : "0" }); };
   */

  /*
   * Validation.setTTSManualTestResultItems = function(id, testName, testApi,
   * result, details) {
   * 
   * ttsManualTestArray.push({ "id" : messageResource.get(id, 'message'),
   * "testName" : messageResource.get(testName, 'message'), "testApi" : testApi !=
   * null ? messageResource.get(testApi, 'message') : '', "testResult" : result,
   * "details" : details, "testApi_certified" : "", "testApi_certified_edge" :
   * "", "testApi_SB" : "", "testApi_mobile" : "", "points" : "1", "required" :
   * true, "testPoints" : "0" }); };
   */

  Validation.setIRPTestResults = function(testName, apiPrefix, result, details,
      section) {
    var apiSpec = "";
    if (section == 'TTS') {
      apiSpec = irpApiSpecConstant + 'ttsapi.' + testName;
    } else if (section == 'TTS_MANUAL') {
      apiSpec = irpApiSpecConstant + 'ttsmanualapi.' + testName;
    } else {
      apiSpec = irpApiSpecConstant + 'browserapi.' + testName;
    }

    var apiSpecObject = eval(apiSpec);

    var points = 0;

    var testApi = "";
    if (apiPrefix == null) {
      testApi = apiSpecObject.testApi;
    } else {
      testApi = eval(apiSpec + '.testApi_' + apiPrefix);
    }

    if (result === true) {
      apiSpecObject.testPoints = apiSpecObject.points;
    }

    if (details == 'testApi.removed' || details == 'testApi.exists') {
      details = messageResource.get(details, 'message');
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

    var specObj = eval('irp.ApiSpecs.ttsmanualapi.' + currentTTSTest);
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
