/**
 * Javascript file to test TTS Manual Check for respective API, all the test are
 * given a constant number starting 1 for Play and so on.
 * 
 * 
 */

/* Constant for each test is defined in tts.js under TTS.Test */
var ttsSettingArray = Object.keys(TTS.Test);

// Initial ttsSetting set to UNKNOWN as no test started
var ttsSetting = TTS.Test.UNKNOWN;

/*
 * Initial value for currentTestIndex set as 0 so as to load first test (Play)
 * index from ttsSettingArray
 */
var currentTestIndex = 0;

var ttsOptionsEnabled = false;

function loadDialogBox(id, testName, testTitle, isNew) {

  var buttonText = "Skip Test";
  var isManualTestSupported = false;
  if (testName == 'TTS') {
    if (ttsImpl != null
        && !TTS.Manager._serviceFuncExists('isTTSAPINotSupported')) {
      isManualTestSupported = true;
    } else {
      var textMessage = messageResource.get("errorDialog." + testName,
          'message');
      id
          .html('<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>'
              + textMessage + '</p>');
    }
  }

  if (testName == 'HTML5') {

    var iframe = $('<iframe id="irphtml5test" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');

    isManualTestSupported = true;

    id = $("<div id='externalTest'></div>").append(iframe).appendTo("body");

    buttonText = 'Save Result';
  }

  if (isManualTestSupported) {
    id.dialog({
      autoOpen : false,
      width : '90%',
      height : 800,
      title : testTitle,
      position : {
        my : "center",
        at : "center",
        of : window
      },
      create : function(event, ui) {
        if (testName == 'TTS') {
          ttsComponentInitialize();
        }
      },
      buttons : [ {
        text : buttonText,
        click : function() {
          if (testName == 'TTS') {
            populateTTSResultIntoResultGrid();
          }
          if (testName == 'HTML5') {
            populateReportGridForHTML5();
            $(this).dialog("close");
          }
        }
      } ]
    });
  } else {
    id.dialog({
      resizable : false,
      height : "auto",
      title : testTitle,
      width : 400,
      modal : true,
      buttons : [ {
        text : "OK",
        click : function() {
          if (testName == 'TTS') {
            populateTTSResultIntoResultGrid();
          }
        }
      } ]
    });

  }

  if (testName == 'TTS') {
    if (isManualTestSupported) {
      id.dialog("open");
    } else {
      id.dialog("open");
      Util.Validation.setTTSManualTestResultItems('apiId.FAILED',
          'ttsManualTest.FAILED', null, false,
          'Error: Could not initialize TTS Support for this browser');
    }
  }

  if (testName == 'HTML5') {
    if (isManualTestSupported) {

      iframe.attr({
        src : '../html5test/html5test.html',
        width : '100%',
        height : '100%'
      });

      id.dialog("open");
    }
  }

}

function ttsComponentInitialize() {

  if (ttsSetting == TTS.Test.UNKNOWN) {

    ttsSetting = TTS.Test.PLAY;

  }

  createSlider($("#ttsVolume"), $("#ttsVolumeText"), 'Volume', 0, 10, 10);
  createSlider($("#ttsPitch"), $("#ttsPitchText"), 'Pitch', 0, 20, 10);
  createSlider($("#ttsRate"), $("#ttsRateText"), 'Rate', 0, 20, 10);
  createSlider($("#systemVolume"), $("#systemVolumeText"), 'System Volume', 0,
      10, 10);
  createButton($("#play"), 'Play');
  createButton($("#pause"), 'Pause');
  createButton($("#resume"), 'Resume');
  createButton($("#stop"), 'Stop');
  createButton($("#systemMute"), 'Mute');
  createButton($("#systemUnMute"), 'Ummute');
  loadVoices();
  disableTTSOptions();
  enableTTSOptions();
  populateJsonGrid();
  populateReportGridForTTS();
}

function populateTTSResultIntoResultGrid() {

  Util.Validation.mergeTTSResultIntoResult();

  $("#jsTTSGrid").jsGrid("refresh");

  $("#ttsManualTest").css("display", "none");

  $("#dialogTTS").dialog("close");

}

function createSlider(id, textId, text, minValue, maxValue, sliderValue) {

  id.slider({
    orientation : "horizontal",
    min : minValue,
    max : maxValue,
    value : sliderValue,
    range : "min",
    animate : true,
    create : function() {
      textId.text(text + ' (' + $(this).slider("value") + ')');
      var opt = $(this).data().uiSlider.options;
      // Get the number of possible values
      var vals = opt.max - opt.min;
      if (vals != 0) {
        var elMin = $('<label>' + (opt.min) + '</label>').css('left',
            (opt.min / vals * 100) + '%');
        var elMax = $('<label>' + (opt.max) + '</label>').css('left',
            (opt.max / vals * 100) + '%');
        id.append(elMin);
        id.append(elMax);
      }
    }
  });

  id.on("slidechange", function(event, ui) {
    textId.text(text + ' (' + ui.value + ')');
    if (text == 'Volume') {
      setTTSVolume(ui.value);
    } else if (text == 'Pitch') {
      setTTSPitch(ui.value);
    } else if (text == 'Rate') {
      setTTSRate(ui.value);
    } else if (text == 'System Volume') {
      setSystemVolume(ui.value);
    }
  });

}

function createButton(id, text) {

  id.button();
  id.click(function(event) {

    if (text == 'Play') {
      ttsPlay();
    } else if (text == 'Pause') {
      ttsPause();
    } else if (text == 'Resume') {
      ttsResume();
    } else if (text == 'Stop') {
      ttsStop();
    } else if (text == 'Mute' || text == 'Ummute') {
      id.addClass("irp-custom-button-click");
      $("#play").focus();
      muteUnmuteSystem();
    }

    event.preventDefault();
  });

}

function loadVoices() {
  if (isMobile) {
    var voices = ttsImpl.getVoices();
    if (voices) {
      var selectList = document.getElementById("voices");
      var voiceArray = new Array();
      for (var i = 0; i < voices.length; i++) {
        var opt = document.createElement("option");
        var voice = voices[i];
        voiceArray[i] = voice.language + " " + (voice.voice ? voice.voice : "");
        opt.value = JSON.stringify(voice);
        opt.text = voice.language;
        selectList.options.add(opt);
      }
    } else {
      alert("cannot retrieve voice packs");
    }
  } else {
    if (!!ttsImpl.getVoices) {
      // alert(r.voices);
      var voicelist = ttsImpl.getVoices();
      var selectList = document.getElementById("voices");
      for (var i = 0; i < voicelist.length; i++) {
        var opt = document.createElement("option");
        opt.text = voicelist[i];
        opt.value = voicelist[i];
        selectList.options.add(opt);
      }
    } else {
      alert("Cannot retrieve system voice list");
    }
  }
}

function setVoice() {
  // ttsSetting = TTS.Test.VOICE;
  ttsImpl.setVoice($("#voices").val());
}

function ttsPlay() {

  var text = $("textarea#ttsText").val();
  ttsImpl.stop();
  ttsImpl.play(text);

  if (ttsSetting == TTS.Test.PLAY) {

    setDialogHtml();

    loadTTSDialogConfirm();
  } else if (ttsOptionsEnabled) {
    setDialogHtml();

    loadTTSDialogConfirm();
  }
}

function ttsPause() {

  ttsImpl.pause();

  if (ttsSetting == TTS.Test.PAUSE) {

    setDialogHtml();

    loadTTSDialogConfirm();
  }

}

function ttsResume() {

  // ttsSetting = TTS.Test.RESUME;

  setDialogHtml();

  ttsImpl.resume();

  loadTTSDialogConfirm();

}

function ttsStop() {

  // ttsSetting = TTS.Test.STOP;

  setDialogHtml();

  ttsImpl.stop();

  loadTTSDialogConfirm();

}

function setTTSVolume(level) {
  // ttsSetting = TTS.Test.VOLUME;

  if (ttsImpl.supportsVolumeControl()) {
    ttsImpl.setVolume(level);
  }
}

function setTTSPitch(level) {
  // ttsSetting = TTS.Test.PITCH;

  if (ttsImpl.supportsPitchControl()) {
    ttsImpl.setPitch(level);
  }
}

function setTTSRate(level) {
  // ttsSetting = TTS.Test.RATE;
  if (ttsImpl.supportsRateControl()) {
    ttsImpl.setRate(level);
  }
}

function setSystemVolume(level) {
  // ttsSetting = TTS.Test.SYSTEM_VOLUME;
  if (!!ttsImpl.setSystemVolume) {
    ttsImpl.setSystemVolume(level);
  }
}

function getTTSStatus() {
  return ttsImpl.getStatus();
}

function muteUnmuteSystem() {
  // ttsSetting = TTS.Test.MUTE_UNMUTE;
  if (!!ttsImpl.setsystemMute) {
    ttsImpl.setsystemMute();

    // setMuteUnMuteButtonText();
  }
}

function setMuteUnMuteButtonText() {
  if (!!ttsImpl.getsystemMute) {
    if (ttsImpl.getsystemMute()) {
      $('button#systemMute').text('Unmute');
    } else {
      $('button#systemMute').text('Mute');
    }
  } else {
    $('button#systemMute').text('Mute/UnMute');
  }
}

function populateJsonGrid() {

  /**
   * Loading first test to test TTS Speak.
   */
  var ttsGridArray = [];
  ttsGridArray.push({
    "testName" : messageResource.get("ttsTest." + ttsSetting, 'message'),
    "testResult" : null
  });

  $("#ttsGrid")
      .jsGrid(
          {
            width : "100%",
            data : ttsGridArray,
            selecting : false,

            fields : [
                {
                  title : "Test Name",
                  name : "testName",
                  type : "text",
                  width : 150
                },
                {
                  title : "Result",
                  name : "testResult",
                  type : "text",
                  width : 30,
                  align : "center",

                  itemTemplate : function(value) {
                    if (value == null) {
                      return "";
                    } else if (value) {
                      return '<img alt="passed" src="../../../Shared/images/passed.jpg" height="30px" width="40px">';
                    } else {
                      return '<img alt="failed" src="../../../Shared/images/failed.jpg" height="30px" width="40px">';
                    }

                  }

                }

            ]
          });
}

function getTTSTestGridItem(gridIndex) {

  return $("#ttsGrid").data("JSGrid").data[gridIndex];

}

function loadTTSDialogConfirm() {

  $("#dialog-confirm").dialog({
    resizable : false,
    height : "auto",
    title : messageResource.get("ttsDialogTitle." + ttsSetting, 'message'),
    width : 400,
    modal : true,
    buttons : [ {
      text : "Yes",
      click : function() {
        closeConfirmBox(true);
      }
    }, {
      text : "No",
      click : function() {
        closeConfirmBox(false);
      }
    }, {
      text : "Retry",
      click : function() {
        $(this).dialog("close");
      }
    } ]
  });
}

function closeConfirmBox(result) {

  $("#dialog-confirm").dialog("close");

  if (ttsSetting == ttsSettingArray[currentTestIndex]) {
    $("#ttsGrid").jsGrid("updateItem", getTTSTestGridItem(currentTestIndex),
        Util.Validation.setTTSItemDetail(ttsSetting, result));

    Util.Validation.getTTSManualResult()[currentTestIndex].testResult = result;
    Util.Validation.getTTSManualResult()[currentTestIndex].details = '';

    loadNextTTSTest();
  }

}

function loadNextTTSTest() {
  currentTestIndex = currentTestIndex + 1;
  if (currentTestIndex < ttsSettingArray.length - 1) {
    ttsSetting = ttsSettingArray[currentTestIndex];
    $("#ttsGrid").jsGrid("insertItem",
        Util.Validation.setTTSItemDetail(ttsSetting, null));

    disableTTSOptions();
    enableTTSOptions();
  } else {
    changeDialogBoxButtonText($('#dialogTTS'), 'Done');
    disableTTSOptions();
  }
}

function changeDialogBoxButtonText(id, buttonText) {
  var buttons = id.dialog("option", "buttons");
  buttons[0].text = buttonText;
  id.dialog("option", "buttons", buttons);
}

function setDialogHtml() {

  $("#dialog-confirm").html(
      messageResource.get("ttsDialogHtml." + ttsSetting, 'message'));

}

function disableTTSOptions() {

  var disableIds = null;
  disableIds = messageResource.get("ttsTest.disableSection." + ttsSetting,
      'message');

  /**
   * Disabling all option once all test are completed currently we have 11 test
   */
  if (currentTestIndex == ttsSettingArray.length - 1) {
    disableIds = messageResource.get("ttsTest.disableSection.ALL", 'message');
  }

  var disableArray = disableIds.split(",");

  disableArray.forEach(function(item, index, array) {

    var buttonSliderId = messageResource.get("ttsButtonSliderId." + item,
        'message');

    if ($('#' + buttonSliderId).is(":ui-button")) {
      $('#' + buttonSliderId).button("disable");
      $("#" + buttonSliderId).removeClass("irp-custom-button-click");
    } else if ($('#' + buttonSliderId).is(":ui-slider")) {
      $('#' + buttonSliderId).slider("disable");
      $('#' + buttonSliderId).slider("option", "value", 10);
    } else {
      document.getElementById(buttonSliderId).disabled = true;
    }

  });
}

function enableTTSOptions() {
  var enableIds = messageResource.get("ttsTest.enableSection." + ttsSetting,
      'message');

  var enableArray = enableIds.split(",");

  enableArray.forEach(function(item, index, array) {

    var buttonSliderId = messageResource.get("ttsButtonSliderId." + item,
        'message');

    if ($('#' + buttonSliderId).is(":ui-button")) {
      $('#' + buttonSliderId).button("enable");
    } else if ($('#' + buttonSliderId).is(":ui-slider")) {
      $('#' + buttonSliderId).slider("enable");
      ttsOptionsEnabled = true;

      /**
       * Enabling Instruction to use sliders for test where its define constant
       * is greater than 3
       */
      $("#ttsOptions").show();
    } else {
      document.getElementById(buttonSliderId).disabled = false;
    }

  });
}

function populateReportGridForTTS() {

  ttsSettingArray.forEach(function(item, index, array) {
    if (item != TTS.Test.UNKNOWN)
      Util.Validation.setTTSManualTestResultItems('apiId.' + item,
          'ttsManualTest.' + item, null, false, 'Test not performed');
  });

}

function populateReportGridForHTML5() {

  var iframeObj = document.getElementById('irphtml5test');
  populateResults($("#jsHTML5TestGrid"),
      iframeObj.contentWindow.html5TestArray, true);

  $("#html5TestHeader").html(iframeObj.contentWindow.htmlScoreHTML);

  $("#html5ManualTest").css("display", "none");
}
