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

TTS.Manager.init(true);
var ttsImpl = TTS.Manager._service;

var isIOSDevice = Util.Browser.isIOS();
var isAndroidDevice = Util.Browser.isAndroid();
var isFireFox = Util.Browser.isFirefox();
var isChrome = Util.Browser.isChrome();
var isMobile = Util.Browser.isMobile();
var isCertified = Util.Browser.isCertified();
var isAIRSecureBrowser = Util.Browser.isSecure();

function beginBrowserAPITest() {

  if (impl) {

    irp.testspec.browserapi.forEach(function(element) {
      eval(element);
    });

    if (ttsImpl != null) {

      irp.testspec.ttsapi.forEach(function(element) {
        eval(element);
      });

    }
  } else {
    console.log('No Implementation found for Secure Browser');
  }

  /*
   * alert('browserAPI ' + Util.Validation.getResultScore());
   * alert('textToSpeechAPI ' + Util.Validation.getTTSResultScore());
   */
  // textToSpeechAPI
  populateResults($("#jsGrid"), Util.Validation.getResult(), false);
  populateResults($("#jsTTSGrid"), Util.Validation.getTTSResult(), false);
}

function getMethods(obj) {
  var result = [];
  for ( var method in obj) {
    result.push(method)

  }
  return result;
}

function closeBrowser() {

  impl.close(false);
}

function populateResults(id, gridData, extTest) {
  var extCss = '';
  var showCSS = 'irp-grid-column-wrap';
  var detailTitle = 'Details';
  var detailWidth = 150;
  var testNameWidth = 150;
  var detailAlign = "left";

  if (extTest === true) {
    extCss = 'irp-grid-column-hide';
    detailTitle = 'Score';
    detailWidth = 50;
    testNameWidth = 100;
    detailAlign = "center";
  }
  id
      .jsGrid({
        width : "100%",
        data : gridData,
        fields : [
            {
              title : "Test Name",
              name : "testName",
              type : "text",
              width : testNameWidth,
              css : showCSS
            },
            {
              title : "Test API",
              name : "testApi",
              type : "text",
              width : 150,
              css : showCSS + ' ' + extCss
            },
            {
              title : "Result",
              name : "testResult",
              type : "text",
              width : 45,
              align : "center",
              css : showCSS,

              itemTemplate : function(value) {

                if (value == null) {
                  return "";
                } else if (value === true) {
                  return '<img alt="passed" src="../../../Shared/images/passed.jpg" height="30px" width="40px">';
                } else if (value === false) {
                  return '<img alt="failed" src="../../../Shared/images/failed.jpg" height="30px" width="40px">';
                } else {
                  return value;
                }

              }

            }, {
              title : detailTitle,
              name : "details",
              type : "text",
              align : detailAlign,
              width : detailWidth,
              css : showCSS,
              itemTemplate : function(value) {
                if (value == null) {
                  return "Not Available";
                } else {
                  return value;
                }

              }
            }, {
              title : 'Points',
              name : "testPoints",
              type : 'number',
              width : 15,
              css : 'irp-grid-column-hide'
            } ]
      });

}