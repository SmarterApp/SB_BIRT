// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************

TDS.SecureBrowser.initialize();
var impl = TDS.SecureBrowser.getImplementation();
var implBrowserType = TDS.SecureBrowser.getBrowserType();
var runtime = (impl != null && !!impl.getRuntime) ? impl.getRunTime() : null;
TTS.Manager.init(true);
var ttsImpl = TTS.Manager._service;

var ttsBrowserType = TTS.Manager.browserType;

var isIOSDevice = Util.Browser.isIOS();
var isAndroidDevice = Util.Browser.isAndroid();
var isFireFox = Util.Browser.isFirefox();
var isChrome = Util.Browser.isChrome();
var isMobile = Util.Browser.isMobile();
var isCertified = Util.Browser.isCertified();
var isAIRSecureBrowser = Util.Browser.isSecure();

var webAudioBrowserType = TDS.SecureBrowser.getWebAudioBrowserType();

var recorderImpl = TDS.SecureBrowser.getRecorderImplementation();

if (Util.Browser.isWebAudioApiSupported()) {
  var audioCtx = recorderImpl.getAudioContextObject();
}

function beginBrowserAPITest() {

  Object.keys(IRT.AUTOMATED_TEST_SECTION).forEach(
      function(element) {

        /**
         * JSON Key from irtspec.js for API Section Automation Test
         */
        var apiJSONKey = irtApiSpecConstant + specSeparator + element;

        /**
         * JSON object from irtspec.js
         */
        var apiJSONObj = eval(apiJSONKey);

        var sectionJSONObj = eval('IRT.AUTOMATED_TEST_SECTION.' + element);

        var apiSupportType = eval(sectionJSONObj.browserType);
        var apiSection = sectionJSONObj.section;

        /**
         * running configured test in irtspec.js based on apiJSONKey and
         * apisection
         */

        runIRTAutomateTest(apiJSONObj, apiJSONKey, runtime, apiSupportType,
            apiSection, sectionJSONObj, populateSectionCount);

      });

  populateResults($("#jsGrid"), Util.Validation.getResult(), false);
  populateManualMacAddressColumn();
  populateResults($("#jsTTSGrid"), Util.Validation.getTTSResult(), false);
  populateResults($("#jsAudioRecorderGrid"), Util.Validation
      .getAudioTestArray(), false);
}

function populateManualMacAddressColumn() {
  var rowData = $('#jsGrid').data('JSGrid').data[2];
  var newData = $('#jsGrid').data('JSGrid').data[2];
  if (Util.Browser.isSecureBrowser()) {
    var getMacAddressInterval = setInterval(function() {
      if (IRT.ApiSpecs.browserapi.checkMACAddressAPI.details != undefined) {
        newData.details = IRT.ApiSpecs.browserapi.checkMACAddressAPI.details;
        $('#jsGrid').jsGrid("updateItem", rowData, newData);
        clearInterval(getMacAddressInterval);
      }
    }, 1000);
  }
}

function closeBrowser() {

  impl.close(false);
}

function clearBrowserCache() {

  impl.clearCache();
}

/**
 * 
 * @param irtSpecApiObj :
 *          JSON Object from irtspec like browserapi or ttsapi
 * @param irtSpecApiJsonKey :
 *          JSON Key from irtspec related to irtSpecApiObj
 * @param runtime :
 *          runtime object in case of securebrowser or AIR mobile browser
 * @param testBrowserType :
 *          Browser Type to identified whether it is certified/securebrowser or
 *          mobile securebrowser
 * @param section :
 *          Grid section for report like browser api or tts api
 * 
 */
function runIRTAutomateTest(irtSpecApiObj, irtSpecApiJsonKey, runtime,
    testBrowserType, section, sectionObj, callback) {

  // Required test passed initial count/
  var rTestPass = 0;

  // Required test fail initial count/
  var rTestFail = 0;

  // Optional test passed initial count
  var oTestPass = 0;

  // Optional test fail initial count
  var oTestFail = 0;

  // Total # of Test performed and displayed on Grid results
  var totalTest = 0;

  Object.keys(irtSpecApiObj).forEach(
      function(element) {

        var isDeprecated = false;
        try {
          /*
           * key to get for element under irtSpecApiObj for e.g
           * IRT.ApiSpecs.browserapi.checkGlobalObject
           */
          var elementKey = irtSpecApiJsonKey + specSeparator + element
              + specSeparator;

          /**
           * Load test key to get api signature using elementKey and test
           * testBrowserType for e.g.
           * IRT.ApiSpecs.browserapi.checkGlobalObject.testApi_certified
           */
          var testApiJsonKey = elementKey + 'testApi_' + testBrowserType;
          var result = false;
          var details = "";

          /**
           * get Deprecated jsonKey value it will return either true/false
           */
          isDeprecated = eval(elementKey + "isDeprecated");

          /**
           * apiType to test for Object, function or boolean
           */
          var irtSpecApiArray = eval(elementKey + "apiType");

          /**
           * Object to identify whether this API check is required in all
           * platform
           */
          var isRequiredAll = eval(elementKey + "required.all");
          var testForOS = true;
          var isRequiredForOS = false;
          if (isRequiredAll == null || isRequiredAll == undefined) {
            testForOS = false;
            Object.keys(eval(elementKey + "required")).forEach(
                function(osKey) {

                  if (osKey == 'macOS'
                      && eval(elementKey + "required." + osKey) == true
                      && Util.Browser.isMac()) {
                    testForOS = true;
                    isRequiredForOS = true;
                  }

                  if (osKey == 'windows'
                      && eval(elementKey + "required." + osKey) == true
                      && Util.Browser.isWindows()) {
                    testForOS = true;
                    isRequiredForOS = true;
                  }

                });
          }

          /**
           * manualData key to populate other info in details column
           */
          var irtSpecManualData = eval(elementKey + "manualData");

          /**
           * Load actual api method value from testApiJsonKey for e.g.
           * "window.browser"
           */
          var actualTestApiMethod = eval(testApiJsonKey);

          if (irtSpecApiArray != null && Array.isArray(irtSpecApiArray)) {
            irtSpecApiArray.forEach(function(irtSpecApiType) {
              details = '';
              if (irtSpecApiType == "object") {
                if (typeof eval(actualTestApiMethod) === 'object') {
                  result = true;
                } else {
                  details = actualTestApiMethod + ' is not defined';
                }
              } else if (irtSpecApiType == "boolean") {
                if (typeof eval(actualTestApiMethod) === 'boolean') {
                  result = true;
                }
              } else {
                if (!!eval(actualTestApiMethod)) {
                  result = true;
                }
              }

            });
          }

          if (irtSpecApiArray == null
              || (irtSpecApiArray != null && !Array.isArray(irtSpecApiArray))) {
            if (!!eval(actualTestApiMethod)) {
              result = true;
            }
          }

          if (irtSpecManualData !== undefined && irtSpecManualData) {

            var apiManualData = "";
            if (element == "checkMACAddressAPI") {
              if (Util.Browser.isSecureBrowser()) {
                actualTestApiMethod = actualTestApiMethod
                    + '(macAddressCallBack)';
                eval(actualTestApiMethod);
              }
            }
            if (element == "checkspacesenabled") {

              apiManualData = eval(actualTestApiMethod);

              details = "Spaces Enabled : " + apiManualData.toString();

            } else {
              details = eval(actualTestApiMethod);

            }
          }

          if (isDeprecated && result) {
            result = false;
            details = 'testApi_exists';
          }

          if (isDeprecated && !result) {
            result = true;
            details = 'testApi_removed';
          }

        } catch (ex) {
          if (isDeprecated) {
            result = true;
            details = 'testApi_removed';
          } else {
            result = false;
            details = ex.message;
          }
        }

        if (testForOS == true) {
          if (isRequiredAll === true || isRequiredForOS === true) {
            if (result) {
              rTestPass++;
            } else {
              rTestFail++;
            }
          } else {
            if (result) {
              oTestPass++;
            } else {
              oTestFail++;
            }
          }

          totalTest++;

          Util.Validation.setIRTTestResults(element, testBrowserType, result,
              details, section);
        }

      });

  sectionObj.totalTest = totalTest;
  sectionObj.rTestPass = rTestPass;
  sectionObj.rTestFail = rTestFail;
  sectionObj.oTestPass = oTestPass;
  sectionObj.oTestFail = oTestFail;
  sectionObj.rTotalTest = rTestPass + rTestFail;
  sectionObj.oTotalTest = oTestPass + oTestFail;

  var percent = 0;

  if ((sectionObj.rTotalTest + sectionObj.oTotalTest) > 0) {
    var optionalScoringFlag = $.cookie("optionalScoring");

    var totalPassedTest = 0;
    var totalTest = 0;
    if (optionalScoringFlag === 'Yes') {
      totalPassedTest = sectionObj.rTestPass + sectionObj.oTestPass;
      totalTest = sectionObj.rTotalTest + sectionObj.oTotalTest;
    } else {
      totalPassedTest = sectionObj.rTestPass;
      totalTest = sectionObj.rTotalTest;
    }

    if (totalTest > 0) {
      percent = Math.round(100 * totalPassedTest / totalTest);
    }
  }

  $('#' + sectionObj.headerId + ' #sectionScore').html(
      '[Score: <strong>' + percent + '%</strong>]')

  callback($('#' + sectionObj.headerId), rTestPass, rTestFail, oTestPass,
      oTestFail, totalTest);
}