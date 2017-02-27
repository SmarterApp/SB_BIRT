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
var runtime = impl.getRunTime();
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

function beginBrowserAPITest() {

  if (impl != null && impl != undefined) {

    /**
     * browserapi JSON Key from irpspec.js for Browser API Section Automation
     * Test
     */
    var browserApiJsonKey = irpApiSpecConstant + specSeparator + specBrowserapi;

    /**
     * browserapi JSON object from irpspec.js
     */
    var irpSpecBrowserApiObj = eval(browserApiJsonKey);

    /**
     * running browserapi configured test in irpspec.js
     */
    runIRPAutomateTest(irpSpecBrowserApiObj, browserApiJsonKey, runtime,
        implBrowserType, null);

    /**
     * ttsapi JSON Key from irpspec.js for Text-to-speech Section Automation
     * Test
     */
    var ttsApiJsonKey = irpApiSpecConstant + specSeparator + specTTSApi;
    /**
     * ttsapi JSON object from irpspec.js
     */
    var irpSpecTTSApiObj = eval(ttsApiJsonKey);

    /**
     * running ttsapi configured test in irpspec.js
     */
    runIRPAutomateTest(irpSpecTTSApiObj, ttsApiJsonKey, runtime,
        ttsBrowserType, tts_section);

  } else {
    console.log('No Implementation found for Secure Browser');
  }

  populateResults($("#jsGrid"), Util.Validation.getResult(), false);
  populateResults($("#jsTTSGrid"), Util.Validation.getTTSResult(), false);
}

function closeBrowser() {

  impl.close(false);
}

/**
 * 
 * @param irpSpecApiObj :
 *          JSON Object from irpspec like browserapi or ttsapi
 * @param irpSpecApiJsonKey :
 *          JSON Key from irpspec related to irpSpecApiObj
 * @param runtime :
 *          runtime object in case of securebrowser or AIR mobile browser
 * @param testBrowserType :
 *          Browser Type to identified whether it is certified/securebrowser or
 *          mobile securebrowser
 * @param section :
 *          Grid section for report like browser api or tts api
 * 
 */
function runIRPAutomateTest(irpSpecApiObj, irpSpecApiJsonKey, runtime,
    testBrowserType, section) {

  Object.keys(irpSpecApiObj).forEach(
      function(element) {

        var isDeprecated = false;
        try {
          /*
           * key to get for element under irpSpecApiObj for e.g
           * IRT.ApiSpecs.browserapi.checkGlobalObject
           */
          var elementKey = irpSpecApiJsonKey + specSeparator + element
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

          if (isDeprecated) {
            result = true;
            details = 'testApi_removed';
          }

          /**
           * apiType to test for Object, function or boolean
           */
          var irpSpecApiArray = eval(elementKey + "apiType");

          /**
           * manualData key to populate other info in details column
           */
          var irpSpecManualData = eval(elementKey + "manualData");

          /**
           * Load actual api method value from testApiJsonKey for e.g.
           * "window.browser"
           */
          var actualTestApiMethod = eval(testApiJsonKey);

          irpSpecApiArray.forEach(function(irpSpecApiType) {

            if (irpSpecApiType == "object") {
              if (typeof eval(actualTestApiMethod) === 'object') {
                result = true;
              } else {
                details = actualTestApiMethod + ' is not defined';
              }
            } else if (irpSpecApiType == "boolean") {
              if (typeof eval(actualTestApiMethod) === 'boolean') {
                result = true;
              }
            } else {
              if (!!eval(actualTestApiMethod)) {
                result = true;
              }
            }

          });

          if (irpSpecManualData !== undefined && irpSpecManualData) {

            var apiManualData = "";
            if (element == "checkMACAddressAPI") {
              actualTestApiMethod = actualTestApiMethod + '()';
              apiManualData = eval(actualTestApiMethod);
              if (!Util.Validation.isMacAddressValid(apiManualData)) {
                details = 'Invalid MAC Address : ' + apiManualData;
              } else {
                details = 'MAC Address : ' + apiManualData;
              }
            } else {
              details = eval(actualTestApiMethod);
            }
          }

          if (isDeprecated && result) {
            result = false;
            details = 'testApi_exists';
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

        Util.Validation.setIRPTestResults(element, testBrowserType, result,
            details, section);

      });
}