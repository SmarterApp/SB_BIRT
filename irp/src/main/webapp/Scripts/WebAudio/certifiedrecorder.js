// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
function Recorder_CertifiedService() {

  var recordingCapabilities = [];

  var currentAudioContent = null;

  this.isSupported = function() {

    if (Util.Browser.isSecureBrowser() && !!SecureBrowser.recorder
        && (typeof SecureBrowser.recorder.initialize == 'function'))
      return true;
    else
      return false;
  };

  this.audioRecorderInitialize = function() {
    try {
      SecureBrowser.recorder.initialize(function(status) {
      });

      return true;
    } catch (error) {
      throw error;
    }

  };

  this.getAudioRecorderStatus = function() {
    try {
      SecureBrowser.recorder.getStatus(function(status) {
        if (status != null && status !== '') {
          $('#recorderStatusText').html(
              '<span class="green-background">' + status + '</span>');
        }
      });

      return null;

    } catch (error) {
      throw error;
    }
  };

  this.getDeviceRecorderCapabilities = function() {
    try {
      SecureBrowser.recorder.getCapabilities(this.gotDevices);
    } catch (error) {
      throw error;
    }
  };

  this.gotDevices = function(capabilities) {
    // deviceInfos
    if (capabilities != null && capabilities.isAvailable) {

      recordingCapabilities = capabilities.supportedInputDevices;
      var deviceInfos = recordingCapabilities;

      var audioInputSelect = $('#audioSource');

      audioInputSelect.empty();

      var audioComboCount = 1;

      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.id;
        option.text = deviceInfo.id || 'Microphone ' + (audioComboCount++);
        audioInputSelect.append(option);
      }

    }

  };

  this.initializeMediaRecorder = function(value) {
    try {
      this.clearAudioRecording();
      return true;
    } catch (error) {
      throw error;
    }

  };

  this.startAudioRecording = function() {

    try {
      var options = {
        'captureDevice' : recordingCapabilities[0].id,
        'sampleRate' : recordingCapabilities[0].sampleRates[0],
        'channelCount' : 1,
        'sampleSize' : recordingCapabilities[0].sampleSizes[0],
        'encodingFormat' : recordingCapabilities[0].encodingFormats[0],
        'qualityIndicatorDesired' : true,
        'captureLimit' : {
          'duration' : 10,
          'size' : 1000
        },
        'progressFrequency' : {
          'type' : 'time',
          'interval' : 3
        }
      };

      SecureBrowser.recorder
          .startCapture(
              options,
              function(event) {
                var resultString = 'Recorder Status: ';
                if (event != null && event.type != null) {
                  resultString += (event.type + ' ');
                  if (event.type === 'INPROGRESS') {
                    if (event.kilobytesRecorded != null) {
                      resultString += (event.kilobytesRecorded + ' KB recorded');
                    }
                    if (event.secondsRecorded != null) {
                      resultString += (event.secondsRecorded + ' seconds recorded');
                    }
                  } else if (event.type === 'END') {
                    resultString += 'recording has ended';
                    if (event.kilobytesRecorded) {
                      resultString += ('; ' + event.kilobytesRecorded + ' KB recorded');
                    }
                    if (event.secondsRecorded != null) {
                      resultString += ('; ' + event.secondsRecorded + ' seconds recorded');
                    }
                    if (event.data) {
                      if (event.data.qualityIndicator) {
                        resultString += ('; quality is ' + event.data.qualityIndicator);
                      }

                      if (event.data.base64 && event.data.recordingName) {
                        resultString += 'Comes Inside';
                        currentAudioContent = {
                          'recordingName' : event.data.recordingName,
                          'data' : event.data.base64
                        };
                        resultString += ('; recording content has been retrieved successfully');
                      }

                      SecureBrowser.recorder
                          .retrieveAudioRecordingList(function(results) {
                            if (results != null && results.recordings != null) {
                              var recordingId = results.recordings[0];
                              if (recordingId != null && recordingId != '') {
                                SecureBrowser.recorder
                                    .retrieveAudioRecording(
                                        recordingId,
                                        function(result) {
                                          if (result != null
                                              && result.base64 != null) {

                                            currentAudioContent = {
                                              'recordingName' : recordingId,
                                              'data' : result.base64
                                            };
                                          } else {
                                            throw new Error(
                                                'Warning: audio content CANNOT be retrieved');
                                          }
                                        });
                              } else {
                                throw new Error(
                                    'Warning: no audio recording is available');
                              }

                            }
                          });

                    }
                  }
                }
              });

      SecureBrowser.recorder.getStatus(function(status) {
        if (status != null && status !== '') {
          $('#recorderStatusText').html(
              '<span class="green-background">recording</span>');
        }
      });

      return null;

    } catch (error) {
      throw error;
    }
  };

  this.stopAudioRecording = function() {

    try {
      SecureBrowser.recorder.stopCapture();
      this.getAudioRecorderStatus();

      return null;

    } catch (error) {
      throw error;
    }
  };

  this.startAudioPlayback = function() {

    try {

      if (currentAudioContent == null || currentAudioContent == '') {
        throw new Error(
            "Warning: no audio content is available for playback. Please retrieve a recording first.");
      } else {
        var audioInfo = currentAudioContent;
        audioInfo.type = 'recordingdata';
        SecureBrowser.recorder.play(audioInfo, function(state) {
          if (state != null && state != '') {

          } else {

          }
        });
      }

    } catch (error) {
      throw error;
    }
  };

  this.stopAudioPlayback = function() {
    SecureBrowser.recorder.stopPlay(function(state) {
      if (state != null && state != '') {

      } else {

      }
    });

  };

  this.pauseAudioPlayback = function() {
    SecureBrowser.recorder.pausePlay(function(state) {
      if (state != null && state != '') {

      } else {

      }
    });

  };

  this.resumeAudioPlayback = function() {
    SecureBrowser.recorder.resumePlay(function(state) {
      if (state != null && state != '') {

      } else {

      }
    });

  };

  this.audioRecorderClosed = function() {

    try {
      this.clearAudioRecording();
      return null;
    } catch (error) {
      throw error;
    }

  };

  this.setRecordedData = function() {

    var getReaderObjectInterval = setInterval(function() {

      if (currentAudioContent != null) {
        $('#audio_data_output_textfield').show();
        $('#recordedData').val(currentAudioContent.data);
        clearInterval(getReaderObjectInterval);
      }
    }, 1000);

  };

  this.clearAudioRecording = function() {
    try {
      SecureBrowser.recorder.removeAudioRecordings(function(recordingNames) {
        if (recordingNames != null) {

        }
      });
    } catch (error) {
      throw error;
    }

  };

}