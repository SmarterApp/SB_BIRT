function Recorder_CertifiedService() {

  this.isSupported = function() {

    if (Util.Browser.isCertified() && browser.recorder
        && (typeof browser.recorder.initialize == 'function'))
      return true;
    else
      return false;
  };
}