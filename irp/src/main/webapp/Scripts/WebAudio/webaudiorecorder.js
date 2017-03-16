function Recorder_WebAudioService() {

  this.audioContext = null;

  this.isSupported = function() {
    return 'AudioContext' in window || 'webkitAudioContext' in window;
  };

  this.getAudioContextObject = function() {
    if (!this.isSupported())
      return '';
    else
      audioContext = new (window.AudioContext || webkitAudioContext)();

    return audioContext;

  };

}