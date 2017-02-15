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
    impl.checkGlobalObject();

    /** SEC-25 : API: Retrieve device details (R) * */
    impl.checkDeviceInfo();

    /** SEC-27 : API: get system MAC address(es) (O) * */
    impl.checkMACAddressAPI();

    /** SEC-28 : API: Retrieve client IP address(es) (O) * */
    impl.checkIPAddressAPI();

    /** SEC-29 : API: Get application start time (O). * */
    impl.checkAppStartTimeAPI();

    /** SEC-32 : API: Clear Cache (R) * */
    impl.checkClearCacheAPI();

    /** SEC-26 : API: empty clipboard (O) * */
    impl.checkEmptyClipBoardAPI();

    /** SEC-33 : API: Clear Cookies (R) * */
    impl.checkClearCookiesAPI();

    /** SEC-34 : API: Get Process List (R) * */
    impl.checkGetProcessListAPI();

    /** SEC-35 : API: Close Secure Browser (R)* */
    impl.checkCloseAPI();

    /** SEC-31 : API: Check if environment is secure (R) * */
    impl.checkIsEnvironmentSecureAPI();

    /** SEC-30 : API: Enable Lock Down (R)* */
    impl.checkEnableLockDownAPI();

    /** SEC-57 : API: Get/Set System Volume (R) * */
    impl.checkSystemVolumeAPI();

    /** SEC-56 : API: System Mute/Unmute/IsMuted (R) * */
    impl.checkSystemMuteAPI();

    /** SEC-10 : API Check examineProcessList * */
    impl.checkExamineProcessList();

    /** SEC-75 :Retrieve List of Features and their status * */
    impl.checkGetFeatureAPI();

    /** SEC-76 : Get Capability of browser based on input string * */
    impl.checkGetCapabilityAPI();

    /** SEC-77 : Set Capability of browser * */
    impl.checkSetCapabilityAPI();

    if (ttsImpl != null) {

      /** SEC-36 API : TTS Speak (R) * */
      ttsImpl.checkTTSSpeakAPI();

      /** SEC-40 API : TTS Pause (R) * */
      ttsImpl.checkTTSPauseAPI();

      /** SEC-41 API : TTS Resume (R) * */
      ttsImpl.checkTTSResumeAPI();

      /** SEC-37 : API: TTS Stop (R) */
      ttsImpl.checkTTSStopAPI();

      /** SEC-52 API: Get TTS volume (R) and SEC-53 API: Set TTS volume (R)* */
      ttsImpl.checkTTSVolumeAPI();

      /** SEC-50 : API: Set TTS pitch (R) * */
      ttsImpl.checkTTSPitchAPI();

      /** SEC-51 API: Set TTS rate (R) * */
      ttsImpl.checkTTSRateAPI();

      /** SEC-38 : API: Get TTS Status (R) * */
      ttsImpl.checkTTSStatusAPI();

      /** SEC-39 : API: Get Voices for TTS (R) * */
      ttsImpl.checkTTSVoicesAPI();

      ttsImpl.checkTTSVoiceNameAPI();
    }
  } else {
    console.log('No Implementation found for Secure Browser');
  }

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
              css : showCSS + extCss
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
            }

        ]
      });

  // $("#dialogTTS").dialog("option", "title", "Test TTS").dialog("open");

}