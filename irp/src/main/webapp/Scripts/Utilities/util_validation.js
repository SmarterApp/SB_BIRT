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
  Validation.setResultItems = function(id, testName, testAPI, result, details) {

    if (details == 'testApi.removed' || details == 'testApi.exists') {
      details = messageResource.get(details, 'message');
    }
    resultArray.push({
      "id" : messageResource.get(id, 'message'),
      "testName" : messageResource.get(testName, 'message'),
      "testApi" : messageResource.get(testAPI, 'message'),
      "testResult" : result,
      "details" : details
    });
  };

  Validation.getResult = function() {
    return resultArray;
  };

  Util.Validation = Validation;

})(Util);
