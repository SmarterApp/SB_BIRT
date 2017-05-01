// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
function Recorder_MobileAudioService() {

  var capabilities = null;

  var recorderDevice = {};
  var deviceCapabilities = {};
  var recorderStatus = null;

  var options = {};

  var RecorderAudioData = {
    filename : null,
    filedata : null
  };

  this.isSupported = function() {

    if (AIRMobile && AIRMobile.recorder
        && (typeof AIRMobile.recorder.initialize == 'function'))
      return true;
    else
      return false;
  };

  this.audioRecorderInitialize = function() {

    try {

      var handler = function(event) {

        document.removeEventListener(event.type, handler, false);
      };

      AIRMobile.recorder.initialize(handler);

      return true;
    } catch (error) {
      throw error;
    }

  };

  this.getAudioRecorderStatus = function() {
    try {
      var status = AIRMobile.recorder.getStatus();
      return status == 'STOPPING' ? 'closed' : status;
    } catch (error) {
      throw error;
    }
  };

  this.getDeviceRecorderCapabilities = function() {
    try {
      capabilities = AIRMobile.recorder.getCapabilities();
      var devices = capabilities.supportedInputDevices;
      this.gotDevices(devices);
    } catch (error) {
      throw error;
    }
  };

  this.initializeMediaRecorder = function(value) {

    try {

      var recordingFileName = AIRMobile.UUID() + "__.opus";

      options = {
        captureDevice : recorderDevice.id.toString(),
        sampleRate : deviceCapabilities.sampleRates.toString(),
        channelCount : deviceCapabilities.channels.toString(),
        sampleSize : deviceCapabilities.sampleSizes.toString(),
        encodingFormat : 'opus',
        qualityIndicator : true,
        filename : recordingFileName,
        progressFrequency : {
          type : "size",
          interval : 100
        },
        captureLimit : {
          'duration' : 60,
          'size' : 1000
        }
      };
    } catch (exception) {
      throw exception;
    }

  };

  this.startAudioRecording = function() {
    try {
      AIRMobile.recorder.startCapture(options, this.recorderHandler);
      var status = this.getAudioRecorderStatus();
      return status == "ACTIVE" ? "recording" : status;
    } catch (error) {
      throw error;
    }
  };

  this.stopAudioRecording = function() {
    try {
      AIRMobile.recorder.stopCapture();
      var status = this.getAudioRecorderStatus();
      return status == "ACTIVE" ? "IDLE" : status;
    } catch (error) {
      throw error;
    }
  };

  this.startAudioPlayback = function() {

    try {
      this.stopAudioPlayback();
      recorderStatus = this.getAudioRecorderStatus();
      if (recorderStatus == null) {
        throw "Cannot play back an audio. Recorder is not initialized";
      }
      if ((RecorderAudioData.filedata != null)
          && (RecorderAudioData.filedata != '')) {
        window.setTimeout(function() {
          AIRMobile.recorder.play({
            type : 'filedata',
            data : RecorderAudioData.filedata,
            filename : RecorderAudioData.filename
          });
        }, 500);
      } else {
        throw 'Empty Audio Data!!';
      }
    } catch (error) {
      throw error;
    }
  };

  this.pauseAudioPlayback = function() {
    AIRMobile.recorder.pausePlay();
  };

  this.resumeAudioPlayback = function() {
    AIRMobile.recorder.resumePlay();
  };

  this.stopAudioPlayback = function() {
    try {
      AIRMobile.recorder.stopPlay();
    } catch (error) {
      throw error;
    }
  };

  this.recorderHandler = function(event) {

    if (event.type == "END") {

      recorderStatus = 'idle';

      var results = {};

      results = JSON.parse(event.data, null);

      var saveAs = "";
      if (results.filename != null) {
        saveAs = results.filename.replace(/^.*[\\\/]/, '');
      }

      var data = results.base64;
      var quality = results.qualityIndicator;

      RecorderAudioData.filename = saveAs;
      RecorderAudioData.filedata = data;

    } else if (event.type == "ERROR") {
      alert("An error occured recording, please reinitialize and try again.");
    }
  };

  this.gotDevices = function(deviceInfos) {
    var audioInputSelect = $('#audioSource');

    audioInputSelect.empty();

    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];

      recorderDevice.id = deviceInfo.id;
      recorderDevice.description = deviceInfo.description;
      deviceCapabilities.channels = deviceInfo.channelCounts[0];
      deviceCapabilities.sampleRates = deviceInfo.sampleRates[0];
      deviceCapabilities.sampleSizes = deviceInfo.sampleSizes[0];
      deviceCapabilities.encoders = deviceInfo.formats[0];

      var option = document.createElement('option');
      option.value = deviceInfo.id;
      if (deviceInfo.kind == undefined || deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.description || 'microphone '
            + (audioInputSelect.length + 1);
        audioInputSelect.append(option);
      } else {
        console.log('Some other kind of source/device: ', deviceInfo);
      }
    }

  };

  this.audioRecorderClosed = function() {

    try {
      AIRMobile.recorder.status = AIRMobile.recorder.STATUS_STOPPING;
    } catch (error) {
      throw error;
    }

  };

  this.setRecordedData = function() {

    var getRecorderDataObjectInterval = setInterval(function() {

      if ((RecorderAudioData.filedata != null)
          && (RecorderAudioData.filedata != '')) {
        $('#audio_data_output_textfield').show();
        $('#recordedData').val(RecorderAudioData.filedata);
        clearInterval(getRecorderDataObjectInterval);
      }

    }, 1000);

  };

}