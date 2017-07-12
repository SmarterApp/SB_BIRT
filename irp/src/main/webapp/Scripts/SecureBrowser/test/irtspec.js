// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
var IRT = {};

var certified = "certified";
var securebrowser = "SB";
var mobile = "mobile";
var webspeech = "webspeech";
var webaudio = "webaudio";

/**
 * Below variables serve as constants to access the JSON Object for automated
 * and manual testing
 * 
 * @irtApiSpecConstant : Global level object created under IRT to get all API
 *                     specification JSON
 * @specMessage : Message object to access global messages to display on UI
 * @specDisableUI : Object to access UI component id to disable on manual test
 *                completion
 * @specTTSApi : TTS API section for automated testing
 * @specTTSManualApi : TTS manual API instruction and other info for TTS manual
 *                   testing
 * @specBrowserapi : Browser API section for automated testing
 * @specCapabilityManualApi : Get/Set Capability manual API instructions and
 *                          other info for Get/Set Capability manual testing
 * @specProcessManualApi : Examine Process list manual API instructions and
 *                       other info for Examine Process List manual testing
 * @specSeparator : JSON object separator which is always "." to access insider
 *                variables and keys
 * @tts_section : Section variable to define TTS automated testing
 * @ttsmanual_section : Section variable to define TTS manual testing
 * @capability_section : Section variable to define Get/Set Capability manual
 *                     testing
 * @process_section : Section variable to define Examine Process List manual
 *                  testing
 */
var irtApiSpecConstant = 'IRT.ApiSpecs';
var specMessage = "message";
var specDisableUI = "disableUI";
var specTTSApi = "ttsapi";
var specTTSManualApi = "ttsmanualapi";
var specBrowserapi = "browserapi";
var specAudioRecorderApi = "audiorecordapi";
var specCapabilityManualApi = "capabilityManualAPI";
var specProcessManualApi = "processManualAPI";
var specExternalTest = "externalTest";
var specSeparator = ".";

var specRecorderManualApi = "recordermanualapi";

var tts_section = 'TTS';
var ttsmanual_section = 'TTS_MANUAL';
var capability_section = 'CAPABILITY_MANUAL';
var process_section = 'PROCESS_MANUAL';
var recorder_section = 'RECORDER';
var recordermanual_section = 'RECORDER_MANUAL';

IRT.MAX_RECORDER_SECONDS = 120;

/**
 * Manual test's to run for get/set capability
 */
IRT.RecorderTest = {
  INITIATE : 'INITIATE',
  STATUS : 'STATUS',
  CAPABILITY : 'CAPABILITY',
  START_RECORD : 'START_RECORD',
  STOP_RECORD : 'STOP_RECORD',
  PLAY : 'PLAY',
  PAUSE : 'PAUSE',
  RESUME : 'RESUME',
  STOP : 'STOP',
  UNKNOWN : 'UNKNOWN' // unknown status
};

IRT.BrowserSpecPath = {

  "Legacy" : "http://www.smarterapp.org/documents/SecureBrowserRequirementsSpecifications_0-3.pdf",
  "New" : "https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserAPIspecification.md"
};

/**
 * Manual test's to run for get/set capability
 */
IRT.CapabilityTest = {
  SET : 'SET',
  GET : 'GET',
  UNKNOWN : 'UNKNOWN' // unknown status
};

/**
 * Manual test to run for examine process list
 */
IRT.ProcessTest = {
  EXAMINE : 'EXAMINE',
  UNKNOWN : 'UNKNOWN' // unknown status
};

/**
 * Get/Set Capability pre-defined properties for manual testing
 */
IRT.CAPABILITY_PROPERTY = {
  Printing : 'printing',
  ScreenCapture : 'screenCapture'
};

/**
 * UI Section for automate testing, also it matches with api definition section
 * under IRT.ApiSpecs
 */
IRT.AUTOMATED_TEST_SECTION = {

  "browserapi" : {
    /**
     * implBrowserType is the variable defined in index.js which will provide
     * browserType value based on factory.js *
     */
    "text" : "Browser API",
    "headerId" : "browserAPI",
    "browserType" : "implBrowserType",
    "section" : null,
    "totalTest" : 0,
    "rTestPass" : 0,
    "rTestFail" : 0,
    "oTestPass" : 0,
    "oTestFail" : 0,
    "notperformed" : 0,
    "rTotalTest" : 0,
    "oTotalTest" : 0

  },
  "ttsapi" : {
    /**
     * ttsBrowserType is the variable defined in index.js which will provide
     * browserType value based on text-to-speech support for browser *
     */
    "text" : "Text-to-speech (TTS)",
    "headerId" : "textToSpeechAPI",
    "browserType" : "ttsBrowserType",
    "section" : tts_section,
    "totalTest" : 0,
    "rTestPass" : 0,
    "rTestFail" : 0,
    "oTestPass" : 0,
    "oTestFail" : 0,
    "notperformed" : 0,
    "rTotalTest" : 0,
    "oTotalTest" : 0

  },
  "audiorecordapi" : {

    /**
     * webAudioBrowserType is the variable defined in index.js which will
     * provide browserType value based on WebAudioAPI support for browser *
     */
    "text" : "Audio Recorder",
    "headerId" : "audioAPI",
    "browserType" : "webAudioBrowserType",
    "section" : recorder_section,
    "totalTest" : 0,
    "rTestPass" : 0,
    "rTestFail" : 0,
    "oTestPass" : 0,
    "oTestFail" : 0,
    "notperformed" : 0,
    "rTotalTest" : 0,
    "oTotalTest" : 0
  }
};

/**
 * Comments
 * 
 * @F : F# indicates functional requirement number
 * @R : R# indicates Requirement # from SecureBrowserAPIspecification.md
 * @SEC : SEC-# indicates internal JIRA number
 * 
 */
IRT.ApiSpecs = {
  "message" : {
    "testApi_removed" : "As per specification, this API has been removed",
    "testApi_exists" : "This deprecated API still exists",
    "errorDialog_TTS" : "Your browser does not support TTS, so manual testing will be skipped.",
    "errorDialog_CAPABILITY" : "Your browser does not support GET/SET Capability, so manual testing will be skipped.",
    "errorDialog_PROCESS" : "Your browser does not support Examine Process List, so manual testing will be skipped.",
    "errorDialog_saveSuccess" : "Your test results have been saved successfully. Please record your report ID shown below, for future access:",
    "errorDialog_saveFailure" : "System was unable to save test results.",
    "errorDialog_report_not_found" : "No report found for the requested report ID:",
    "errorDialog_RECORDER" : "Your browser does not support Audio Recorder, so manual testing will be skipped"
  },
  "disableUI" : {
    "TTS_disable_all" : [ "PLAY", "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
        "RATE", "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
    "CAPABILITY_disable_all" : [ "setCapability", "enableCapability",
        "disableCapability", "getCapability", "capabilityType" ],
    "PROCESS_disable_all" : [ "examineProcess", "conclude" ],
    "RECORDER_disable_all" : [ "initiateRecording", "getRecordingStatus",
        "getRecordingCapabilities", "startRecording", "stopRecording",
        "startPlaybackRecording", "pausePlaybackRecording",
        "resumePlaybackRecording", "stopPlaybackRecording",
        "concludeCapability", "audioOutput", "audioSource" ]
  },
  "browserapi" : {
    // F35. The secure browser shall check for an appropriate Global Object for
    // API use. R01 SEC-1
    "checkGlobalObject" : {
      "id" : "1",
      "testName" : "Browser global object check",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "object" ],
      "isDeprecated" : false
    },
    "checkDeviceInfo" : {
      // F36. The secure browser may be able to get device info (optional). R05
      // SEC-25
      "id" : "2",
      "testName" : "Retrieve device details",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.getDeviceInfo",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.security.getDeviceInfo(function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.security.getDeviceInfo()",
            "SecureBrowser.security.getDeviceInfo(false)",
            "SecureBrowser.security.getDeviceInfo('somestring')",
            "SecureBrowser.security.getDeviceInfo(null)" ]
      }
    },
    "checkMACAddressAPI" : {
      // F04. The secure browser shall provide a means to retrieve system MAC
      // address. R40 SEC-27
      "id" : "3",
      "testName" : "Retrieve system MAC address(es)",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.getMACAddress",
      "points" : "1",
      "required" : {

        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "manualData" : true,
      "regTest" : {
        "validTest" : [ "SecureBrowser.security.getMACAddress(function callback(response){console.log(response);})" ],
        "inValidTest" : [ /* "SecureBrowser.security.getMACAddress()", */
        "SecureBrowser.security.getMACAddress(false)",
            "SecureBrowser.security.getMACAddress('somestring')",
            "SecureBrowser.security.getMACAddress(null)" ]
      }
    },
    "checkIPAddressAPI" : {
      // F05. The secure browser shall NOT provide a means to retrieve the
      // system IP address(es). R22 SEC-28
      "id" : "4",
      "testName" : "Retrieve system IP address(es)",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.getIPAddressList",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : true
    },
    "checkAppStartTimeAPI" : {
      // F07. The secure browser shall provide a means to obtain the application
      // start time. R24 SEC-29, SEC-59
      "id" : "5",
      "testName" : "Get application start time",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.settings.appStartTime",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "manualData" : true,
      "regTest" : {
        "validTest" : [ "SecureBrowser.settings.appStartTime" ],
        "inValidTest" : [
            "SecureBrowser.settings.appStartTime(function callback(response){console.log(response);})",
            "SecureBrowser.settings.appStartTime(false)",
            "SecureBrowser.settings.appStartTime('somestring')",
            "SecureBrowser.settings.appStartTime(null)" ]
      }
    },
    "checkClearCacheAPI" : {
      // F01. The Secure browser shall NOT provide a means to clear browser
      // cache. R22 SEC-32
      "id" : "6",
      "testName" : "Clear cache",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.clearCache",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : true
    },
    "checkEmptyClipBoardAPI" : {
      // F03. The secure browser shall provide a means to clear system
      // clipboard. R23 SEC-26
      "id" : "7",
      "testName" : "Empty Clipboard",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.emptyClipBoard",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.security.emptyClipBoard()" ],
        "inValidTest" : [
        // "SecureBrowser.security.emptyClipBoard(function
        // callback(response){console.log(response);})",
        // "SecureBrowser.security.emptyClipBoard(false)",
        // "SecureBrowser.security.emptyClipBoard('somestring')",
        // "SecureBrowser.security.emptyClipBoard(null)"
        ]
      }
    },
    "checkClearCookiesAPI" : {
      // F02. The secure browser shall NOT provide a means to clear browser
      // cookies. R22 SEC-33
      "id" : "8",
      "testName" : "Clear Cookies",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.clearCookies",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : true
    },
    "checkGetProcessListAPI" : {
      // F06. The secure browser shall NOT provide a means to retrieve the
      // current list of running processes, their PIDs and their PPIDs. R06
      // SEC-10, SEC-62
      "id" : "9",
      "testName" : "Get Process List",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.getProcessList",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : true
    },
    "checkCloseAPI" : {
      // F14. The secure browser shall provide a means to close the browser. R07
      // SEC-35
      "id" : "10",
      "testName" : "Close browser",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.close",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkIsEnvironmentSecureAPI" : {
      // F38. The secure browser shall be able to check if environment is secure
      // for testing. R03 SEC-31
      "id" : "11",
      "testName" : "Is Environment Secure",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.isEnvironmentSecure",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.security.isEnvironmentSecure(function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.security.isEnvironmentSecure(false)",
            "SecureBrowser.security.isEnvironmentSecure('somestring')",
            "SecureBrowser.security.isEnvironmentSecure(null)" ]
      }
    },
    "checkEnableLockDownAPI" : {
      // F37. The secure browser shall be able to lock down the environment. R02
      // SEC-30
      "id" : "12",
      "testName" : "Enable Lockdown",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.lockDown",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    /*
     * , "regTest" : { "validTest" : [
     * "SecureBrowser.security.lockDown(false,function
     * callbackSuccess(response){console.log(response);},function
     * callback(response){console.log(response);})",
     * "SecureBrowser.security.lockDown(true,function
     * callbackSuccess(response){console.log(response);},function
     * callback(response){console.log(response);})" ], "inValidTest" : [
     * "SecureBrowser.security.lockDown()",
     * "SecureBrowser.security.lockDown('somestring',false,'somestring')",
     * "SecureBrowser.security.lockDown(null,'somestring','somestring','somestring')",
     * "SecureBrowser.security.lockDown(true,null,null)",
     * "SecureBrowser.security.lockDown(null,null,null)" ] }
     */
    },
    "checkSystemVolumeAPI" : {
      // F09. The secure browser shall provide a means to get system volume.
      // F10. The secure browser shall provide a means to set system volume. R16
      // SEC-57, SEC-58
      "id" : "13",
      "testName" : "Get/Set System Volume",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.settings.systemVolume",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.settings.systemVolume" ],
        "inValidTest" : [
            "SecureBrowser.settings.systemVolume(function callback(response){console.log(response);})",
            "SecureBrowser.settings.systemVolume(false)",
            "SecureBrowser.settings.systemVolume('somestring')",
            "SecureBrowser.settings.systemVolume(null)" ]
      }
    },
    "checkSystemMuteAPI" : {
      // F11. The secure browser shall provide a means to mute system volume.
      // F12. The secure browser shall provide a means to unmute system volume.
      // F13. The secure browser shall provide a means to check if system volume
      // is Muted.R19, R20, R21 SEC-56, SEC-58
      "id" : "14",
      "testName" : "Mute/Unmute/IsMuted System Volume",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.settings.systemMute",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "boolean" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.settings.systemMute" ],
        "inValidTest" : [
            "SecureBrowser.settings.systemMute(function callback(response){console.log(response);})",
            "SecureBrowser.settings.systemMute(false)",
            "SecureBrowser.settings.systemMute('somestring')",
            "SecureBrowser.settings.systemMute(null)" ]
      }
    },
    "checkExamineProcessList" : {
      // F31. The secure browser shall be able to determine whether blacklisted
      // processes are running on the client machine. R06 SEC-10, SEC-62
      "id" : "15",
      "testName" : "Examine Process List",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.examineProcessList",
      "points" : "1",
      "required" : {

        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.security.examineProcessList( ['a','b','c'] , function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.security.examineProcessList()",
            "SecureBrowser.security.examineProcessList(false,null)",
            "SecureBrowser.security.examineProcessList('somestring',null)",
            "SecureBrowser.security.examineProcessList(null,null)",
            "SecureBrowser.security.examineProcessList(null,null,null)" ]
      }
    },
    "checkGetCapabilityAPI" : {
      // F46. The secure browser shall be able to get the status of a particular
      // browser capability. R41 SEC-76, SEC-81
      "id" : "16",
      "testName" : "Get Capability",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.getCapability",
      "points" : "1",
      "required" : {

        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.security.getCapability('someString')",
            "SecureBrowser.security.getCapability(null)",
            "SecureBrowser.security.getCapability(false)" ],
        "inValidTest" : [ "SecureBrowser.security.getCapability()" ]
      }
    },
    "checkSetCapabilityAPI" : {
      // F47. The secure browser shall be able to set the status of a particular
      // browser capability. R42 SEC-77, SEC-81
      "id" : "17",
      "testName" : "Set Capability",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.setCapability",
      "points" : "1",
      "required" : {

        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [
            "SecureBrowser.security.setCapability('somestring','somestring',function callbackSuccess(response){console.log(response);},function callback(response){console.log(response);})",
            "SecureBrowser.security.setCapability('somestring',null,function callbackSuccess(response){console.log(response);},function callback(response){console.log(response);})",
            "SecureBrowser.security.setCapability('somestring',true,function callbackSuccess(response){console.log(response);},function callback(response){console.log(response);})",
            "SecureBrowser.security.setCapability('somestringbiggerstringvalueisreallylargetestingforenhancementtesting','somestringbiggerstringvalueisreallylargetestingforenhancementtesting',function callbackSuccess(response){console.log(response);},function callback(response){console.log(response);})" ],
        "inValidTest" : [
            "SecureBrowser.security.setCapability()",
            "SecureBrowser.security.setCapability('somestring',false,'somestring',false)",
            "SecureBrowser.security.setCapability(null,'somestring','somestring','somestring')",
            "SecureBrowser.security.setCapability(true,true,null,null)",
            "SecureBrowser.security.setCapability(null,null,null,null)" ]
      }
    },
    "checkGetPermissiveModeAPI" : {
      // F49. The secure browser shall provide a means to query the status of
      // permissive mode. R44 SEC-80
      "id" : "18",
      "testName" : "Get permissive mode",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.getPermissiveMode",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.security.getPermissiveMode(function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.security.getPermissiveMode()", ,
            "SecureBrowser.security.getPermissiveMode('somestring')",
            "SecureBrowser.security.getPermissiveMode(null)",
            "SecureBrowser.security.getPermissiveMode(false)" ]
      }
    },
    "checkSetPermissiveModeAPI" : {
      // F15. The secure browser shall provide a means to set permissive mode.
      // R21 SEC-71
      "id" : "19",
      "testName" : "Set permissive mode",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.setPermissiveMode",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.security.setPermissiveMode(false,function callback(response){console.log(response);})"
        /* ,"SecureBrowser.security.setPermissiveMode(false)" */],
        "inValidTest" : [ "SecureBrowser.security.setPermissiveMode()", ,
            "SecureBrowser.security.setPermissiveMode(false,null)",
            "SecureBrowser.security.setPermissiveMode(null,null)" ]
      }
    },

    "checkSetAltStartPageAPI" : {
      // A1. This API will set a given URL as a default URL which will be used
      // by the Secure Browser to redirect upon its next launch.
      // SEC-132
      "id" : "20",
      "testName" : "SBLP Store URL",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.setAltStartPage",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [
            "SecureBrowser.security.setAltStartPage('someurlstring')",
            "SecureBrowser.security.setAltStartPage(null)" ],
        "inValidTest" : [ "SecureBrowser.security.setAltStartPage()" ]
      }
    },

    "checkRestoreDefaultStartPageAPI" : {
      // A1. This API will reset the default URL back to the default landing
      // page.
      // SEC-132
      "id" : "21",
      "testName" : "SBLP Reset URL",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.security.restoreDefaultStartPage",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.security.restoreDefaultStartPage()" ],
        "inValidTest" : [
        /*
         * "SecureBrowser.security.restoreDefaultStartPage('somestring')",
         * "SecureBrowser.security.restoreDefaultStartPage(null)",
         * "SecureBrowser.security.restoreDefaultStartPage(false)"
         */]
      }
    },

    "checkEventAPI" : {
      "id" : "23",
      "testName" : "Add Event Listener",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.events.addEventListener",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.events.addEventListener('eventstring',function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.events.addEventListener()",
            "SecureBrowser.events.addEventListener('eventstring')",
            "SecureBrowser.events.addEventListener(null)",
            "SecureBrowser.events.addEventListener(false)" ]
      }
    },

    "checkspacesenabled" : {
      // F15. The secure browser shall provide a means to set permissive mode.
      // R21 SEC-71
      "id" : "23",
      "testName" : "Check spaces in macOS",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.settings.isSpacesEnabled",
      "points" : "1",
      "required" : {
        "macOS" : true
      },
      "testPoints" : "0",
      "apiType" : [ "boolean", "function" ],
      "isDeprecated" : false,
      "manualData" : true,
      "regTest" : {
        "validTest" : [ "SecureBrowser.settings.isSpacesEnabled" ],
        "inValidTest" : [ "SecureBrowser.settings.isSpacesEnabled()",
            "SecureBrowser.settings.isSpacesEnabled('eventstring')",
            "SecureBrowser.settings.isSpacesEnabled(null)",
            "SecureBrowser.settings.isSpacesEnabled(false)" ]
      }
    }
  },
  "ttsapi" : {
    "checkTTSSpeakAPI" : {
      // F16. The secure browser shall provide shall provide a means to play
      // arbitrary text. R08 SEC-36, SEC-50, SEC-51, SEC-52, SEC-53
      "id" : "1",
      "testName" : "Speak text (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "SecureBrowser.tts.speak",
      "testApi_webspeech" : "window.speechSynthesis.speak",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.tts.speak('',{},function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.tts.speak(null,null,null)",
            "SecureBrowser.tts.speak()", "SecureBrowser.tts.speak('',{},null)",
            "SecureBrowser.tts.speak(false,null,true)" ]
      }
    },
    "checkTTSPauseAPI" : {
      // F18. The secure browser shall provide a means to pause TTS speech in
      // progress. R13 SEC-40
      "id" : "2",
      "testName" : "Pause speech (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "SecureBrowser.tts.pause",
      "testApi_webspeech" : "window.speechSynthesis.pause",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [
            "SecureBrowser.tts.pause(function callback(response){console.log(response);})",
            "SecureBrowser.tts.pause()" ],
        "inValidTest" : [ "SecureBrowser.tts.pause(null)",
            "SecureBrowser.tts.pause('')", "SecureBrowser.tts.pause(false)" ]
      }
    },
    "checkTTSResumeAPI" : {
      // F21. The secure browser shall provide a means to resume previously
      // paused TTS speech. R14 SEC-41
      "id" : "3",
      "testName" : "Resume speech (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "SecureBrowser.tts.resume",
      "testApi_webspeech" : "window.speechSynthesis.resume",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [
            "SecureBrowser.tts.resume(function callback(response){console.log(response);})",
            "SecureBrowser.tts.resume()" ],
        "inValidTest" : [ "SecureBrowser.tts.resume(null)",
            "SecureBrowser.tts.resume('')", "SecureBrowser.tts.resume(false)" ]
      }
    },
    "checkTTSStopAPI" : {
      // F17. The secure browser shall provide a means to stop TTS speech in
      // progress. R09 SEC-37
      "id" : "4",
      "testName" : "Stop speech (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "SecureBrowser.tts.stop",
      "testApi_webspeech" : "window.speechSynthesis.cancel",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [
            "SecureBrowser.tts.stop(function callback(response){console.log(response);})",
            "SecureBrowser.tts.stop()" ],
        "inValidTest" : [ "SecureBrowser.tts.stop(null)",
            "SecureBrowser.tts.stop('')", "SecureBrowser.tts.stop(false)" ]
      }
    },
    "checkTTSStatusAPI" : {
      // F22. The secure browser shall provide a means events to notify the web
      // application of status and progress of TTS. R10 SEC-11, SEC-38
      "id" : "8",
      "testName" : "Get speech status (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "SecureBrowser.tts.getStatus",
      "testApi_webspeech" : "(window.speechSynthesis.paused || window.speechSynthesis.pending || window.speechSynthesis.speaking)",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "boolean", "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [
            "SecureBrowser.tts.getStatus(function callback(response){console.log(response);})",
            "SecureBrowser.tts.getStatus()" ],
        "inValidTest" : [ "SecureBrowser.tts.getStatus(null)",
            "SecureBrowser.tts.getStatus('')",
            "SecureBrowser.tts.getStatus(false)" ]
      }
    },
    "checkTTSVoicesAPI" : {
      // F19. The secure browser shall provide a means to retrieve list of TTS
      // voice packs available on the machine. R11, R12 SEC-11, SEC-39
      "id" : "9",
      "testName" : "Get available voices (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "SecureBrowser.tts.getVoices",
      "testApi_webspeech" : "window.speechSynthesis.getVoices",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [
            "SecureBrowser.tts.getVoices(function callback(response){console.log(response);})",
            "SecureBrowser.tts.getVoices()" ],
        "inValidTest" : [ "SecureBrowser.tts.getVoices(null)",
            "SecureBrowser.tts.getVoices('')",
            "SecureBrowser.tts.getVoices(false)" ]
      }
    }
  },
  "ttsmanualapi" : {
    "PLAY" : {
      // Play R11, R12 SEC-11, SEC-39
      "id" : "11",
      "testName" : "Manual test: TTS Speak",
      "instruction" : "Click <b>Play</b> to test TTS Speech.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "TTS Play Test",
      "buttonSliderId" : "play",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY" ]
    },
    "PAUSE" : {
      // Pause R11, R12 SEC-11, SEC-39
      "id" : "12",
      "testName" : "Manual test: TTS Pause",
      "instruction" : "Click <b>Play</b> and then <b>Pause</b> to test TTS Pause.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did text-to-speech pause?</p>",
      "dialogTitle" : "TTS Pause Test",
      "buttonSliderId" : "pause",
      "disableSection" : [ "RESUME", "STOP", "VOLUME", "PITCH", "RATE",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "PAUSE" ]
    },
    "RESUME" : {
      // Resume R11, R12 SEC-11, SEC-39
      "id" : "13",
      "testName" : "Manual test: TTS Resume",
      "instruction" : "Click <b>Play</b>, <b>Pause</b>, and then <b>Resume</b> to test TTS Resume.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did text-to-speech resume?</p>",
      "dialogTitle" : "TTS Resume Test",
      "buttonSliderId" : "resume",
      "disableSection" : [ "STOP", "VOLUME", "PITCH", "RATE", "SYSTEM_VOLUME",
          "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "PAUSE", "RESUME" ]
    },
    "STOP" : {
      // Stop R09 SEC-37
      "id" : "14",
      "testName" : "Manual test: TTS Stop",
      "instruction" : "Click <b>Play</b> and then <b>Stop</b> to test TTS Stop.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did text-to-speech stop?</p>",
      "dialogTitle" : "TTS Stop Test",
      "buttonSliderId" : "stop",
      "disableSection" : [ "PAUSE", "RESUME", "VOLUME", "PITCH", "RATE",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "STOP" ]
    },
    "VOLUME" : {
      // Volume R11, R12 SEC-11, SEC-39
      "id" : "15",
      "testName" : "Manual test: TTS Volume",
      "instruction" : "Change Volume and Click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "TTS Volume Test",
      "buttonSliderId" : "ttsVolume",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "PITCH", "RATE",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "VOLUME" ]
    },
    "PITCH" : {
      // Pitch R11, R12 SEC-11, SEC-39
      "id" : "16",
      "testName" : "Manual test: TTS Pitch",
      "instruction" : "Change Pitch and Click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "TTS Pitch Test",
      "buttonSliderId" : "ttsPitch",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "RATE",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "PITCH" ]
    },
    "RATE" : {
      // Rate R11, R12 SEC-11, SEC-39
      "id" : "17",
      "testName" : "Manual test: TTS Rate",
      "instruction" : "Change Rate and Click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "TTS Rate Test",
      "buttonSliderId" : "ttsRate",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "RATE" ]
    },
    "SYSTEM_VOLUME" : {
      // System Volume R16 SEC-57, SEC-58
      "id" : "18",
      "testName" : "Manual test: System Volume",
      "instruction" : "Change System Volume and Click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "System Volume Test",
      "buttonSliderId" : "systemVolume",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "SYSTEM_VOLUME" ]
    },
    "MUTE" : {
      // Mute/Unmute R19, R20, R21 SEC-56, SEC-58
      "id" : "19",
      "testName" : "Manual test: System Mute",
      "instruction" : "Click <b>Mute</b> and click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Was the voice completely silent?</p>",
      "dialogTitle" : "System Mute Test",
      "buttonSliderId" : "systemMute",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "SYSTEM_VOLUME", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "MUTE" ]
    },
    "UNMUTE" : {
      // Mute/Unmute R19, R20, R21 SEC-56, SEC-58
      "id" : "20",
      "testName" : "Manual test: System Unmute",
      "instruction" : "Click <b>Unmute</b> and click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice?</p>",
      "dialogTitle" : "System Unmute Test",
      "buttonSliderId" : "systemUnMute",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "SYSTEM_VOLUME", "MUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "UNMUTE" ]
    },
    "VOICE" : {
      // Voice Selection R11, R12 SEC-11, SEC-39
      "id" : "21",
      "testName" : "Manual test: TTS Voice Selection",
      "instruction" : "Change Voice Selection and Click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "TTS Voice Selection Test",
      "buttonSliderId" : "voices",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "SYSTEM_VOLUME", "MUTE", "UNMUTE" ],
      "enableSection" : [ "PLAY", "VOICE" ]
    },
    "FAILED" : {
      "id" : "22",
      "testName" : "Manual Test: Text-to-speech (TTS) ",
      "instruction" : "",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "",
      "dialogTitle" : "",
      "buttonSliderId" : "",
      "disableSection" : "",
      "enableSection" : ""
    }
  },
  "capabilityManualAPI" : {
    "SET" : {
      "id" : "1",
      "testName" : "Manual test: Set Capability",
      "instruction" : "Select Capability, Functionality and Click <b>Set</b> button.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did the capabilities listed in the Capability table match the selection(s) you made?</p>",
      "dialogTitle" : "Set Capability Test",
      "buttonSliderId" : "setCapability",
      "disableSection" : [ "getCapability" ],
      "enableSection" : [ "setCapability", "enableCapability",
          "disableCapability", "capabilityType" ]
    },
    "GET" : {
      "id" : "1",
      "testName" : "Manual test: Get Capability",
      "instruction" : "Select Capability and Click <b>Get</b> button.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did the capabilities listed in the Capability table match the selection(s) you made?</p>",
      "dialogTitle" : "Get Capability Test",
      "buttonSliderId" : "getCapability",
      "disableSection" : [ "setCapability", "enableCapability",
          "disableCapability", ],
      "enableSection" : [ "getCapability", "capabilityType" ]
    },
    "FAILED" : {
      "id" : "3",
      "testName" : "Manual Test: Get/Set Capability",
      "instruction" : "",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "",
      "dialogTitle" : "",
      "buttonSliderId" : "",
      "disableSection" : "",
      "enableSection" : ""
    }
  },
  "processManualAPI" : {
    "EXAMINE" : {
      "id" : "1",
      "testName" : "Manual test: Examine Process List",
      "instruction" : "<ol><li>Select one or more processes from the 'Available' list and move them to the 'Selected' list and click <b>Examine</b>.</li><li>Any running forbidden apps found will be populated in the resulting grid.</li><li>Click OK to conclude this test.</li></ol>",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Do you see processes in the Forbidden Running Processes grid as per your selection?</p>",
      "dialogTitle" : "Examine Process List Test",
      "buttonSliderId" : "examineProcess",
      "disableSection" : [ "" ],
      "enableSection" : [ "" ]
    },
    "FAILED" : {
      "id" : "2",
      "testName" : "Manual test: Examine Process List",
      "instruction" : "",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "",
      "dialogTitle" : "",
      "buttonSliderId" : "",
      "disableSection" : "",
      "enableSection" : ""
    }
  },

  "externalTest" : {
    "HTML5" : {
      "id" : "1",
      "testName" : "HTML5 Test",
      "instruction" : "",
      "testApi" : "",
      "testResult" : null,
      "details" : "Test not performed by user",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "",
      "dialogTitle" : "",
      "buttonSliderId" : "",
      "disableSection" : [ "" ],
      "enableSection" : [ "" ]
    },
    "CSS3" : {
      "id" : "2",
      "testName" : "CSS3 Test",
      "instruction" : "",
      "testApi" : "",
      "testResult" : null,
      "details" : "Test not performed by user",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "",
      "dialogTitle" : "",
      "buttonSliderId" : "",
      "disableSection" : [ "" ],
      "enableSection" : [ "" ]
    }
  },
  "audiorecordapi" : {
    // Initialize audio recorder: SEC-19, R25, F40
    "checkAudioRecorderInitialize" : {
      "id" : "1",
      "testName" : "Initialize audio recorder",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.initialize",
      "testApi_webaudio" : "(window.AudioContext || window.webkitAudioContext)",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.initialize(function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.recorder.initialize()",
            "SecureBrowser.recorder.initialize(null)",
            "SecureBrowser.recorder.initialize('somestring')",
            "SecureBrowser.recorder.initialize(false)" ]
      }
    },
    "checkAudioRecorderStatus" : {
      "id" : "2",
      "testName" : "Get audio recorder status",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.getStatus",
      "testApi_webaudio" : "audioCtx.state",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.getStatus(function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.recorder.getStatus()",
            "SecureBrowser.recorder.getStatus(null)",
            "SecureBrowser.recorder.getStatus('somestring')",
            "SecureBrowser.recorder.getStatus(false)" ]
      }
    },
    "checkAudioRecorderCapabilities" : {
      "id" : "3",
      "testName" : "Get audio recorder capabilities",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.getCapabilities",
      "testApi_webaudio" : "(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.enumerateDevices)",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.getCapabilities(function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.recorder.getCapabilities()",
            "SecureBrowser.recorder.getCapabilities(null)",
            "SecureBrowser.recorder.getCapabilities('somestring')",
            "SecureBrowser.recorder.getCapabilities(false)" ]
      }
    },
    "checkAudioCapture" : {
      "id" : "4",
      "testName" : " Initiate audio capture",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.startCapture",
      "testApi_webaudio" : "new MediaRecorder(new MediaStream()).start",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.startCapture({},function eventListener(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.recorder.startCapture()",
            "SecureBrowser.recorder.startCapture(null,null)",
            "SecureBrowser.recorder.startCapture('somestring',null)",
            "SecureBrowser.recorder.startCapture(false,false)" ]
      }
    },
    "checkAudioStopRecording" : {
      "id" : "5",
      "testName" : "Stop recording",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.stopCapture",
      "testApi_webaudio" : "new MediaRecorder(new MediaStream()).stop",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.stopCapture()" ],
        "inValidTest" : [ "SecureBrowser.recorder.stopCapture(null)",
            "SecureBrowser.recorder.stopCapture('somestring')",
            "SecureBrowser.recorder.stopCapture(false)" ]
      }
    },
    "checkStartPlayback" : {
      "id" : "7",
      "testName" : "Playback recording",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.play",
      "testApi_webaudio" : "audioCtx.createBufferSource().start",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.play('',function eventListener(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.recorder.play(null,null)",
            "SecureBrowser.recorder.play('',null)",
            "SecureBrowser.recorder.play(false,null)" ]
      }
    },
    "checkStopPlayback" : {
      "id" : "8",
      "testName" : "Stop playback",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.stopPlay",
      "testApi_webaudio" : "audioCtx.createBufferSource().stop",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.stopPlay()" ],
        "inValidTest" : [ "SecureBrowser.recorder.stopPlay(null)",
            "SecureBrowser.recorder.stopPlay('')",
            "SecureBrowser.recorder.stopPlay(false)" ]
      }
    },
    "checkPausePlayback" : {
      "id" : "9",
      "testName" : "Pause playback",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.pausePlay",
      "testApi_webaudio" : "audioCtx.createBufferSource().stop",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.pausePlay()" ],
        "inValidTest" : [ "SecureBrowser.recorder.pausePlay(null)",
            "SecureBrowser.recorder.pausePlay('')",
            "SecureBrowser.recorder.pausePlay(false)" ]
      }
    },
    "checkResumePlayback" : {
      "id" : "10",
      "testName" : "Resume playback",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.resumePlay",
      "testApi_webaudio" : "audioCtx.createBufferSource().start",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.resumePlay()" ],
        "inValidTest" : [ "SecureBrowser.recorder.resumePlay(null)",
            "SecureBrowser.recorder.resumePlay('')",
            "SecureBrowser.recorder.resumePlay(false)" ]
      }
    },
    "checkRetieveAudioList" : {
      "id" : "11",
      "testName" : "Retrieve list of audio recordings",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.retrieveAudioRecordingList",
      "testApi_webaudio" : "audioCtx.retrieveAudioRecordingList",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.retrieveAudioRecordingList(function callback(response){console.log(response);})" ],
        "inValidTest" : [
            "SecureBrowser.recorder.retrieveAudioRecordingList(null)",
            "SecureBrowser.recorder.retrieveAudioRecordingList(false)",
            "SecureBrowser.recorder.retrieveAudioRecordingList('')" ]
      }
    },
    "checkRetrieveAudioDatafromList" : {
      "id" : "12",
      "testName" : "Retrieve audio data",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.retrieveAudioRecording",
      "testApi_webaudio" : "audioCtx.retrieveAudioRecording",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.retrieveAudioRecording('',function callback(response){console.log(response);})" ],
        "inValidTest" : [
            "SecureBrowser.recorder.retrieveAudioRecording(null,null)",
            "SecureBrowser.recorder.retrieveAudioRecording('','',false)",
            "SecureBrowser.recorder.retrieveAudioRecording(false,false,null)" ]
      }
    },
    "checkRemoveAudioRecording" : {
      "id" : "13",
      "testName" : "Remove Audio Recordings",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.removeAudioRecordings",
      "testApi_webaudio" : "audioCtx.removeAudioRecordings",
      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "regTest" : {
        "validTest" : [ "SecureBrowser.recorder.removeAudioRecordings(function callback(response){console.log(response);})" ],
        "inValidTest" : [ "SecureBrowser.recorder.removeAudioRecordings(null)",
            "SecureBrowser.recorder.removeAudioRecordings(false)",
            "SecureBrowser.recorder.removeAudioRecordings('somestring')" ]
      }
    }
  },
  "recordermanualapi" : {
    "INITIATE" : {
      // Initialize audio recorder: SEC-19, R25, F40
      "id" : "13",
      "testName" : "Manual Test: Initialization",
      "instruction" : "Click <b>Initiate</b> to initialize audio recorder.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did this complete without an error?</p>",
      "dialogTitle" : "Audio Recorder Initialization",
      "buttonSliderId" : "initiateRecording",
      "disableSection" : [ "getRecordingStatus", "getRecordingCapabilities",
          "startRecording", "stopRecording", "startPlaybackRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "stopPlaybackRecording" ],
      "enableSection" : [ "initiateRecording" ]
    },
    "STATUS" : {
      // Get audio recorder status: SEC-20, R26, F41
      "id" : "13",
      "testName" : "Manual Test: Status",
      "instruction" : "Click <b>Status</b> to get audio recorder status.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did the Recoder Status change to <i>IDLE</i>?</p>",
      "dialogTitle" : "Audio Recorder Status Test",
      "buttonSliderId" : "getRecordingStatus",
      "disableSection" : [ "initiateRecording", "getRecordingCapabilities",
          "startRecording", "stopRecording", "startPlaybackRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "stopPlaybackRecording" ],
      "enableSection" : [ 'getRecordingStatus' ]
    },
    "CAPABILITY" : {
      // Get audio recorder capabilities: SEC-21, R27, F41
      "id" : "12",
      "testName" : "Manual Test: Input Device selection",
      "instruction" : "<ol><li>Click <b>Capabilities</b> to get input source options for recording audio.</li><li>Select an Input Source to use as the recording device.</li><li>Click <b>Use</b> to conclude this test.</li></ol>",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Was the audio input select box populated?</p>",
      "dialogTitle" : "Audio Recorder Device Capabilities Test",
      "buttonSliderId" : "getRecordingCapabilities",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "startRecording", "stopRecording", "startPlaybackRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "stopPlaybackRecording" ],
      "enableSection" : [ 'getRecordingCapabilities' ]
    },
    "START_RECORD" : {
      // Initiate audio capture: SEC-22, R28, F25
      "id" : "13",
      "testName" : "Manual Test: Start Recording",
      "instruction" : "Click <b>Start Recording</b> to start audio recording.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did the Recording Status change to <i>recording</i>?</p>",
      "dialogTitle" : "Audio Recorder Start Recording Test",
      "buttonSliderId" : "startRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "stopRecording",
          "startPlaybackRecording", "pausePlaybackRecording",
          "resumePlaybackRecording", "stopPlaybackRecording",
          "concludeCapability", "audioOutput", "audioSource" ],
      "enableSection" : [ "startRecording" ]
    },
    "STOP_RECORD" : {
      // Stop recording: SEC-23, R29, F26
      "id" : "14",
      "testName" : "Manual Test: Stop Recording",
      "instruction" : "Click <b>Stop Recording</b> to stop audio recording.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did the Recording Status change to <i>IDLE</i>?</p>",
      "dialogTitle" : "Audio Recorder Stop Recording Test",
      "buttonSliderId" : "stopRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording",
          "startPlaybackRecording", "pausePlaybackRecording",
          "resumePlaybackRecording", "stopPlaybackRecording",
          "concludeCapability", "audioOutput", "audioSource" ],
      "enableSection" : [ 'stopRecording' ]
    },
    "PLAY" : {
      // Playback a recording: SEC-67, R31, F27
      "id" : "15",
      "testName" : "Manual Test: Play recording",
      "instruction" : "Click <b>Play</b> to hear recording.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the recording?</p>",
      "dialogTitle" : "Audio Recorder Start Playback",
      "buttonSliderId" : "startPlaybackRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording", "stopRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "stopPlaybackRecording", "concludeCapability", "audioOutput",
          "audioSource" ],
      "enableSection" : [ 'startPlaybackRecording' ]
    },
    "PAUSE" : {
      // Pause playback: SEC-69, R33, F44
      "id" : "16",
      "testName" : "Manual Test: Pause Playback",
      "instruction" : "Click <b>Play</b> and then <b>Pause</b> to test pausing the playback.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did playback of the audio recording pause?</p>",
      "dialogTitle" : "Audio Recorder Pause Playback",
      "buttonSliderId" : "pausePlaybackRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording", "stopRecording",
          "resumePlaybackRecording", "stopPlaybackRecording",
          "concludeCapability", "audioOutput", "audioSource" ],
      "enableSection" : [ 'startPlaybackRecording', 'pausePlaybackRecording' ]
    },
    "RESUME" : {
      // Resume playback: SEC-70, R34, F45
      "id" : "17",
      "testName" : "Manual Test: Resume Playback",
      "instruction" : "Click <b>Play</b>, <b>Pause</b>, and then <b>Resume</b> to test resuming the playback.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the recording resume?</p>",
      "dialogTitle" : "Audio Recorder Resume Playback",
      "buttonSliderId" : "resumePlaybackRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording", "stopRecording",
          "stopPlaybackRecording", "concludeCapability", "audioOutput",
          "audioSource" ],
      "enableSection" : [ 'startPlaybackRecording', 'pausePlaybackRecording',
          'resumePlaybackRecording' ]
    },
    "STOP" : {
      // Stop playback: SEC-68, R32, F43
      "id" : "18",
      "testName" : "Manual Test:Stop Playback",
      "instruction" : "Click <b>Play</b> and then <b>Stop</b> to test Stop Playback.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did audio recording playback stop?</p>",
      "dialogTitle" : "Audio Recorder Resume Playback",
      "buttonSliderId" : "stopPlaybackRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording", "stopRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "concludeCapability", "audioOutput", "audioSource" ],
      "enableSection" : [ 'startPlaybackRecording', 'stopPlaybackRecording' ]
    },
    "FAILED" : {
      "id" : "22",
      "testName" : "Audio Recorder API Manual Test",
      "instruction" : "",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : false
      },
      "testPoints" : "0",
      "dialogHtml" : "",
      "dialogTitle" : "",
      "buttonSliderId" : "",
      "disableSection" : "",
      "enableSection" : ""
    }

  }
};

function isMSTatBrowser() {
  return !!navigator.userAgent.match(/Edge\/[\d.]+/)
      && (navigator.userAgent.indexOf(' WebView/') > -1);
}