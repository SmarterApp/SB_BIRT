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
var certified_edge = "certified_edge";
var securebrowser = "SB";
var mobile = "mobile";
var webspeech = "webspeech";
var tts_section = 'TTS';
var ttsmanual_section = 'TTS_MANUAL';
var capability_section = 'CAPABILITY_MANUAL';
var irpApiSpecConstant = 'IRT.ApiSpecs';

var specMessage = "message";
var specTTSApi = "ttsapi";
var specTTSManualApi = "ttsmanualapi";
var specBrowserapi = "browserapi";
var specCapabilityManualApi = "capabilityManualAPI";
var specSeparator = ".";

IRT.CapabilityTest = {
  SET : 'SET',
  GET : 'GET',
  UNKNOWN : 'UNKNOWN' // unknown status
};

IRT.CAPABILITY_PROPERTY = {
  Printing : 'printing',
  ScreenCapture : 'screenCapture'
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
    "errorDialog_TTS" : "Your browser does not support TTS, so manual testing will be skipped",
    "errorDialog_CAPABILITY" : "Your browser does not support GET/SET Capability, so manual testing will be skipped",
    "TTS_disable_all" : [ "PLAY", "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
        "RATE", "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
    "CAPABILITY_disable_all" : [ "setCapability", "enableCapability",
        "disableCapability", "getCapability", "capabilityType" ]
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
      "testApi_certified" : "window.browser",
      "testApi_certified_edge" : "window.browser && window.browser.addEventListener",
      "testApi_SB" : "SecureBrowser",
      "testApi_mobile" : "(new Summit.SecureBrowser.Mobile()).getNativeBrowser()",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
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
      "testApi_certified" : "browser.security.getDeviceInfo",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.getDeviceInfo",
      "testApi_mobile" : "runtime.security.getDeviceInfo",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkMACAddressAPI" : {
      // F04. The secure browser shall provide a means to retrieve system MAC
      // address. R40 SEC-27
      "id" : "3",
      "testName" : "Retrieve system MAC address(es)",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.getMACAddress",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.getMACAddress",
      "testApi_mobile" : "runtime.security.getMACAddress",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "manualData" : true
    },
    "checkIPAddressAPI" : {
      // F05. The secure browser shall NOT provide a means to retrieve the
      // system IP address(es). R22 SEC-28
      "id" : "4",
      "testName" : "Retrieve system IP address(es)",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.getIPAddressList",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.getIPAddressList",
      "testApi_mobile" : "runtime.security.getIPAddressList",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
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
      "testApi_certified" : "browser.security.getStartTime",
      "testApi_certified_edge" : "",
      "testApi_SB" : "Mozilla.getPreference('bmakiosk.startup.timestamp')",
      "testApi_mobile" : "runtime.security.getStartTime",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false,
      "manualData" : true
    },
    "checkClearCacheAPI" : {
      // F01. The Secure browser shall NOT provide a means to clear browser
      // cache. R22 SEC-32

      "id" : "6",
      "testName" : "Clear cache",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.clearCache",
      "testApi_certified_edge" : "",
      "testApi_SB" : "SecureBrowser.clearCache",
      "testApi_mobile" : "runtime.security.clearCache",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
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
      "testApi_certified" : "browser.security.emptyClipBoard",
      "testApi_certified_edge" : "",
      "testApi_SB" : "SecureBrowser.emptyClipBoard",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkClearCookiesAPI" : {
      // F02. The secure browser shall NOT provide a means to clear browser
      // cookies. R22 SEC-33
      "id" : "8",
      "testName" : "Clear Cookies",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.clearCookies",
      "testApi_certified_edge" : "",
      "testApi_SB" : "SecureBrowser.clearCookies",
      "testApi_mobile" : "runtime.security.clearCookies",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
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
      "testApi_certified" : "browser.security.getProcessList",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.getRunningProcessList",
      "testApi_mobile" : "runtime.security.getProcessList",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
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
      "testApi_certified" : "browser.security.closeWindow",
      "testApi_certified_edge" : "browser.security.close",
      "testApi_SB" : "SecureBrowser.CloseWindow",
      "testApi_mobile" : "runtime.security.close",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
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
      "testApi_certified" : "browser.security.isEnvironmentSecure",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.isEnvironmentSecure",
      "testApi_mobile" : "runtime.security.isEnvironmentSecure",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkEnableLockDownAPI" : {
      // F37. The secure browser shall be able to lock down the environment. R02
      // SEC-30
      "id" : "12",
      "testName" : "Enable Lockdown",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.enableLockDown",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.enableLockDown",
      "testApi_mobile" : "runtime.security.enableLockdown",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
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
      "testApi_certified" : "browser.systemVolume",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.systemVolume",
      "testApi_mobile" : "runtime.systemVolume",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
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
      "testApi_certified" : "browser.systemMute",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.systemMute",
      "testApi_mobile" : "runtime.systemMute",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "boolean" ],
      "isDeprecated" : false
    },
    "checkExamineProcessList" : {
      // F31. The secure browser shall be able to determine whether blacklisted
      // processes are running on the client machine. R06 SEC-10, SEC-62
      "id" : "15",
      "testName" : "Examine Process List",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.examineProcessList",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.examineProcessList",
      "testApi_mobile" : "runtime.security.examineProcessList",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkGetCapabilityAPI" : {
      // F46. The secure browser shall be able to get the status of a particular
      // browser capability. R41 SEC-76, SEC-81
      "id" : "16",
      "testName" : "Get Capability",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.getCapability",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.getCapability",
      "testApi_mobile" : "runtime.security.getCapability",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkSetCapabilityAPI" : {
      // F47. The secure browser shall be able to set the status of a particular
      // browser capability. R42 SEC-77, SEC-81
      "id" : "17",
      "testName" : "Set Capability",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.setCapability",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.setCapability",
      "testApi_mobile" : "runtime.security.setCapability",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkGetPermissiveModeAPI" : {
      // F49. The secure browser shall provide a means to query the status of
      // permissive mode. R44 SEC-80
      "id" : "18",
      "testName" : "Get permissive mode",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.getPermissiveMode",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.permissive",
      "testApi_mobile" : "runtime.security.getPermissiveMode",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "boolean" ],
      "isDeprecated" : false
    },
    "checkSetPermissiveModeAPI" : {
      // F15. The secure browser shall provide a means to set permissive mode.
      // R21 SEC-71
      "id" : "19",
      "testName" : "Set permissive mode",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "browser.security.setPermissiveMode",
      "testApi_certified_edge" : "",
      "testApi_SB" : "runtime.permissive",
      "testApi_mobile" : "runtime.security.setPermissiveMode",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "boolean" ],
      "isDeprecated" : false
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
      "testApi_certified" : "browser.tts.speak",
      "testApi_webspeech" : "window.speechSynthesis.speak",
      "testApi_SB" : "runtime.play",
      "testApi_mobile" : "runtime.tts.speak",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSPauseAPI" : {
      // F18. The secure browser shall provide a means to pause TTS speech in
      // progress. R13 SEC-40
      "id" : "2",
      "testName" : "Pause speech (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "browser.tts.pause",
      "testApi_webspeech" : "window.speechSynthesis.pause",
      "testApi_SB" : "runtime.pause",
      "testApi_mobile" : "runtime.tts.pause",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSResumeAPI" : {
      // F21. The secure browser shall provide a means to resume previously
      // paused TTS speech. R14 SEC-41
      "id" : "3",
      "testName" : "Resume speech (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "browser.tts.resume",
      "testApi_webspeech" : "window.speechSynthesis.resume",
      "testApi_SB" : "runtime.resume",
      "testApi_mobile" : "runtime.tts.resume",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSStopAPI" : {
      // F17. The secure browser shall provide a means to stop TTS speech in
      // progress. R09 SEC-37
      "id" : "4",
      "testName" : "Stop speech (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "browser.tts.stop",
      "testApi_webspeech" : "window.speechSynthesis.cancel",
      "testApi_SB" : "runtime.stop",
      "testApi_mobile" : "runtime.tts.stop",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSVolumeAPI" : {
      // F30. The secure browser shall provide a means to get/set TTS volume.
      // R08 SEC-36, SEC-50, SEC-51, SEC-52, SEC-53
      "id" : "5",
      "testName" : "Get/Set TTS volume API (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "browser.tts.getVolume",
      "testApi_webspeech" : "new SpeechSynthesisUtterance().volume",
      "testApi_SB" : "runtime.volume",
      "testApi_mobile" : "runtime.device.ttsVolume",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSPitchAPI" : {
      // F28. The secure browser shall provide a means to get/set TTS pitch.
      // R11, R12 SEC-11, SEC-39
      "id" : "6",
      "testName" : "Get/Set TTS pitch API (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "browser.tts.getPitch",
      "testApi_webspeech" : "new SpeechSynthesisUtterance().pitch",
      "testApi_SB" : "runtime.pitch",
      "testApi_mobile" : "runtime.device.ttsPitch",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSRateAPI" : {
      // F29. The secure browser shall provide a means to get/set TTS rate. R11,
      // R12 SEC-11, SEC-39
      "id" : "7",
      "testName" : "Get/Set TTS rate API (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "browser.tts.getRate",
      "testApi_webspeech" : "new SpeechSynthesisUtterance().rate",
      "testApi_SB" : "runtime.rate",
      "testApi_mobile" : "runtime.device.ttsRate",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSStatusAPI" : {
      // F22. The secure browser shall provide a means events to notify the web
      // application of status and progress of TTS. R10 SEC-11, SEC-38
      "id" : "8",
      "testName" : "Get speech status (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "browser.tts.getStatus",
      "testApi_webspeech" : "(window.speechSynthesis.paused || window.speechSynthesis.pending || window.speechSynthesis.speaking)",
      "testApi_SB" : "runtime.status",
      "testApi_mobile" : "runtime.tts.getStatus",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "boolean", "function" ],
      "isDeprecated" : false
    },
    "checkTTSVoicesAPI" : {
      // F19. The secure browser shall provide a means to retrieve list of TTS
      // voice packs available on the machine. R11, R12 SEC-11, SEC-39
      "id" : "9",
      "testName" : "Get available voices (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",
      "testApi_certified" : "browser.tts.getVoices",
      "testApi_webspeech" : "window.speechSynthesis.getVoices",
      "testApi_SB" : "runtime.voices",
      "testApi_mobile" : "runtime.tts.getVoices",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSVoiceNameAPI" : {
      // F20. The secure browser shall provide a means to get the current TTS
      // voice pack set as default on the machine. R11, R12 SEC-11, SEC-39
      "id" : "10",
      "testName" : "Get/Set TTS voice name API (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "browser.tts.getVoiceName",
      "testApi_webspeech" : "window.speechSynthesis.voicename",
      "testApi_SB" : "runtime.voiceName",
      "testApi_mobile" : "runtime.tts.voiceName",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    }
  },
  "ttsmanualapi" : {
    "PLAY" : {
      // Play R11, R12 SEC-11, SEC-39
      "id" : "11",
      "testName" : "Manual test for TTS Speak",
      "instruction" : "Click Play to test TTS Speech",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "TTS Play Test",
      "buttonSliderId" : "play",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY" ]
    },
    "PAUSE" : {
      // Pause R11, R12 SEC-11, SEC-39
      "id" : "12",
      "testName" : "Manual test for TTS Pause",
      "instruction" : "Click Play and then Pause to test TTS Pause",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did text-to-speech pause? If so choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "TTS Pause Test",
      "buttonSliderId" : "pause",
      "disableSection" : [ "RESUME", "STOP", "VOLUME", "PITCH", "RATE",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "PAUSE" ]
    },
    "RESUME" : {
      // Resume R11, R12 SEC-11, SEC-39
      "id" : "13",
      "testName" : "Manual test for TTS Resume",
      "instruction" : "Click Play, Pause, and then Resume to test TTS Resume",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did text-to-speech resume? If so choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "TTS Resume Test",
      "buttonSliderId" : "resume",
      "disableSection" : [ "STOP", "VOLUME", "PITCH", "RATE", "SYSTEM_VOLUME",
          "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "PAUSE", "RESUME" ]
    },
    "STOP" : {
      // Stop R09 SEC-37
      "id" : "14",
      "testName" : "Manual test for TTS Stop",
      "instruction" : "Click Play and then Stop to test TTS Stop",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did text-to-speech stop? If so choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "TTS Stop Test",
      "buttonSliderId" : "stop",
      "disableSection" : [ "PAUSE", "RESUME", "VOLUME", "PITCH", "RATE",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "STOP" ]
    },
    "VOLUME" : {
      // Volume R11, R12 SEC-11, SEC-39
      "id" : "15",
      "testName" : "Manual test for TTS Volume",
      "instruction" : "Change Volume and Click Play to test",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "TTS Volume Test",
      "buttonSliderId" : "ttsVolume",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "PITCH", "RATE",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "VOLUME" ]
    },
    "PITCH" : {
      // Pitch R11, R12 SEC-11, SEC-39
      "id" : "16",
      "testName" : "Manual test for TTS Pitch",
      "instruction" : "Change Pitch and Click Play to test",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "TTS Pitch Test",
      "buttonSliderId" : "ttsPitch",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "RATE",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "PITCH" ]
    },
    "RATE" : {
      // Rate R11, R12 SEC-11, SEC-39
      "id" : "17",
      "testName" : "Manual test for TTS Rate",
      "instruction" : "Change Rate and Click Play to test",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "TTS Rate Test",
      "buttonSliderId" : "ttsRate",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "RATE" ]
    },
    "SYSTEM_VOLUME" : {
      // System Volume R16 SEC-57, SEC-58
      "id" : "18",
      "testName" : "Manual test for System Volume",
      "instruction" : "Change System Volume and Click Play to test",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "System Volume Test",
      "buttonSliderId" : "systemVolume",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "MUTE", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "SYSTEM_VOLUME" ]
    },
    "MUTE" : {
      // Mute/Unmute R19, R20, R21 SEC-56, SEC-58
      "id" : "19",
      "testName" : "Manual test for System Mute",
      "instruction" : "Click Mute and Click Play to test",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you didn't hear the voice at all, choose <b>Yes</b>. If you did hear the voice, choose <b>No</b></p>",
      "dialogTitle" : "System Mute Test",
      "buttonSliderId" : "systemMute",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "SYSTEM_VOLUME", "UNMUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "MUTE" ]
    },
    "UNMUTE" : {
      // Mute/Unmute R19, R20, R21 SEC-56, SEC-58
      "id" : "20",
      "testName" : "Manual test for System Unmute",
      "instruction" : "Click Unmute and Click Play to test",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you did hear the voice, choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "System Unmute Test",
      "buttonSliderId" : "systemUnMute",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "SYSTEM_VOLUME", "MUTE", "VOICE" ],
      "enableSection" : [ "PLAY", "UNMUTE" ]
    },
    "VOICE" : {
      // Voice Selection R11, R12 SEC-11, SEC-39
      "id" : "21",
      "testName" : "Manual test for TTS Voice Selection",
      "instruction" : "Change Voice Selection and Click Play to test",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "TTS Voice Selection Test",
      "buttonSliderId" : "voices",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "SYSTEM_VOLUME", "MUTE", "UNMUTE" ],
      "enableSection" : [ "PLAY", "VOICE" ]
    },
    "FAILED" : {
      "id" : "22",
      "testName" : "TTS Manual Test",
      "instruction" : "",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
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
      "testName" : "Manual test for Set Capability",
      "instruction" : "Select Capability, Functionality and Click Set button",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you see capability changed in Property Grid Selection as per your selection,choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "Set Capability Test",
      "buttonSliderId" : "setCapability",
      "disableSection" : [ "getCapability" ],
      "enableSection" : [ "setCapability", "enableCapability",
          "disableCapability", "capabilityType" ]
    },
    "GET" : {
      "id" : "1",
      "testName" : "Manual test for Get Capability",
      "instruction" : "Select Capability and Click Get button",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>If you see capability changed in Property Grid Selection as per your selection,choose <b>Yes</b>. If not, choose <b>No</b></p>",
      "dialogTitle" : "Get Capability Test",
      "buttonSliderId" : "getCapability",
      "disableSection" : [ "setCapability", "enableCapability",
          "disableCapability", ],
      "enableSection" : [ "getCapability", "capabilityType" ]
    },
    "FAILED" : {
      "id" : "3",
      "testName" : "Get/Set Capability Manual Test",
      "instruction" : "",
      "testApi" : "",
      "testResult" : false,
      "details" : "",
      "testApi_certified" : "",
      "testApi_webspeech" : "",
      "testApi_SB" : "",
      "testApi_mobile" : "",
      "points" : "1",
      "required" : {
        "mobile" : true,
        "desktop" : true,
        "all" : true
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
