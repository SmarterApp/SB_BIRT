// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************

function Recorder_WebAudioService() {

  var audioContext = null;

  var constraints = {
    audio : true
  };

  var soundTrack = null;

  var mediaRecorder;

  var chunks = [];

  var reader = new FileReader();

  var audioURL = '';

  var source = null;

  var startedAt = 0;

  var pausedAt = 0;

  var playing = false;
  var offset;

  var recordedData;

  this.isSupported = function() {
    return ('AudioContext' in window || 'webkitAudioContext' in window);
  };

  this.getAudioContextObject = function() {

    try {
      if (!this.isSupported()) {
        return '';
      } else {
        if (this.audioContext == null) {
          audioContext = new (window.AudioContext || webkitAudioContext)();
        }
        return audioContext;
      }
    } catch (e) {
      alert('Web Audio API initialization failed ' + e);
      return false;
    }
  };

  this.audioRecorderInitialize = function() {
    try {
      audioContext = this.getAudioContextObject();
     
      navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia
          || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
      
      return true;
    } catch (e) {
      alert('Web Audio API initialization failed ' + e);
      return false;
    }

  };

  this.getAudioRecorderStatus = function() {
    try {
      if (audioContext != null) {
        return audioContext.state;
      } else {
        return 'Unknown';
      }
    } catch (e) {
      alert('Recorder Status API Failed ' + e);
      return 'Unknown';
    }
  };

  this.getDeviceRecorderCapabilities = function() {
    try {
    if(audioContext!=null){
      navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleError);
    }
    else{
      alert('Web Audio getCapabilities API  failed');
      return false;
    }
    } catch (e) {
      alert('Web Audio getCapabilities API  failed ' + e);
      return 'Unknown';
    }
  };

  this.initializeMediaRecorder = function(value) {

    this.constraints = {
      audio : {
        deviceId : value ? {
          exact : value
        } : undefined
      }
    };
    
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
      if(mediaRecorder!=null){
        mediaRecorder = null;
      }
      mediaRecorder = new MediaRecorder(stream); 
      window.stream = stream;
     }).catch(this.handleError);
  };

  this.setRecorderInputDevice = function(label, value, index) {

    this.initializeMediaRecorder(value);

  };

  this.startAudioRecording = function() {

    try {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      return mediaRecorder.state;
    } catch (e) {
      alert('Web Audio failed to start recording API  ' + e);
      return 'Unknown';
    }
  };

  this.stopAudioRecording = function() {

    try {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);

      mediaRecorder.onstop = function(e) {
        console.log("data available after MediaRecorder.stop() called.");

        var blob = new Blob(chunks, {
          'type' : 'audio/ogg; codecs=opus'
        });

        chunks = [];
        audioURL = window.URL.createObjectURL(blob);

        reader.readAsBinaryString(blob);

      };

      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      return mediaRecorder.state;
    } catch (e) {
      alert('Web Audio failed to start recording API ' + e);
      return 'Unknown';
    }
  };
  
  this.startAudioPlayback = function(){
    
    try{
    var request = new XMLHttpRequest();
    request.open('GET', audioURL, true);
    request.responseType = 'arraybuffer'; // This asks the browser to populate
                                          // the retrieved binary data in a
                                          // array buffer
    request.onload = function(){
     
      audioContext.decodeAudioData( request.response ).then(function(decodedData){
        if (source != null) {
          source.disconnect(audioContext.destination);
          source = null; 
        }
        
        if(decodedData !=null){
          console.log("File read properly");
          console.log("Channels: " + decodedData.numberOfChannels);
          console.log("Length: " + decodedData.length);
          console.log("Sample Rate: " + decodedData.sampleRate);
          console.log("Duration: " + decodedData.duration);
          recordedData = decodedData;
        }
          
        
       source = audioContext.createBufferSource();
       source.buffer = recordedData; 
       source.connect(audioContext.destination); 
       offset = pausedAt;
       source.start(0); 
       startedAt = audioContext.currentTime - offset;
       playing = true;
      }).catch(function(){
        soundTrack = new Audio(audioURL);
        soundTrack.play();
      });
    }
    request.send();
    } catch (e) {
      alert('Error while playing recorded audio ' + e);
      return false;
    }

  };

  this.stopAudioPlayback = function() {
    try {

      if (soundTrack != null) {
        soundTrack.pause();
      } else {

        if (source) {
          source.disconnect();
          source.stop(0);
          source = null;
        }
        pausedAt = 0;
        startedAt = 0;
        playing = false;

      }
    } catch (e) {
      alert('Error while stopping recorded audio ' + e);
      return false;
    }

  };

  this.pauseAudioPlayback = function() {
    try {
      if (soundTrack != null) {
        soundTrack.pause();
      } else {
        var elapsed = audioContext.currentTime - startedAt;
        this.stopAudioPlayback();
        pausedAt = elapsed;
      }
    } catch (e) {
      alert('Error while pausing recorded audio ' + e);
      return false;
    }
  };

  this.resumeAudioPlayback = function() {
    try {
      if (soundTrack != null) {
        soundTrack.play();
      } else {
        source = audioCtx.createBufferSource();
        source.buffer = recordedData;
        source.connect(audioCtx.destination);
        offset = pausedAt;
        source.start(0, offset);
        startedAt = audioCtx.currentTime - offset;
        pausedAt = 0;
        playing = true;
      }
    } catch (e) {
      alert('Error while resuming recorded audio ' + e);
      return false;
    }
  };

  this.handleError = function(error) {
    alert('Recorder API Error ' + error);
    return false;
  };

  this.gotDevices = function(deviceInfos) {
    var audioInputSelect = $('#audioSource');
    var audioOutputSelect = $('#audioOutput');

    audioInputSelect.empty();
    audioOutputSelect.empty();

    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label || 'microphone '
            + (audioInputSelect.length + 1);
        audioInputSelect.append(option);
      } else if (deviceInfo.kind === 'audiooutput') {
        option.text = deviceInfo.label || 'speaker '
            + (audioOutputSelect.length + 1);
        audioOutputSelect.append(option);
      } else {
        console.log('Some other kind of source/device: ', deviceInfo);
      }
    }

  };

  this.audioRecorderClosed = function() {

    try {

      audioContext.close();

    } catch (e) {
      alert('Recorder Close failed ' + e);
    }

  };

}