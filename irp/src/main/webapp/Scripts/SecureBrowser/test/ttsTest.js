function loadVoices() {
  if (isMobile) {
    var voices = ttsImpl.getVoices();
    if (voices) {
      var selectList = document.getElementById("voices");
      var voiceArray = new Array();
      alert("there are " + voices.length + " voice packs");
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
  var voiceIndex = document.getElementById("voices").selectedIndex;
  if (voiceIndex != -1) {
    var voice = document.getElementById("voices").options[voiceIndex].value;
    ttsImpl.setVoice(voice);
  }
}