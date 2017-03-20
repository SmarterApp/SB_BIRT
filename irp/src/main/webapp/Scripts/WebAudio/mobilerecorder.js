function Recorder_MobileAudioService() {

  var capabilities = null;

  var recorderDevice = {};
  var deviceCapabilities = {};
  var recorderStatus = null;

  var options = {};

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
      return AIRMobile.recorder.getStatus();
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
      options = {
        captureDevice : recorderDevice.id.toString(),
        sampleRate : deviceCapabilities.sampleRates.toString(),
        channelCount : deviceCapabilities.channels.toString(),
        sampleSize : deviceCapabilities.sampleSizes.toString(),
        encodingFormat : 'opus',
        qualityIndicator : true,
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
      return this.getAudioRecorderStatus();
    } catch (error) {
      throw error;
    }
  };

  this.stopAudioRecording = function() {
    try {
      AIRMobile.recorder.stopCapture();
      return this.getAudioRecorderStatus();
    } catch (error) {
      throw error;
    }
  };

  this.recorderHandler = function(event) {

    if (event.type == "END") {

      // console.log("recording was just stopped");
      recorderStatus = 'idle';

      var results = {};

      results = JSON.parse(event.data, null);

      var data = results.base64;
      var quality = results.qualityIndicator;

      $("#audio_data_output_textfield").html(data);

    } else if (event.type == "ERROR") {
      alert("An error occured recording, please reinitialize and try again.");
    }
  };

  this.gotDevices = function(deviceInfos) {
    var audioInputSelect = $('#audioSource');
    var audioOutputSelect = $('#audioOutput');

    audioInputSelect.empty();
    audioOutputSelect.empty();

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
      } else if (deviceInfo.kind === 'audiooutput') {
        option.text = deviceInfo.description || 'speaker '
            + (audioOutputSelect.length + 1);
        audioOutputSelect.append(option);
      } else {
        console.log('Some other kind of source/device: ', deviceInfo);
      }
    }

  };

}