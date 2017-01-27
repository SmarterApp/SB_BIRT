//*******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
//*******************************************************************************
(function(Util) {

  var resultArray = [];

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

  Validation.setResultItems = function(id, testName, testAPI, result, details) {
    resultArray.push({
      "id" : id,
      "testName" : testName,
      "testApi" : testAPI,
      "testResult" : result,
      "details" : details
    });
  };

  /*
   * Validation.setResultItems = function(id,testName,testAPI,result){
   * resultArray.push({ "id": id,"testName": testName,"testApi":
   * testAPI,"testResult":result}); };
   */

  Validation.getResult = function() {
    return resultArray;
  };

  Util.Validation = Validation;

})(Util);
