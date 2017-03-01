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
        "testApi_SB" : "SecureBrowser",
        "testApi_mobile" : "(new Summit.SecureBrowser.Mobile()).getNativeBrowser()",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.getDeviceInfo",
        "testApi_mobile" : "runtime.security.getDeviceInfo",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.getMACAddress",
        "testApi_mobile" : "runtime.security.getMACAddress",
        "points" : "1",
        "required" : {
          "all" : false
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
        "testApi_SB" : "runtime.getIPAddressList",
        "testApi_mobile" : "runtime.security.getIPAddressList",
        "points" : "1",
        "required" : {
          "all" : true
        },
        "testPoints" : "1",
        "apiType" : [ "function" ],
        "isDeprecated" : true
      },
      {
        "id" : "5",
        "testName" : "Get application start time",
        "testApi" : "browser.settings.appStartTime",
        "testResult" : false,
        "details" : "browser is not defined",
        "testApi_certified" : "browser.settings.appStartTime",
        "testApi_SB" : "Mozilla.getPreference('bmakiosk.startup.timestamp')",
        "testApi_mobile" : "runtime.security.getStartTime",
        "points" : "1",
        "required" : {
          "all" : false
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
        "testApi_SB" : "SecureBrowser.clearCache",
        "testApi_mobile" : "runtime.security.clearCache",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "SecureBrowser.emptyClipBoard",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
          "all" : false
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
        "testApi_SB" : "SecureBrowser.clearCookies",
        "testApi_mobile" : "runtime.security.clearCookies",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.getRunningProcessList",
        "testApi_mobile" : "runtime.security.getProcessList",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.isEnvironmentSecure",
        "testApi_mobile" : "runtime.security.isEnvironmentSecure",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.enableLockDown",
        "testApi_mobile" : "runtime.security.enableLockdown",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.systemVolume",
        "testApi_mobile" : "runtime.systemVolume",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.systemMute",
        "testApi_mobile" : "runtime.systemMute",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.examineProcessList",
        "testApi_mobile" : "runtime.security.examineProcessList",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.getCapability",
        "testApi_mobile" : "runtime.security.getCapability",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.setCapability",
        "testApi_mobile" : "runtime.security.setCapability",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.permissive",
        "testApi_mobile" : "runtime.security.getPermissiveMode",
        "points" : "1",
        "required" : {
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
        "testApi_SB" : "runtime.permissive",
        "testApi_mobile" : "runtime.security.setPermissiveMode",
        "points" : "1",
        "required" : {
          "all" : true
        },
        "testPoints" : "0",
        "apiType" : [ "boolean" ],
        "isDeprecated" : false
      },
      {
        "id" : "1",
        "testName" : "Manual test for Examine Process List",
        "instruction" : "<ol><li>Select one or more processes from the 'Available' list and move them to the 'Selected' list and click the Examine button.</li><li>Any running forbidden apps found will be populated in the resulting grid.</li><li>Click OK to conclude this test.</li></ol>",
        "testApi" : "",
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
          "all" : true
        },
        "testPoints" : "0",
        "dialogHtml" : "<p>If you see processes in Forbidden Running processes grid, as per your selection,choose <b>Yes</b>. If not, choose <b>No</b></p>",
        "dialogTitle" : "Examine Process List Test",
        "buttonSliderId" : "examineProcess",
        "disableSection" : [ "" ],
        "enableSection" : [ "" ]
      },
      {
        "id" : "1",
        "testName" : "Manual test for Set Capability",
        "instruction" : "Select Capability, Functionality and Click Set button",
        "testApi" : "",
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
      {
        "id" : "1",
        "testName" : "Manual test for Get Capability",
        "instruction" : "Select Capability and Click Get button",
        "testApi" : "",
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
          "all" : true
        },
        "testPoints" : "0",
        "dialogHtml" : "<p>If you see capability changed in Property Grid Selection as per your selection,choose <b>Yes</b>. If not, choose <b>No</b></p>",
        "dialogTitle" : "Get Capability Test",
        "buttonSliderId" : "getCapability",
        "disableSection" : [ "setCapability", "enableCapability",
            "disableCapability" ],
        "enableSection" : [ "getCapability", "capabilityType" ]
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
        "details" : "window.speechSynthesis.voicename is not defined",
        "testApi_certified" : "browser.tts.getVoiceName",
        "testApi_webspeech" : "window.speechSynthesis.voicename",
        "testApi_SB" : "runtime.voiceName",
        "testApi_mobile" : "runtime.tts.voiceName",
        "points" : "1",
        "required" : {
          "all" : true
        },
        "testPoints" : "0",
        "apiType" : [ "object" ],
        "isDeprecated" : false
      },
      {
        "id" : "11",
        "testName" : "Manual test for TTS Speak",
        "instruction" : "Click Play to test TTS Speech",
        "testApi" : "",
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
        "testResult" : null,
        "details" : "Test not performed by user",
        "testApi_certified" : "",
        "testApi_webspeech" : "",
        "testApi_SB" : "",
        "testApi_mobile" : "",
        "points" : "1",
        "required" : {
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
    "id" : "1",
    "testName" : "HTML5 Test",
    "instruction" : "",
    "testApi" : "",
    "testResult" : null,
    "details" : "Test not performed by user",
    "testApi_certified" : "",
    "testApi_webspeech" : "",
    "testApi_SB" : "",
    "testApi_mobile" : "",
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
  } ],
  "jsCSS3TestGrid" : [ {
    "id" : "2",
    "testName" : "CSS3 Test",
    "instruction" : "",
    "testApi" : "",
    "testResult" : null,
    "details" : "Test not performed by user",
    "testApi_certified" : "",
    "testApi_webspeech" : "",
    "testApi_SB" : "",
    "testApi_mobile" : "",
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
  } ]
};