var IRT_REPORT = {
  "externalReportConfig" : {
    "jsGrid" : false,
    "jsTTSGrid" : false,
    "jsHTML5TestGrid" : true,
    "jsCSS3TestGrid" : true
  },
  "jsGrid" : [
      {
        "id" : "1",
        "testName" : "Browser global object check",
        "testApi" : "window.browser",
        "testResult" : false,
        "details" : "window.browser is not defined",
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
      {
        "id" : "2",
        "testName" : "Retrieve device details",
        "testApi" : "browser.security.getDeviceInfo",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "3",
        "testName" : "Retrieve system MAC address(es)",
        "testApi" : "browser.security.getMACAddress",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "4",
        "testName" : "Retrieve system IP address(es)",
        "testApi" : "browser.security.getIPAddressList",
        "testResult" : true,
        "details" : "As per specification, this API has been removed",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : true
      },
      {
        "id" : "5",
        "testName" : "Get application start time",
        "testApi" : "browser.security.getStartTime",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "6",
        "testName" : "Clear cache",
        "testApi" : "browser.security.clearCache",
        "testResult" : true,
        "details" : "As per specification, this API has been removed",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : true
      },
      {
        "id" : "7",
        "testName" : "Empty Clipboard",
        "testApi" : "browser.security.emptyClipBoard",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "8",
        "testName" : "Clear Cookies",
        "testApi" : "browser.security.clearCookies",
        "testResult" : true,
        "details" : "As per specification, this API has been removed",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : true
      },
      {
        "id" : "9",
        "testName" : "Get Process List",
        "testApi" : "browser.security.getProcessList",
        "testResult" : true,
        "details" : "As per specification, this API has been removed",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : true
      },
      {
        "id" : "10",
        "testName" : "Close browser",
        "testApi" : "browser.security.closeWindow",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "11",
        "testName" : "Is Environment Secure",
        "testApi" : "browser.security.isEnvironmentSecure",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "12",
        "testName" : "Enable Lockdown",
        "testApi" : "browser.security.enableLockDown",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "13",
        "testName" : "Get/Set System Volume",
        "testApi" : "browser.systemVolume",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "14",
        "testName" : "Mute/Unmute/IsMuted System Volume",
        "testApi" : "browser.systemMute",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "15",
        "testName" : "Examine Process List",
        "testApi" : "browser.security.examineProcessList",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "16",
        "testName" : "Get Capability",
        "testApi" : "browser.security.getCapability",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "17",
        "testName" : "Set Capability",
        "testApi" : "browser.security.setCapability",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "18",
        "testName" : "Get permissive mode",
        "testApi" : "browser.security.getPermissiveMode",
        "testResult" : false,
        "details" : "browser is not defined",
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
      {
        "id" : "19",
        "testName" : "Set permissive mode",
        "testApi" : "browser.security.setPermissiveMode",
        "testResult" : false,
        "details" : "browser is not defined",
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
      },
      {
        "id" : "3",
        "testName" : "Get/Set Capability Manual Test",
        "instruction" : "",
        "testApi" : "",
        "testResult" : false,
        "details" : "Error: Could not initialize Get/Set Capability Support for this browser",
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
      } ],
  "jsTTSGrid" : [
      {
        "id" : "1",
        "testName" : "Speak text (text-to-speech synthesis)",
        "testApi" : "window.speechSynthesis.speak",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : false
      },
      {
        "id" : "2",
        "testName" : "Pause speech (text-to-speech synthesis)",
        "testApi" : "window.speechSynthesis.pause",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : false
      },
      {
        "id" : "3",
        "testName" : "Resume speech (text-to-speech synthesis)",
        "testApi" : "window.speechSynthesis.resume",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : false
      },
      {
        "id" : "4",
        "testName" : "Stop speech (text-to-speech synthesis)",
        "testApi" : "window.speechSynthesis.cancel",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : false
      },
      {
        "id" : "5",
        "testName" : "Get/Set TTS volume API (text-to-speech synthesis)",
        "testApi" : "new SpeechSynthesisUtterance().volume",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : false
      },
      {
        "id" : "6",
        "testName" : "Get/Set TTS pitch API (text-to-speech synthesis)",
        "testApi" : "new SpeechSynthesisUtterance().pitch",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : false
      },
      {
        "id" : "7",
        "testName" : "Get/Set TTS rate API (text-to-speech synthesis)",
        "testApi" : "new SpeechSynthesisUtterance().rate",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : false
      },
      {
        "id" : "8",
        "testName" : "Get speech status (text-to-speech synthesis)",
        "testApi" : "(window.speechSynthesis.paused || window.speechSynthesis.pending || window.speechSynthesis.speaking)",
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
        "testPoints" : "1",
        "apiType" : [ "boolean", "function" ],
        "isDeprecated" : false
      },
      {
        "id" : "9",
        "testName" : "Get available voices (text-to-speech synthesis)",
        "testApi" : "window.speechSynthesis.getVoices",
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
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : false
      },
      {
        "id" : "10",
        "testName" : "Get/Set TTS voice name API (text-to-speech synthesis)",
        "testApi" : "window.speechSynthesis.voicename",
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
      },
      {
        "id" : "11",
        "testName" : "Manual test for TTS Speak",
        "instruction" : "Click Play to test TTS Speech",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      {
        "id" : "12",
        "testName" : "Manual test for TTS Pause",
        "instruction" : "Click Play and then Pause to test TTS Pause",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      {
        "id" : "13",
        "testName" : "Manual test for TTS Resume",
        "instruction" : "Click Play, Pause, and then Resume to test TTS Resume",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
        "disableSection" : [ "STOP", "VOLUME", "PITCH", "RATE",
            "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
        "enableSection" : [ "PLAY", "PAUSE", "RESUME" ]
      },
      {
        "id" : "14",
        "testName" : "Manual test for TTS Stop",
        "instruction" : "Click Play and then Stop to test TTS Stop",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      {
        "id" : "15",
        "testName" : "Manual test for TTS Volume",
        "instruction" : "Change Volume and Click Play to test",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      {
        "id" : "16",
        "testName" : "Manual test for TTS Pitch",
        "instruction" : "Change Pitch and Click Play to test",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      {
        "id" : "17",
        "testName" : "Manual test for TTS Rate",
        "instruction" : "Change Rate and Click Play to test",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      {
        "id" : "18",
        "testName" : "Manual test for System Volume",
        "instruction" : "Change System Volume and Click Play to test",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      {
        "id" : "19",
        "testName" : "Manual test for System Mute",
        "instruction" : "Click Mute and Click Play to test",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      {
        "id" : "20",
        "testName" : "Manual test for System Unmute",
        "instruction" : "Click Unmute and Click Play to test",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      {
        "id" : "21",
        "testName" : "Manual test for TTS Voice Selection",
        "instruction" : "Change Voice Selection and Click Play to test",
        "testApi" : "",
        "testResult" : false,
        "details" : "Test not performed",
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
      } ],
  "jsHTML5TestGrid" : [ {
    "testName" : "Parsing rules",
    "testResult" : true,
    "details" : "5/5"
  }, {
    "testName" : "Elements",
    "testResult" : true,
    "details" : "25/30"
  }, {
    "testName" : "Forms",
    "testResult" : true,
    "details" : "64/65"
  }, {
    "testName" : "Web Components",
    "testResult" : true,
    "details" : "10/10"
  }, {
    "testName" : "Location and Orientation",
    "testResult" : true,
    "details" : "20/20"
  }, {
    "testName" : "Output",
    "testResult" : true,
    "details" : "8/10"
  }, {
    "testName" : "Input",
    "testResult" : true,
    "details" : "10/10"
  }, {
    "testName" : "Video",
    "testResult" : true,
    "details" : "29/33"
  }, {
    "testName" : "Audio",
    "testResult" : true,
    "details" : "29/30"
  }, {
    "testName" : "Streaming",
    "testResult" : true,
    "details" : "5/5"
  }, {
    "testName" : "Responsive images",
    "testResult" : true,
    "details" : "15/15"
  }, {
    "testName" : "2D Graphics",
    "testResult" : true,
    "details" : "24/25"
  }, {
    "testName" : "3D and VR",
    "testResult" : true,
    "details" : "20/23"
  }, {
    "testName" : "Animation",
    "testResult" : true,
    "details" : "8/8"
  }, {
    "testName" : "Communication",
    "testResult" : true,
    "details" : "40/40"
  }, {
    "testName" : "Streams",
    "testResult" : true,
    "details" : "4/6"
  }, {
    "testName" : "Peer To Peer",
    "testResult" : true,
    "details" : "40/45"
  }, {
    "testName" : "User interaction",
    "testResult" : true,
    "details" : "20/20"
  }, {
    "testName" : "Performance",
    "testResult" : true,
    "details" : "12/12"
  }, {
    "testName" : "Security",
    "testResult" : true,
    "details" : "26/32"
  }, {
    "testName" : "Payments",
    "testResult" : false,
    "details" : "0/5"
  }, {
    "testName" : "Web applications",
    "testResult" : true,
    "details" : "16/17"
  }, {
    "testName" : "Storage",
    "testResult" : true,
    "details" : "35/35"
  }, {
    "testName" : "Files",
    "testResult" : true,
    "details" : "15/15"
  }, {
    "testName" : "Scripting",
    "testResult" : true,
    "details" : "27/30"
  }, {
    "testName" : "Other",
    "testResult" : true,
    "details" : "9/9"
  } ],
  "jsCSS3TestGrid" : [ {
    "testName" : "Backgrounds and Borders Level 3",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Backgrounds and Borders Level 4",
    "testResult" : true,
    "details" : "80%"
  }, {
    "testName" : "Image Values and Replaced Content",
    "testResult" : true,
    "details" : "59%"
  }, {
    "testName" : "Selectors Level 3",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Selectors Level 4",
    "testResult" : false,
    "details" : "0%"
  }, {
    "testName" : "Media Queries",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Basic User Interface",
    "testResult" : true,
    "details" : "71%"
  }, {
    "testName" : "Transitions",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Animations",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Transforms",
    "testResult" : true,
    "details" : "86%"
  }, {
    "testName" : "Text Level 3",
    "testResult" : true,
    "details" : "57%"
  }, {
    "testName" : "Text Level 4",
    "testResult" : false,
    "details" : "20%"
  }, {
    "testName" : "Text Decoration",
    "testResult" : false,
    "details" : "36%"
  }, {
    "testName" : "Fonts",
    "testResult" : true,
    "details" : "53%"
  }, {
    "testName" : "Writing Modes",
    "testResult" : true,
    "details" : "93%"
  }, {
    "testName" : "Color Level 3",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Color Level 4",
    "testResult" : true,
    "details" : "50%"
  }, {
    "testName" : "Multi-column Layout",
    "testResult" : true,
    "details" : "98%"
  }, {
    "testName" : "Values and Units",
    "testResult" : true,
    "details" : "69%"
  }, {
    "testName" : "Regions",
    "testResult" : false,
    "details" : "0%"
  }, {
    "testName" : "Speech",
    "testResult" : false,
    "details" : "0%"
  }, {
    "testName" : "Flexible Box Layout",
    "testResult" : true,
    "details" : "98%"
  }, {
    "testName" : "Grid Layout",
    "testResult" : false,
    "details" : "0%"
  }, {
    "testName" : "Box Alignment",
    "testResult" : false,
    "details" : "11%"
  }, {
    "testName" : "Cascading and Inheritance Level 3",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Cascading and Inheritance Level 4",
    "testResult" : false,
    "details" : "0%"
  }, {
    "testName" : "Conditional Rules",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Masking",
    "testResult" : false,
    "details" : "41%"
  }, {
    "testName" : "Compositing and Blending",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Shapes",
    "testResult" : true,
    "details" : "98%"
  }, {
    "testName" : "Exclusions",
    "testResult" : false,
    "details" : "0%"
  }, {
    "testName" : "Filter Effects",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Pointer Events",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Fullscreen API",
    "testResult" : true,
    "details" : "50%"
  }, {
    "testName" : "Fragmentation",
    "testResult" : true,
    "details" : "72%"
  }, {
    "testName" : "Positioning",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "Will Change",
    "testResult" : true,
    "details" : "100%"
  }, {
    "testName" : "CSSOM View Module",
    "testResult" : false,
    "details" : "0%"
  }, {
    "testName" : "Ruby",
    "testResult" : false,
    "details" : "0%"
  }, {
    "testName" : "Scroll Snap Points",
    "testResult" : false,
    "details" : "0%"
  }, {
    "testName" : "Logical Properties",
    "testResult" : false,
    "details" : "2%"
  }, {
    "testName" : "Lists and Counters",
    "testResult" : false,
    "details" : "35%"
  }, {
    "testName" : "Overflow",
    "testResult" : false,
    "details" : "40%"
  }, {
    "testName" : "Containment",
    "testResult" : true,
    "details" : "100%"
  } ]
};