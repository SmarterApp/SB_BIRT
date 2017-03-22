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

  var audioTestArray = [];

  var audioTestManualArray = [];

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
    if (section == recordermanual_section) {
      apiSpec = irtApiSpecConstant + specSeparator + specRecorderManualApi
          + specSeparator + testName;
    } else if (section == recorder_section) {
      apiSpec = irtApiSpecConstant + specSeparator + specAudioRecorderApi
          + specSeparator + testName;
    } else if (section == tts_section) {
      apiSpec = irtApiSpecConstant + specSeparator + specTTSApi + specSeparator
          + testName;
    } else if (section == ttsmanual_section) {
      apiSpec = irtApiSpecConstant + specSeparator + specTTSManualApi
          + specSeparator + testName;
    } else if (section == capability_section) {
      apiSpec = irtApiSpecConstant + specSeparator + specCapabilityManualApi
          + specSeparator + testName;
    } else if (section == process_section) {
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
    if (section == recordermanual_section) {
      audioTestManualArray.push(apiSpecObject);
    } else if (section == recorder_section) {
      audioTestArray.push(apiSpecObject);
    } else if (section == tts_section) {
      ttsTestArray.push(apiSpecObject);
    } else if (section == ttsmanual_section) {
      ttsManualTestArray.push(apiSpecObject);
    } else if (section == capability_section) {
      capabilityTestArray.push(apiSpecObject);
    } else if (section == process_section) {
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

    var rTestPass = 0, rTestFail = 0, notperformed = 0;
    ttsManualTestArray.forEach(function(element) {
      ttsTestArray.push(element);
      if (element.testResult != null || element.testResult != undefined) {
        if (element.testResult === true) {
          rTestPass++;
        } else {
          rTestFail++;
        }
      } else {
        notperformed++;
      }
    });

    var itemDetail = {};
    $.extend(itemDetail, {
      "rTestPass" : rTestPass,
      "rTestFail" : rTestFail,
      "notperformed" : notperformed
    });

    return itemDetail;

  };

  Validation.mergeCapabilityResultIntoResult = function() {

    var rTestPass = 0, rTestFail = 0, notperformed = 0;
    capabilityTestArray.forEach(function(element) {
      resultArray.push(element);

      if (element.testResult != null || element.testResult != undefined) {
        if (element.testResult === true) {
          rTestPass++;
        } else {
          rTestFail++;
        }
      } else {
        notperformed++;
      }

    });

    var itemDetail = {};
    $.extend(itemDetail, {
      "rTestPass" : rTestPass,
      "rTestFail" : rTestFail,
      "notperformed" : notperformed
    });

    return itemDetail;

  };

  Validation.mergeProcessResultIntoResult = function() {
    var rTestPass = 0, rTestFail = 0, notperformed = 0;
    processTestArray.forEach(function(element) {
      resultArray.push(element);

      if (element.testResult != null || element.testResult != undefined) {
        if (element.testResult === true) {
          rTestPass++;
        } else {
          rTestFail++;
        }
      } else {
        notperformed++;
      }

    });

    var itemDetail = {};
    $.extend(itemDetail, {
      "rTestPass" : rTestPass,
      "rTestFail" : rTestFail,
      "notperformed" : notperformed
    });

    return itemDetail;

  };

  Validation.mergeAudioRecorderManualTestIntoResult = function() {

    var rTestPass = 0, rTestFail = 0, notperformed = 0;
    audioTestManualArray.forEach(function(element) {
      audioTestArray.push(element);

      if (element.testResult != null || element.testResult != undefined) {
        if (element.testResult === true) {
          rTestPass++;
        } else {
          rTestFail++;
        }
      } else {
        notperformed++;
      }

    });

    var itemDetail = {};
    $.extend(itemDetail, {
      "oTestPass" : rTestPass,
      "oTestFail" : rTestFail,
      "notperformed" : notperformed
    });

    return itemDetail;

  };

  Validation.formulateJsonForReport = function() {

    if (processTestArray.length == 0) {
      populateReportGrid(Object.keys(IRT.ProcessTest), process_section);
      var manualApiDetails = Validation.mergeProcessResultIntoResult();
      Validation.updateManualResultHeaderCount(manualApiDetails,
          IRT.AUTOMATED_TEST_SECTION.browserapi);
    }

    if (capabilityTestArray.length == 0) {
      populateReportGrid(Object.keys(IRT.CapabilityTest), capability_section);
      var manualApiDetails = Validation.mergeCapabilityResultIntoResult();
      Validation.updateManualResultHeaderCount(manualApiDetails,
          IRT.AUTOMATED_TEST_SECTION.browserapi);
    }

    if (ttsManualTestArray.length == 0) {
      populateReportGrid(Object.keys(TTS.Test), ttsmanual_section);
      var manualApiDetails = Validation.mergeTTSResultIntoResult();
      Validation.updateManualResultHeaderCount(manualApiDetails,
          IRT.AUTOMATED_TEST_SECTION.ttsapi);
    }

    if (html5TestArray.length == 0) {
      html5TestArray.push(Validation.setTTSItemDetail('HTML5',
          specExternalTest, null));
    }

    if (css3TestArray.length == 0) {
      css3TestArray.push(Validation.setTTSItemDetail('CSS3', specExternalTest,
          null));
    }

    if (audioTestManualArray.length == 0) {
      populateReportGrid(Object.keys(IRT.RecorderTest), recordermanual_section);
      var manualApiDetails = Validation
          .mergeAudioRecorderManualTestIntoResult();
      Validation.updateManualResultHeaderCount(manualApiDetails,
          IRT.AUTOMATED_TEST_SECTION.audiorecordapi);
    }

    var itemDetail = {};
    $.extend(itemDetail, {
      "externalReportConfig" : {
        "jsGrid" : false,
        "jsTTSGrid" : false,
        "jsHTML5TestGrid" : true,
        "jsCSS3TestGrid" : true,
        "jsAudioRecorderGrid" : false
      },
      "reportGridData" : {
        "jsGrid" : resultArray,
        "jsTTSGrid" : ttsTestArray,
        "jsHTML5TestGrid" : html5TestArray,
        "jsCSS3TestGrid" : css3TestArray,
        "jsAudioRecorderGrid" : audioTestArray
      },
      "headerHTML" : {
        "css3TestHeader" : $('#css3TestHeader').html(),
        "browserAPI" : $('#browserAPI').html(),
        "textToSpeechAPI" : $('#textToSpeechAPI').html(),
        "html5TestHeader" : $('#html5TestHeader').html(),
        "audioAPI" : $('#audioAPI').html()
      },
      "reportInfo" : {
        "name" : $.cookie("name"),
        "organization" : $.cookie("organization"),
        "email" : $.cookie("emailId"),
        "browserInfo" : $.cookie("browserDetails"),
        "optionalScoring" : $.cookie("optionalScoring"),
        "specInfo" : "Legacy"
      },
      "version" : $.cookie("version")
    });

    return itemDetail;
  };

  Validation.updateManualResultHeaderCount = function(manualApiDetails,
      irtTestSectionObj) {

    irtTestSectionObj.notperformed = irtTestSectionObj.notperformed
        + manualApiDetails.notperformed;

    if (manualApiDetails.rTestPass != undefined
        && manualApiDetails.rTestFail != undefined) {
      irtTestSectionObj.rTotalTest = irtTestSectionObj.rTotalTest
          + manualApiDetails.rTestPass + manualApiDetails.rTestFail
          + manualApiDetails.notperformed;

      irtTestSectionObj.rTestPass = irtTestSectionObj.rTestPass
          + manualApiDetails.rTestPass;

      irtTestSectionObj.rTestFail = irtTestSectionObj.rTestFail
          + manualApiDetails.rTestFail;
      $('#' + irtTestSectionObj.headerId + ' #rPassCount').html(
          irtTestSectionObj.rTestPass + '/' + irtTestSectionObj.rTotalTest);
      $('#' + irtTestSectionObj.headerId + ' #rFailCount').html(
          irtTestSectionObj.rTestFail + '/' + irtTestSectionObj.rTotalTest);
      $('#' + irtTestSectionObj.headerId + ' #tNotPerformed').html(
          irtTestSectionObj.notperformed + '/' + irtTestSectionObj.rTotalTest);

    } else if (manualApiDetails.oTestPass != undefined
        && manualApiDetails.oTestFail != undefined) {
      irtTestSectionObj.oTotalTest = irtTestSectionObj.oTotalTest
          + manualApiDetails.oTestPass + manualApiDetails.oTestFail
          + manualApiDetails.notperformed;

      irtTestSectionObj.oTestPass = irtTestSectionObj.oTestPass
          + manualApiDetails.oTestPass;

      irtTestSectionObj.oTestFail = irtTestSectionObj.oTestFail
          + manualApiDetails.oTestFail;

      $('#' + irtTestSectionObj.headerId + ' #oPassCount').html(
          irtTestSectionObj.oTestPass + '/' + irtTestSectionObj.oTotalTest);
      $('#' + irtTestSectionObj.headerId + ' #oFailCount').html(
          irtTestSectionObj.oTestFail + '/' + irtTestSectionObj.oTotalTest);
      $('#' + irtTestSectionObj.headerId + ' #tNotPerformed').html(
          irtTestSectionObj.notperformed + '/' + irtTestSectionObj.oTotalTest);

    }

    var percent = 0;
    if ((irtTestSectionObj.rTotalTest + irtTestSectionObj.oTotalTest) > 0) {

      var optionalScoringFlag = $.cookie("optionalScoring");

      var totalPassedTest = 0;
      var totalTest = 0;
      if (optionalScoringFlag === 'Yes') {
        totalPassedTest = irtTestSectionObj.rTestPass
            + irtTestSectionObj.oTestPass;
        totalTest = irtTestSectionObj.rTotalTest + irtTestSectionObj.oTotalTest;
      } else {
        totalPassedTest = irtTestSectionObj.rTestPass;
        totalTest = irtTestSectionObj.rTotalTest;
      }

      if (totalTest > 0) {
        percent = Math.round(100 * totalPassedTest / totalTest);
      }
    }

    $('#' + irtTestSectionObj.headerId + ' #sectionScore').html(
        '[Score: <strong>' + percent + '%</strong>]');

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

  Validation.getAudioTestArray = function() {
    return audioTestArray;
  };

  Validation.getAudioTestManualArray = function() {
    return audioTestManualArray;
  };

  Util.Validation = Validation;

})(Util);
