function Recorder_MobileAudioService() {

  this.isSupported = function() {

    if (AIRMobile && AIRMobile.recorder
        && (typeof AIRMobile.recorder.initialize == 'function'))
      return true;
    else
      return false;
  };

}