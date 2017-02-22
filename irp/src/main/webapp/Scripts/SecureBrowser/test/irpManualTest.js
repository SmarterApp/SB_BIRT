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

  var buttonDisable = false;
  var buttonText = "Skip Test";
  var isManualTestSupported = false;
  var dialogWidth = '90%';
  var dialogHeight = 800;
  if (testName == 'TTS') {
    if (ttsImpl != null
        && !TTS.Manager._serviceFuncExists('isTTSAPINotSupported')) {
      isManualTestSupported = true;
    } else {
      var textMessage = eval(irpApiSpecConstant + specSeparator + specMessage
          + specSeparator + "errorDialog_" + testName);
      id
          .html('<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>'
              + textMessage + '</p>');
    }
  }

  if (testName == 'HTML5') {

    var iframe = $('<iframe id="irpHTML5Test" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');

    isManualTestSupported = true;

    id = $("<div id='externalHTML5Test'></div>").append(iframe)
        .appendTo("body");

    buttonText = 'Running...';
    buttonDisable = true;
  }

  if (testName == 'CSS3') {

    var iframe = $('<iframe id="irpCSS3Test" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');

    isManualTestSupported = true;

    id = $("<div id='externalCSS3Test'></div>").append(iframe).appendTo("body");

    buttonText = 'Running...';
    buttonDisable = true;
  }

  if (testName == 'CAPABILITY') {
    if (impl != null && !!impl.setCapability && !!impl.getCapability) {
      var dialogWidth = '60%';
      var dialogHeight = 500;
      isManualTestSupported = true;
    } else {
      var textMessage = eval(irpApiSpecConstant + specSeparator + specMessage
          + specSeparator + "errorDialog_" + testName);
      id
          .html('<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>'
              + textMessage + '</p>');
    }
  }

  if (isManualTestSupported) {
    id.dialog({
      autoOpen : false,
      width : dialogWidth,
      height : dialogHeight,
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
        id : "dialogButton",
        disabled : buttonDisable,
        text : buttonText,
        click : function() {
          if (testName == 'TTS') {
            populateTTSResultIntoResultGrid(testName, $("#jsTTSGrid"),
                $("#ttsManualTest"), id);
          }
          if (testName == 'HTML5') {
            populateReportGridForExternalTest($("#jsHTML5TestGrid"),
                $("#html5TestHeader"), $("#html5ManualTest"), testName, id);

          }
          if (testName == 'CSS3') {
            populateReportGridForExternalTest($("#jsCSS3TestGrid"),
                $("#css3TestHeader"), $("#css3ManualTest"), testName, id);

          }
          if (testName == 'CAPABILITY') {
            populateTTSResultIntoResultGrid(testName, $("#jsGrid"),
                $("#browserApiManualTest"), id);
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
            populateTTSResultIntoResultGrid(testName, $("#jsTTSGrid"),
                $("#ttsManualTest"), id);
          } else if (testName == 'CAPABILITY') {
            populateTTSResultIntoResultGrid(testName, $("#jsGrid"),
                $("#browserApiManualTest"), id);
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

      Util.Validation.setIRPTestResults('FAILED', null, false,
          'Error: Could not initialize TTS Support for this browser',
          ttsmanual_section);

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

  if (testName == 'CSS3') {
    if (isManualTestSupported) {

      iframe.attr({
        src : '../css3test/css3test.html',
        width : '100%',
        height : '100%'
      });

      id.dialog("open");

    }
  }

  if (testName == 'CAPABILITY') {
    if (isManualTestSupported) {
      id.dialog("open");
    } else {
      id.dialog("open");

      Util.Validation
          .setIRPTestResults(
              'FAILED',
              null,
              false,
              'Error: Could not initialize Get/Set Capability Support for this browser',
              browsermanual_section);

    }
  }

  if (testName == 'HTML5' || testName == 'CSS3') {
    var saveButtonVar = setInterval(function() {
      var iframeObj = null;
      var isTestCompleted = false;
      if (testName == 'HTML5') {
        iframeObj = document.getElementById('irpHTML5Test');
      } else if (testName == 'CSS3') {
        iframeObj = document.getElementById('irpCSS3Test');
      }
      var buttons = id.dialog("option", "buttons");
      if (iframeObj.contentWindow.isTestCompleted) {
        buttons[0].text = 'Save Results';
        buttons[0].disabled = false;
        id.dialog("option", "buttons", buttons);
        clearInterval(saveButtonVar);
      }
    }, 1000);
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

function populateTTSResultIntoResultGrid(testName, gridId, linkId, dialogId) {

  if (testName == 'TTS') {
    Util.Validation.mergeTTSResultIntoResult();
  }

  gridId.jsGrid("refresh");

  linkId.css("display", "none");

  dialogId.dialog("close");

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
    } else if (text == 'Mute') {
      id.addClass("irp-custom-button-click");
      $("#play").focus();
      muteUnmuteSystem(true);
    } else if (text == 'Ummute') {
      id.addClass("irp-custom-button-click");
      $("#play").focus();
      muteUnmuteSystem(false);
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

function muteUnmuteSystem(enable) {
  if (!!ttsImpl.setsystemMute) {
    ttsImpl.setTTSsystemMute(enable);
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

  var playObj = eval(irpApiSpecConstant + specSeparator + specTTSManualApi
      + specSeparator + ttsSetting);
  playObj.testResult = null;
  ttsGridArray.push(playObj);

  $("#ttsGrid")
      .jsGrid(
          {
            width : "100%",
            data : ttsGridArray,
            selecting : false,

            fields : [
                {
                  title : "Test Name",
                  name : "instruction",
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

  $("#dialog-confirm").dialog(
      {
        resizable : false,
        height : "auto",
        title : eval(irpApiSpecConstant + specSeparator + specTTSManualApi
            + specSeparator + ttsSetting + specSeparator + "dialogTitle"),
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

    if (result === true) {
      Util.Validation.getTTSManualResult()[currentTestIndex].testPoints = eval(irpApiSpecConstant
          + specSeparator
          + specTTSManualApi
          + specSeparator
          + ttsSettingArray[currentTestIndex] + specSeparator + "points");

    }

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
      eval(irpApiSpecConstant + specSeparator + specTTSManualApi
          + specSeparator + ttsSetting + specSeparator + "dialogHtml"));

}

function disableTTSOptions() {

  var disableIds = null;
  disableIds = eval(irpApiSpecConstant + specSeparator + specTTSManualApi
      + specSeparator + ttsSetting + specSeparator + "disableSection");

  /**
   * Disabling all option once all test are completed currently we have 11 test
   */
  if (currentTestIndex == ttsSettingArray.length - 1) {
    disableIds = eval(irpApiSpecConstant + specSeparator + specMessage
        + specSeparator + "disable_all");
  }

  /* var disableArray = disableIds.split(","); */

  disableIds.forEach(function(item, index, array) {

    var buttonSliderId = eval(irpApiSpecConstant + specSeparator
        + specTTSManualApi + specSeparator + item + specSeparator
        + "buttonSliderId");

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
  var enableIds = eval(irpApiSpecConstant + specSeparator + specTTSManualApi
      + specSeparator + ttsSetting + specSeparator + "enableSection");

  /* var enableArray = enableIds.split(","); */

  enableIds.forEach(function(item, index, array) {

    var buttonSliderId = eval(irpApiSpecConstant + specSeparator
        + specTTSManualApi + specSeparator + item + specSeparator
        + "buttonSliderId");

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
    if (item != TTS.Test.UNKNOWN) {

      Util.Validation.setIRPTestResults(item, null, false,
          'Test not performed', ttsmanual_section);
    }

  });

}

function populateReportGridForExternalTest(gridId, headerId, testId, testName,
    dialogId) {
  var iframeObj = null;
  if (testName == 'HTML5') {
    iframeObj = document.getElementById('irpHTML5Test');

    if (iframeObj.contentWindow.isTestCompleted) {

      populateResults(gridId, iframeObj.contentWindow.html5TestArray, true);

      headerId.html(iframeObj.contentWindow.htmlScoreHTML);
      dialogId.dialog("close");
      testId.css("display", "none");
      headerId.focus();
    }
  }

  else if (testName == 'CSS3') {
    iframeObj = document.getElementById('irpCSS3Test');

    if (iframeObj.contentWindow.isTestCompleted) {
      populateResults(gridId, iframeObj.contentWindow.css3TestArray, true);

      headerId.html(iframeObj.contentWindow.css3ScoreHTML);

      dialogId.dialog("close");
      testId.css("display", "none");
      headerId.focus();
    }
  }

}

function enableDisableSaveResultButton(testName, id) {

  var iframeObj = null;
  var isTestCompleted = false;
  if (testName == 'HTML5') {
    iframeObj = document.getElementById('irpHTML5Test');
  } else if (testName == 'CSS3') {
    iframeObj = document.getElementById('irpCSS3Test');
  }
  var buttons = id.dialog("option", "buttons");
  if (iframeObj.contentWindow.isTestCompleted) {
    $('#dialogButton').button("enable");
  }
}

function populateIRPTestHeaderHTML(headerId, testName) {

  if (testName === 'TTS') {

  } else {

  }
}