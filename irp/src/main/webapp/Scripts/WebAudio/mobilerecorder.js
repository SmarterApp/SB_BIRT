function Recorder_MobileAudioService() {

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
    } catch (e) {
      alert('Web Audio API initialization failed');
      return false;
    }

  };

}