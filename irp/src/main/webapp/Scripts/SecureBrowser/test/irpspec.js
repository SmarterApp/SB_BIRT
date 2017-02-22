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
var browsermanual_section = 'BROWSER_MANUAL';
var irpApiSpecConstant = 'IRT.ApiSpecs';

var specMessage = "message";
var specTTSApi = "ttsapi";
var specTTSManualApi = "ttsmanualapi";
var specBrowserapi = "browserapi";
var specBrowserManualApi = "browsermanualapi";
var specSeparator = ".";
/**
 * Comments
 */
IRT.ApiSpecs = {
  "message" : {
    "testApi_removed" : "As per specification, this API has been removed",
    "testApi_exists" : "This deprecated API still exists",
    "errorDialog_TTS" : "Your browser does not support TTS, so manual testing will be skipped",
    "errorDialog_CAPABILITY" : "Your browser does not support GET/SET Capability, so manual testing will be skipped",
    "disable_all" : [ "PLAY", "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
        "RATE", "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ]
  },
  "browserapi" : {
    // R01. Expose a window global object called `browser` SEC-1 R01 F35
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
  "browsermanualapi" : {
    "FAILED" : {
      "id" : "1",
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
