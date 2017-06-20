// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
function TTSService_Unified() {

  this.volume = 10; // 0-10
  this.rate = 10; // Max 20
  this.pitch = 10; // Max 20
  this.voices = [];

  this.currentVoice = null;

  this.supportsVolumeControl = function() {
    return true;
  };

  this.supportsPitchControl = function() {
    return true;
  };

  this.supportsRateControl = function() {
    return true;
  };

  this.isSupported = function() {
    return typeof SecureBrowser.tts === 'object';
  };

  this.load = function() {
    return true;
  };

  this.getVoices = function() {

    try {
      function getVoicesCallBack(aVoices) {

        let selectList = document.getElementById("voices");
        let selectedIndex = 0;
        for (let i = 0; i < aVoices.length; i++) {
          let opt = document.createElement("option");

          opt.text = aVoices[i].name;
          opt.value = aVoices[i].id;

          selectList.options.add(opt);
        }
        this.voices = aVoices.slice();
      }
      SecureBrowser.tts.getVoices(getVoicesCallBack);
    } catch (e) {
    }
  };

  this.setVolume = function(level) {
    this.volume = level;
    return true;
  };

  // get the current volume
  this.getVolume = function() {
    return this.volume;
  };

  this.setPitch = function(level) {
    this.pitch = level;
    return true;
  };

  // get the current pitch
  this.getPitch = function() {
    return this.pitch;
  };

  // set rate to a new value
  this.setRate = function(level) {
    this.rate = level;
    return true;
  };

  // get the current rate
  this.getRate = function() {
    return this.rate;
  };

  this.setSystemVolume = function(level) {
    try {
      if (!this.isSupported)
        return false;
      if (typeof (level) != 'number')
        return false; // validate type
      if (level < 0 || level > 10)
        return false; // validate range
      if (SecureBrowser.settings.systemVolume == level)
        return false; // check if difference
      SecureBrowser.settings.systemVolume = level;
      return true;
    } catch (ex) {
      return false;
    }
    return true;
  };

  this.setVoice = function(voice) {
    this.currentVoice = voice;
  };

  // get the current system voice
  this.getVoice = function() {
    return this.currentVoice.name;
  };

  this.stop = function() {
    function callback(aState) {

    }
    SecureBrowser.tts.stop(callback);
  };

  this.play = function(text) {

    // this.stop();

    let rate = this.rate;
    let pitch = this.pitch;
    let volume = this.volume;
    let currentVoice = this.currentVoice;

    let options = {
      /* voicename */id : currentVoice,
      pitch : pitch,
      rate : rate,
      volume : volume
    };

    function callback(aEvent) {
    }

    SecureBrowser.tts.speak(text, options, callback);
  };

  this.pause = function() {
    function callback(aState) {
    }
    SecureBrowser.tts.pause(callback);
  };

  this.resume = function() {
    function callback(aState) {

    }
    SecureBrowser.tts.resume(callback);
  };

  this.setTTSsystemMute = function(enable) {
    try {
      if (!Util.Browser.isSecureBrowser()) {
        return false;
      } else {
        SecureBrowser.settings.systemMute = enable;
      }
    } catch (ex) {
      return false;
    }
  }

}