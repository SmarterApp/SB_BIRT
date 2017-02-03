function testTTS(isNew) {

  $("#dialogTTS").dialog(
      {
        autoOpen : false,
        width : '900',
        height : '600',
        title : 'TTS API Manual Test',
        position : {
          my : "center",
          at : "center",
          of : window
        },
        create : function(event, ui) {
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
          loadVoices();
        },
        buttons : [ {
          text : "Test Pass",
          icons : {
          /* primary : "ui-icon-heart" */
          },
          click : function() {
            populateTTSResult(true, 'TTS PASSED', isNew);
          }
        }, {
          text : "Test Fail",
          icons : {
          /* primary : "ui-icon-heart" */
          },
          click : function() {
            populateTTSResult(false, 'TTS FAILED', isNew);
          }
        } ]
      });

  if (ttsImpl != null) {
    $("#dialogTTS").dialog("open");
  } else {
    populateTTSResult(false,
        'Error: Could not initialize TTS Support for this browser', true);
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

  id.click(function(event) {

    if (text == 'Play') {
      ttsPlay();
    } else if (text == 'Pause') {
      ttsPause();
    } else if (text == 'Resume') {
      ttsResume();
    } else if (text == 'Stop') {
      ttsStop();
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
      /* alert("there are " + voices.length + " voice packs"); */
      document.getElementById("info").innerHTML = "there are " + voices.length
          + " voice packs";
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
  ttsImpl.setVoice($("#voices").val());
}

function ttsPlay() {
  var text = $("textarea#ttsText").val();
  ttsImpl.play(text);
  // displayTTSInfo(false);
}

function ttsPause() {

  ttsImpl.pause();
  // displayTTSInfo(false);

}

function ttsResume() {

  ttsImpl.resume();
  // displayTTSInfo(false);

}

function ttsStop() {

  ttsImpl.stop();
  // displayTTSInfo(false);

}

function setTTSVolume(level) {

  if (ttsImpl.supportsVolumeControl()) {
    ttsImpl.setVolume(level);
  }
}

function setTTSPitch(level) {

  if (ttsImpl.supportsPitchControl()) {
    ttsImpl.setPitch(level);
  }
}

function setTTSRate(level) {

  if (ttsImpl.supportsRateControl()) {
    ttsImpl.setRate(level);
  }
}

function setSystemVolume(level) {

  if (!!ttsImpl.setSystemVolume) {
    ttsImpl.setSystemVolume(level);
  }
}

function getTTSStatus() {
  return ttsImpl.getStatus();
}

/* var grid = $("#jsGrid").data("JSGrid"); */