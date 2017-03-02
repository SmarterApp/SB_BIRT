var IRT_REPORT = {
  "_id" : {
    "$oid" : "58b729858c2c652838ab175f"
  },
  "jsCSS3TestGrid" : [ {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Backgrounds and Borders Level 3"
  }, {
    "details" : "80%",
    "testResult" : true,
    "testName" : "Backgrounds and Borders Level 4"
  }, {
    "details" : "59%",
    "testResult" : true,
    "testName" : "Image Values and Replaced Content"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Selectors Level 3"
  }, {
    "details" : "0%",
    "testResult" : false,
    "testName" : "Selectors Level 4"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Media Queries"
  }, {
    "details" : "71%",
    "testResult" : true,
    "testName" : "Basic User Interface"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Transitions"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Animations"
  }, {
    "details" : "86%",
    "testResult" : true,
    "testName" : "Transforms"
  }, {
    "details" : "57%",
    "testResult" : true,
    "testName" : "Text Level 3"
  }, {
    "details" : "20%",
    "testResult" : false,
    "testName" : "Text Level 4"
  }, {
    "details" : "36%",
    "testResult" : false,
    "testName" : "Text Decoration"
  }, {
    "details" : "53%",
    "testResult" : true,
    "testName" : "Fonts"
  }, {
    "details" : "93%",
    "testResult" : true,
    "testName" : "Writing Modes"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Color Level 3"
  }, {
    "details" : "50%",
    "testResult" : true,
    "testName" : "Color Level 4"
  }, {
    "details" : "98%",
    "testResult" : true,
    "testName" : "Multi-column Layout"
  }, {
    "details" : "69%",
    "testResult" : true,
    "testName" : "Values and Units"
  }, {
    "details" : "0%",
    "testResult" : false,
    "testName" : "Regions"
  }, {
    "details" : "0%",
    "testResult" : false,
    "testName" : "Speech"
  }, {
    "details" : "98%",
    "testResult" : true,
    "testName" : "Flexible Box Layout"
  }, {
    "details" : "0%",
    "testResult" : false,
    "testName" : "Grid Layout"
  }, {
    "details" : "11%",
    "testResult" : false,
    "testName" : "Box Alignment"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Cascading and Inheritance Level 3"
  }, {
    "details" : "0%",
    "testResult" : false,
    "testName" : "Cascading and Inheritance Level 4"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Conditional Rules"
  }, {
    "details" : "41%",
    "testResult" : false,
    "testName" : "Masking"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Compositing and Blending"
  }, {
    "details" : "98%",
    "testResult" : true,
    "testName" : "Shapes"
  }, {
    "details" : "0%",
    "testResult" : false,
    "testName" : "Exclusions"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Filter Effects"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Pointer Events"
  }, {
    "details" : "50%",
    "testResult" : true,
    "testName" : "Fullscreen API"
  }, {
    "details" : "72%",
    "testResult" : true,
    "testName" : "Fragmentation"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Positioning"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Will Change"
  }, {
    "details" : "0%",
    "testResult" : false,
    "testName" : "CSSOM View Module"
  }, {
    "details" : "0%",
    "testResult" : false,
    "testName" : "Ruby"
  }, {
    "details" : "0%",
    "testResult" : false,
    "testName" : "Scroll Snap Points"
  }, {
    "details" : "2%",
    "testResult" : false,
    "testName" : "Logical Properties"
  }, {
    "details" : "35%",
    "testResult" : false,
    "testName" : "Lists and Counters"
  }, {
    "details" : "40%",
    "testResult" : false,
    "testName" : "Overflow"
  }, {
    "details" : "100%",
    "testResult" : true,
    "testName" : "Containment"
  } ],
  "jsTTSGrid" : [
      {
        "testApi_SB" : "runtime.play",
        "isDeprecated" : false,
        "testPoints" : "1",
        "testApi_certified" : "browser.tts.speak",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.tts.speak",
        "details" : "",
        "id" : "1",
        "testResult" : true,
        "testApi" : "window.speechSynthesis.speak",
        "apiType" : [ "function" ],
        "testName" : "Speak text (text-to-speech synthesis)",
        "testApi_webspeech" : "window.speechSynthesis.speak"
      },
      {
        "testApi_SB" : "runtime.pause",
        "isDeprecated" : false,
        "testPoints" : "1",
        "testApi_certified" : "browser.tts.pause",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.tts.pause",
        "details" : "",
        "id" : "2",
        "testResult" : true,
        "testApi" : "window.speechSynthesis.pause",
        "apiType" : [ "function" ],
        "testName" : "Pause speech (text-to-speech synthesis)",
        "testApi_webspeech" : "window.speechSynthesis.pause"
      },
      {
        "testApi_SB" : "runtime.resume",
        "isDeprecated" : false,
        "testPoints" : "1",
        "testApi_certified" : "browser.tts.resume",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.tts.resume",
        "details" : "",
        "id" : "3",
        "testResult" : true,
        "testApi" : "window.speechSynthesis.resume",
        "apiType" : [ "function" ],
        "testName" : "Resume speech (text-to-speech synthesis)",
        "testApi_webspeech" : "window.speechSynthesis.resume"
      },
      {
        "testApi_SB" : "runtime.stop",
        "isDeprecated" : false,
        "testPoints" : "1",
        "testApi_certified" : "browser.tts.stop",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.tts.stop",
        "details" : "",
        "id" : "4",
        "testResult" : true,
        "testApi" : "window.speechSynthesis.cancel",
        "apiType" : [ "function" ],
        "testName" : "Stop speech (text-to-speech synthesis)",
        "testApi_webspeech" : "window.speechSynthesis.cancel"
      },
      {
        "testApi_SB" : "runtime.volume",
        "isDeprecated" : false,
        "testPoints" : "1",
        "testApi_certified" : "browser.tts.getVolume",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.device.ttsVolume",
        "details" : "",
        "id" : "5",
        "testResult" : true,
        "testApi" : "new SpeechSynthesisUtterance().volume",
        "apiType" : [ "function" ],
        "testName" : "Get/Set TTS volume API (text-to-speech synthesis)",
        "testApi_webspeech" : "new SpeechSynthesisUtterance().volume"
      },
      {
        "testApi_SB" : "runtime.pitch",
        "isDeprecated" : false,
        "testPoints" : "1",
        "testApi_certified" : "browser.tts.getPitch",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.device.ttsPitch",
        "details" : "",
        "id" : "6",
        "testResult" : true,
        "testApi" : "new SpeechSynthesisUtterance().pitch",
        "apiType" : [ "function" ],
        "testName" : "Get/Set TTS pitch API (text-to-speech synthesis)",
        "testApi_webspeech" : "new SpeechSynthesisUtterance().pitch"
      },
      {
        "testApi_SB" : "runtime.rate",
        "isDeprecated" : false,
        "testPoints" : "1",
        "testApi_certified" : "browser.tts.getRate",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.device.ttsRate",
        "details" : "",
        "id" : "7",
        "testResult" : true,
        "testApi" : "new SpeechSynthesisUtterance().rate",
        "apiType" : [ "function" ],
        "testName" : "Get/Set TTS rate API (text-to-speech synthesis)",
        "testApi_webspeech" : "new SpeechSynthesisUtterance().rate"
      },
      {
        "testApi_SB" : "runtime.status",
        "isDeprecated" : false,
        "testPoints" : "1",
        "testApi_certified" : "browser.tts.getStatus",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.tts.getStatus",
        "details" : "",
        "id" : "8",
        "testResult" : true,
        "testApi" : "(window.speechSynthesis.paused || window.speechSynthesis.pending || window.speechSynthesis.speaking)",
        "apiType" : [ "boolean", "function" ],
        "testName" : "Get speech status (text-to-speech synthesis)",
        "testApi_webspeech" : "(window.speechSynthesis.paused || window.speechSynthesis.pending || window.speechSynthesis.speaking)"
      },
      {
        "testApi_SB" : "runtime.voices",
        "isDeprecated" : false,
        "testPoints" : "1",
        "testApi_certified" : "browser.tts.getVoices",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.tts.getVoices",
        "details" : "",
        "id" : "9",
        "testResult" : true,
        "testApi" : "window.speechSynthesis.getVoices",
        "apiType" : [ "function" ],
        "testName" : "Get available voices (text-to-speech synthesis)",
        "testApi_webspeech" : "window.speechSynthesis.getVoices"
      },
      {
        "testApi_SB" : "runtime.voiceName",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.tts.getVoiceName",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.tts.voiceName",
        "details" : "",
        "id" : "10",
        "testResult" : false,
        "testApi" : "window.speechSynthesis.voicename",
        "apiType" : [ "object", "function" ],
        "testName" : "Get/Set TTS voice name API (text-to-speech synthesis)",
        "testApi_webspeech" : "window.speechSynthesis.voicename"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "play",
        "enableSection" : [ "PLAY" ],
        "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
            "RATE", "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Click Play to test TTS Speech",
        "details" : "",
        "dialogTitle" : "TTS Play Test",
        "id" : "11",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for TTS Speak",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "pause",
        "enableSection" : [ "PLAY", "PAUSE" ],
        "disableSection" : [ "RESUME", "STOP", "VOLUME", "PITCH", "RATE",
            "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Click Play and then Pause to test TTS Pause",
        "details" : "",
        "dialogTitle" : "TTS Pause Test",
        "id" : "12",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for TTS Pause",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>Did text-to-speech pause? If so choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "resume",
        "enableSection" : [ "PLAY", "PAUSE", "RESUME" ],
        "disableSection" : [ "STOP", "VOLUME", "PITCH", "RATE",
            "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Click Play, Pause, and then Resume to test TTS Resume",
        "details" : "",
        "dialogTitle" : "TTS Resume Test",
        "id" : "13",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for TTS Resume",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>Did text-to-speech resume? If so choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "stop",
        "enableSection" : [ "PLAY", "STOP" ],
        "disableSection" : [ "PAUSE", "RESUME", "VOLUME", "PITCH", "RATE",
            "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Click Play and then Stop to test TTS Stop",
        "details" : "",
        "dialogTitle" : "TTS Stop Test",
        "id" : "14",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for TTS Stop",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>Did text-to-speech stop? If so choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "ttsVolume",
        "enableSection" : [ "PLAY", "VOLUME" ],
        "disableSection" : [ "PAUSE", "RESUME", "STOP", "PITCH", "RATE",
            "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Change Volume and Click Play to test",
        "details" : "",
        "dialogTitle" : "TTS Volume Test",
        "id" : "15",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for TTS Volume",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "ttsPitch",
        "enableSection" : [ "PLAY", "PITCH" ],
        "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "RATE",
            "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Change Pitch and Click Play to test",
        "details" : "",
        "dialogTitle" : "TTS Pitch Test",
        "id" : "16",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for TTS Pitch",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "ttsRate",
        "enableSection" : [ "PLAY", "RATE" ],
        "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
            "SYSTEM_VOLUME", "MUTE", "UNMUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Change Rate and Click Play to test",
        "details" : "",
        "dialogTitle" : "TTS Rate Test",
        "id" : "17",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for TTS Rate",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "systemVolume",
        "enableSection" : [ "PLAY", "SYSTEM_VOLUME" ],
        "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
            "RATE", "MUTE", "UNMUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Change System Volume and Click Play to test",
        "details" : "",
        "dialogTitle" : "System Volume Test",
        "id" : "18",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for System Volume",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "systemMute",
        "enableSection" : [ "PLAY", "MUTE" ],
        "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
            "RATE", "SYSTEM_VOLUME", "UNMUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Click Mute and Click Play to test",
        "details" : "",
        "dialogTitle" : "System Mute Test",
        "id" : "19",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for System Mute",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you didn't hear the voice at all, choose <b>Yes</b>. If you did hear the voice, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "systemUnMute",
        "enableSection" : [ "PLAY", "UNMUTE" ],
        "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
            "RATE", "SYSTEM_VOLUME", "MUTE", "VOICE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Click Unmute and Click Play to test",
        "details" : "",
        "dialogTitle" : "System Unmute Test",
        "id" : "20",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for System Unmute",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you did hear the voice, choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "voices",
        "enableSection" : [ "PLAY", "VOICE" ],
        "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
            "RATE", "SYSTEM_VOLUME", "MUTE", "UNMUTE" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Change Voice Selection and Click Play to test",
        "details" : "",
        "dialogTitle" : "TTS Voice Selection Test",
        "id" : "21",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for TTS Voice Selection",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you heard the voice clearly with applied settings, choose <b>Yes</b>. If not, choose <b>No</b></p>"
      } ],
  "jsHTML5TestGrid" : [ {
    "details" : "5/5",
    "testResult" : true,
    "testName" : "Parsing rules"
  }, {
    "details" : "25/30",
    "testResult" : true,
    "testName" : "Elements"
  }, {
    "details" : "64/65",
    "testResult" : true,
    "testName" : "Forms"
  }, {
    "details" : "10/10",
    "testResult" : true,
    "testName" : "Web Components"
  }, {
    "details" : "20/20",
    "testResult" : true,
    "testName" : "Location and Orientation"
  }, {
    "details" : "8/10",
    "testResult" : true,
    "testName" : "Output"
  }, {
    "details" : "10/10",
    "testResult" : true,
    "testName" : "Input"
  }, {
    "details" : "29/33",
    "testResult" : true,
    "testName" : "Video"
  }, {
    "details" : "29/30",
    "testResult" : true,
    "testName" : "Audio"
  }, {
    "details" : "5/5",
    "testResult" : true,
    "testName" : "Streaming"
  }, {
    "details" : "15/15",
    "testResult" : true,
    "testName" : "Responsive images"
  }, {
    "details" : "24/25",
    "testResult" : true,
    "testName" : "2D Graphics"
  }, {
    "details" : "20/23",
    "testResult" : true,
    "testName" : "3D and VR"
  }, {
    "details" : "8/8",
    "testResult" : true,
    "testName" : "Animation"
  }, {
    "details" : "40/40",
    "testResult" : true,
    "testName" : "Communication"
  }, {
    "details" : "4/6",
    "testResult" : true,
    "testName" : "Streams"
  }, {
    "details" : "40/45",
    "testResult" : true,
    "testName" : "Peer To Peer"
  }, {
    "details" : "20/20",
    "testResult" : true,
    "testName" : "User interaction"
  }, {
    "details" : "12/12",
    "testResult" : true,
    "testName" : "Performance"
  }, {
    "details" : "26/32",
    "testResult" : true,
    "testName" : "Security"
  }, {
    "details" : "0/5",
    "testResult" : false,
    "testName" : "Payments"
  }, {
    "details" : "16/17",
    "testResult" : true,
    "testName" : "Web applications"
  }, {
    "details" : "35/35",
    "testResult" : true,
    "testName" : "Storage"
  }, {
    "details" : "15/15",
    "testResult" : true,
    "testName" : "Files"
  }, {
    "details" : "27/30",
    "testResult" : true,
    "testName" : "Scripting"
  }, {
    "details" : "9/9",
    "testResult" : true,
    "testName" : "Other"
  } ],
  "jsGrid" : [
      {
        "testApi_SB" : "SecureBrowser",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "window.browser",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "(new Summit.SecureBrowser.Mobile()).getNativeBrowser()",
        "details" : "window.browser is not defined",
        "id" : "1",
        "testResult" : false,
        "testApi" : "window.browser",
        "apiType" : [ "object" ],
        "testName" : "Browser global object check"
      },
      {
        "testApi_SB" : "runtime.getDeviceInfo",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.getDeviceInfo",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.getDeviceInfo",
        "details" : "browser is not defined",
        "id" : "2",
        "testResult" : false,
        "testApi" : "browser.security.getDeviceInfo",
        "apiType" : [ "function" ],
        "testName" : "Retrieve device details"
      },
      {
        "testApi_SB" : "runtime.getMACAddress",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.getMACAddress",
        "required" : {
          "all" : false
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.getMACAddress",
        "manualData" : true,
        "details" : "browser is not defined",
        "id" : "3",
        "testResult" : false,
        "testApi" : "browser.security.getMACAddress",
        "apiType" : [ "function" ],
        "testName" : "Retrieve system MAC address(es)"
      },
      {
        "testApi_SB" : "runtime.getIPAddressList",
        "isDeprecated" : true,
        "testPoints" : "1",
        "testApi_certified" : "browser.security.getIPAddressList",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.getIPAddressList",
        "details" : "As per specification, this API has been removed",
        "id" : "4",
        "testResult" : true,
        "testApi" : "browser.security.getIPAddressList",
        "apiType" : [ "function" ],
        "testName" : "Retrieve system IP address(es)"
      },
      {
        "testApi_SB" : "Mozilla.getPreference('bmakiosk.startup.timestamp')",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.settings.appStartTime",
        "required" : {
          "all" : false
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.getStartTime",
        "manualData" : true,
        "details" : "browser is not defined",
        "id" : "5",
        "testResult" : false,
        "testApi" : "browser.settings.appStartTime",
        "apiType" : [ "function" ],
        "testName" : "Get application start time"
      },
      {
        "testApi_SB" : "SecureBrowser.clearCache",
        "isDeprecated" : true,
        "testPoints" : "1",
        "testApi_certified" : "browser.security.clearCache",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.clearCache",
        "details" : "As per specification, this API has been removed",
        "id" : "6",
        "testResult" : true,
        "testApi" : "browser.security.clearCache",
        "apiType" : [ "function" ],
        "testName" : "Clear cache"
      },
      {
        "testApi_SB" : "SecureBrowser.emptyClipBoard",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.emptyClipBoard",
        "required" : {
          "all" : false
        },
        "points" : "1",
        "testApi_mobile" : "",
        "details" : "browser is not defined",
        "id" : "7",
        "testResult" : false,
        "testApi" : "browser.security.emptyClipBoard",
        "apiType" : [ "function" ],
        "testName" : "Empty Clipboard"
      },
      {
        "testApi_SB" : "SecureBrowser.clearCookies",
        "isDeprecated" : true,
        "testPoints" : "1",
        "testApi_certified" : "browser.security.clearCookies",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.clearCookies",
        "details" : "As per specification, this API has been removed",
        "id" : "8",
        "testResult" : true,
        "testApi" : "browser.security.clearCookies",
        "apiType" : [ "function" ],
        "testName" : "Clear Cookies"
      },
      {
        "testApi_SB" : "runtime.getRunningProcessList",
        "isDeprecated" : true,
        "testPoints" : "1",
        "testApi_certified" : "browser.security.getProcessList",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.getProcessList",
        "details" : "As per specification, this API has been removed",
        "id" : "9",
        "testResult" : true,
        "testApi" : "browser.security.getProcessList",
        "apiType" : [ "function" ],
        "testName" : "Get Process List"
      },
      {
        "testApi_SB" : "SecureBrowser.CloseWindow",
        "isDeprecated" : false,
        "testApi_certified_edge" : "browser.security.close",
        "testPoints" : "0",
        "testApi_certified" : "browser.security.closeWindow",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.close",
        "details" : "browser is not defined",
        "id" : "10",
        "testResult" : false,
        "testApi" : "browser.security.closeWindow",
        "apiType" : [ "function" ],
        "testName" : "Close browser"
      },
      {
        "testApi_SB" : "runtime.isEnvironmentSecure",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.isEnvironmentSecure",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.isEnvironmentSecure",
        "details" : "browser is not defined",
        "id" : "11",
        "testResult" : false,
        "testApi" : "browser.security.isEnvironmentSecure",
        "apiType" : [ "function" ],
        "testName" : "Is Environment Secure"
      },
      {
        "testApi_SB" : "runtime.enableLockDown",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.enableLockDown",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.enableLockdown",
        "details" : "browser is not defined",
        "id" : "12",
        "testResult" : false,
        "testApi" : "browser.security.enableLockDown",
        "apiType" : [ "function" ],
        "testName" : "Enable Lockdown"
      },
      {
        "testApi_SB" : "runtime.systemVolume",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.systemVolume",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.systemVolume",
        "details" : "browser is not defined",
        "id" : "13",
        "testResult" : false,
        "testApi" : "browser.systemVolume",
        "apiType" : [ "function" ],
        "testName" : "Get/Set System Volume"
      },
      {
        "testApi_SB" : "runtime.systemMute",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.systemMute",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.systemMute",
        "details" : "browser is not defined",
        "id" : "14",
        "testResult" : false,
        "testApi" : "browser.systemMute",
        "apiType" : [ "boolean" ],
        "testName" : "Mute/Unmute/IsMuted System Volume"
      },
      {
        "testApi_SB" : "runtime.examineProcessList",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.examineProcessList",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.examineProcessList",
        "details" : "browser is not defined",
        "id" : "15",
        "testResult" : false,
        "testApi" : "browser.security.examineProcessList",
        "apiType" : [ "function" ],
        "testName" : "Examine Process List"
      },
      {
        "testApi_SB" : "runtime.getCapability",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.getCapability",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.getCapability",
        "details" : "browser is not defined",
        "id" : "16",
        "testResult" : false,
        "testApi" : "browser.security.getCapability",
        "apiType" : [ "function" ],
        "testName" : "Get Capability"
      },
      {
        "testApi_SB" : "runtime.setCapability",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.setCapability",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.setCapability",
        "details" : "browser is not defined",
        "id" : "17",
        "testResult" : false,
        "testApi" : "browser.security.setCapability",
        "apiType" : [ "function" ],
        "testName" : "Set Capability"
      },
      {
        "testApi_SB" : "runtime.permissive",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.getPermissiveMode",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.getPermissiveMode",
        "details" : "browser is not defined",
        "id" : "18",
        "testResult" : false,
        "testApi" : "browser.security.getPermissiveMode",
        "apiType" : [ "boolean" ],
        "testName" : "Get permissive mode"
      },
      {
        "testApi_SB" : "runtime.permissive",
        "isDeprecated" : false,
        "testPoints" : "0",
        "testApi_certified" : "browser.security.setPermissiveMode",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "runtime.security.setPermissiveMode",
        "details" : "browser is not defined",
        "id" : "19",
        "testResult" : false,
        "testApi" : "browser.security.setPermissiveMode",
        "apiType" : [ "boolean" ],
        "testName" : "Set permissive mode"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "setCapability",
        "enableSection" : [ "setCapability", "enableCapability",
            "disableCapability", "capabilityType" ],
        "disableSection" : [ "getCapability" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Select Capability, Functionality and Click Set button",
        "details" : "",
        "dialogTitle" : "Set Capability Test",
        "id" : "1",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for Set Capability",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you see capability changed in Property Grid Selection as per your selection,choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "getCapability",
        "enableSection" : [ "getCapability", "capabilityType" ],
        "disableSection" : [ "setCapability", "enableCapability",
            "disableCapability" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "Select Capability and Click Get button",
        "details" : "",
        "dialogTitle" : "Get Capability Test",
        "id" : "1",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for Get Capability",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you see capability changed in Property Grid Selection as per your selection,choose <b>Yes</b>. If not, choose <b>No</b></p>"
      },
      {
        "testApi_SB" : "",
        "testPoints" : "1",
        "buttonSliderId" : "examineProcess",
        "enableSection" : [ "" ],
        "disableSection" : [ "" ],
        "testApi_certified" : "",
        "required" : {
          "all" : true
        },
        "points" : "1",
        "testApi_mobile" : "",
        "instruction" : "<ol><li>Select one or more processes from the 'Available' list and move them to the 'Selected' list and click the Examine button.</li><li>Any running forbidden apps found will be populated in the resulting grid.</li><li>Click OK to conclude this test.</li></ol>",
        "details" : "",
        "dialogTitle" : "Examine Process List Test",
        "id" : "1",
        "testResult" : true,
        "testApi" : "",
        "testName" : "Manual test for Examine Process List",
        "testApi_webspeech" : "",
        "dialogHtml" : "<p>If you see processes in Forbidden Running processes grid, as per your selection,choose <b>Yes</b>. If not, choose <b>No</b></p>"
      } ],
  "externalReportConfig" : {
    "jsCSS3TestGrid" : true,
    "jsTTSGrid" : false,
    "jsHTML5TestGrid" : true,
    "jsGrid" : false
  },
  "reportId" : "111"
};