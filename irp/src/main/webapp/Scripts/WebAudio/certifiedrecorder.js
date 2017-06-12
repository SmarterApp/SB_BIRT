// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
function Recorder_CertifiedService() {

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
    deviceInfos
    if (capabilities != null && capabilities.isAvailable) {

      var audioInputSelect = $('#audioSource');

      audioInputSelect.empty();

      var audioComboCount = 1;

      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
          option.text = deviceInfo.label || 'Microphone ' + (audioComboCount++);
          audioInputSelect.append(option);
        } else {
          console.log('Some other kind of source/device: ', deviceInfo);
        }
      }

    }

  };
}