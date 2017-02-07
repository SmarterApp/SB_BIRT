var ttsSetting = TTS.Setting.UNKNOWN;

var nextTest = 1;

function loadDialogBox(id, testName, testTitle, isNew) {

  id
      .dialog({
        autoOpen : false,
        width : '90%',
        title : testTitle,
        position : {
          my : "center",
          at : "center",
          of : window
        },
        create : function(event, ui) {

          if (testName == 'TTS') {
            createSlider($("#ttsVolume"), $("#ttsVolumeText"), 'Volume', 0, 10,
                10);
            createSlider($("#ttsPitch"), $("#ttsPitchText"), 'Pitch', 0, 20, 10);
            createSlider($("#ttsRate"), $("#ttsRateText"), 'Rate', 0, 20, 10);
            createSlider($("#systemVolume"), $("#systemVolumeText"),
                'System Volume', 0, 10, 10);
            createButton($("#play"), 'Play');
            createButton($("#pause"), 'Pause');
            createButton($("#resume"), 'Resume');
            createButton($("#stop"), 'Stop');
            createButton($("#systemMute"), 'Mute');
            loadVoices();
            Util.Validation.setTTSTestResultItems(TTS.Setting.PLAY, null);
            disableTTSOptions();
            enableTTSOptions();
            populateJsonGrid();
          }
        },
        buttons : [ {
          text : "Skip Test",
          click : function() {
            id.dialog("close");
          }
        } ]
      });

  if (testName == 'TTS') {
    if (ttsImpl != null) {
      id.dialog("open");
    } else {
      populateTTSResult(false,
          'Error: Could not initialize TTS Support for this browser', true);
    }
  }

}

function populateTTSResult(result, details, isNew) {

  var itemResult = {};

  $.extend(itemResult, Util.Validation.setResultItemDetail(
      'apiId.ttsManualCheck', 'testname.ttsManualCheck', 'api.ttsManualCheck',
      result, details));

  $("#jsGrid").jsGrid("insertItem", itemResult);

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
      var elMin = $('<label>' + (opt.min) + '</label>').css('left',
          (opt.min / vals * 100) + '%');
      var elMax = $('<label>' + (opt.max) + '</label>').css('left',
          (opt.max / vals * 100) + '%');
      id.append(elMin);
      id.append(elMax);
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

  if (text == 'Mute') {

    setMuteUnMuteButtonText();
  }

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
      muteUnmuteSystem();
    }

    // alert(text);
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
        // add English and Spanish voice packs only
        // if ((voice.language == 'eng') || (voice.language == 'spa') ||
        // (voice.language == 'en-US') || (voice.language == 'es-ES')) {
        voiceArray[i] = voice.language + " " + (voice.voice ? voice.voice : "");
        opt.value = JSON.stringify(voice);
        // opt.text = voiceArray[i];
        opt.text = voice.language;
        selectList.options.add(opt);
        // }
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
  // ttsSetting = TTS.Setting.VOICE;
  ttsImpl.setVoice($("#voices").val());
}

function ttsPlay() {

  var text = $("textarea#ttsText").val();
  ttsImpl.play(text);

  if (ttsSetting == TTS.Setting.UNKNOWN) {

    ttsSetting = TTS.Setting.PLAY;

    setDialogHtml();

    loadTTSDialogConfirm();
  } else if (ttsSetting > 4) {
    setDialogHtml();

    loadTTSDialogConfirm();
  }
}

function ttsPause() {

  ttsImpl.pause();

  if (ttsSetting == TTS.Setting.PAUSE) {

    setDialogHtml();

    loadTTSDialogConfirm();
  }

}

function ttsResume() {

  // ttsSetting = TTS.Setting.RESUME;

  setDialogHtml();

  ttsImpl.resume();

  loadTTSDialogConfirm();

}

function ttsStop() {

  // ttsSetting = TTS.Setting.STOP;

  setDialogHtml();

  ttsImpl.stop();

  loadTTSDialogConfirm();

}

function setTTSVolume(level) {
  // ttsSetting = TTS.Setting.VOLUME;

  if (ttsImpl.supportsVolumeControl()) {
    ttsImpl.setVolume(level);
  }
}

function setTTSPitch(level) {
  // ttsSetting = TTS.Setting.PITCH;

  if (ttsImpl.supportsPitchControl()) {
    ttsImpl.setPitch(level);
  }
}

function setTTSRate(level) {
  // ttsSetting = TTS.Setting.RATE;
  if (ttsImpl.supportsRateControl()) {
    ttsImpl.setRate(level);
  }
}

function setSystemVolume(level) {
  // ttsSetting = TTS.Setting.SYSTEM_VOLUME;
  if (!!ttsImpl.setSystemVolume) {
    ttsImpl.setSystemVolume(level);
  }
}

function getTTSStatus() {
  return ttsImpl.getStatus();
}

function muteUnmuteSystem() {
  // ttsSetting = TTS.Setting.MUTE_UNMUTE;
  if (!!ttsImpl.setsystemMute) {
    ttsImpl.setsystemMute();

    setMuteUnMuteButtonText();
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

/*
 * function populateJsonArraytoTest() { var resultArray = [];
 * 
 * resultArray.push({ "testName" : messageResource.get("ttsTest." +
 * currentTTSTest, 'message'), "testResult" : null });
 * 
 * return resultArray; }
 */

function populateJsonGrid() {

  $("#ttsGrid")
      .jsGrid(
          {
            width : "100%",
            data : Util.Validation.getTTSResult(),

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

  return $("#ttsGrid").data("JSGrid").data[gridIndex - 1];

}

function loadTTSDialogConfirm() {

  $("#dialog-confirm").dialog({
    resizable : false,
    height : "auto",
    title : messageResource.get("ttsDialogTitle." + nextTest, 'message'),
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
    } ]
  });
}

function closeConfirmBox(result) {

  $("#dialog-confirm").dialog("close");

  if (ttsSetting == nextTest) {
    $("#ttsGrid").jsGrid("updateItem", getTTSTestGridItem(ttsSetting),
        Util.Validation.setTTSItemDetail(ttsSetting, result));
    loadNextTTSTest();
  }

}

function loadNextTTSTest() {
  nextTest = nextTest + 1;
  if (nextTest <= 10) {
    $("#ttsGrid").jsGrid("insertItem",
        Util.Validation.setTTSItemDetail(nextTest, null));
    ttsSetting = nextTest;
    disableTTSOptions();
    enableTTSOptions();
  }
}

function setDialogHtml() {

  $("#dialog-confirm").html(
      messageResource.get("ttsDialogHtml." + ttsSetting, 'message'));

}

function disableTTSOptions() {
  var disableIds = messageResource.get("ttsTest.disableSection." + nextTest,
      'message');

  var disableArray = disableIds.split(",");

  disableArray.forEach(function(item, index, array) {

    var buttonSliderId = messageResource.get("ttsButtonSliderId." + item,
        'message');

    if ($('#' + buttonSliderId).is(":ui-button")) {
      $('#' + buttonSliderId).button("disable");
    } else if ($('#' + buttonSliderId).is(":ui-slider")) {
      $('#' + buttonSliderId).slider("disable");
    } else {
      document.getElementById(buttonSliderId).disabled = true;
    }

  });
}

function enableTTSOptions() {
  var enableIds = messageResource.get("ttsTest.enableSection." + nextTest,
      'message');

  var enableArray = enableIds.split(",");

  enableArray.forEach(function(item, index, array) {

    var buttonSliderId = messageResource.get("ttsButtonSliderId." + item,
        'message');

    if ($('#' + buttonSliderId).is(":ui-button")) {
      $('#' + buttonSliderId).button("enable");
    } else if ($('#' + buttonSliderId).is(":ui-slider")) {
      $('#' + buttonSliderId).slider("enable");
    } else {
      document.getElementById(buttonSliderId).disabled = false;
    }

  });
}

/* var grid = $("#jsGrid").data("JSGrid"); */