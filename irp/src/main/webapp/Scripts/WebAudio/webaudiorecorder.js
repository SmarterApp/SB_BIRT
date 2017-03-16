function Recorder_WebAudioService() {

  this.audioContext = null;

  var constraints = {
    audio : true
  };
  
  var mediaRecorder ;
  
  var chunks = [];

  navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia
      || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

  this.isSupported = function() {
    return 'AudioContext' in window || 'webkitAudioContext' in window;
  };

  this.getAudioContextObject = function() {

    try {
      if (!this.isSupported())
        return '';
      else
        return new (window.AudioContext || webkitAudioContext)();

    } catch (e) {
      alert('Web Audio API initialization failed');
      return false;
    }

  };

  this.audioRecorderInitialize = function() {

    try {

      audioContext = new (window.AudioContext || webkitAudioContext)();
      
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
        mediaRecorder = new MediaRecorder(stream);
        window.stream = stream;
      }).catch(this.handleError);
      
      return true;
    } catch (e) {
      alert('Web Audio API initialization failed');
      return false;
    }

  };
  
  this.getAudioRecorderStatus = function(){
    
    if(audioContext!=null){
      return audioCtx.state;
    }
    else{
      return 'Unknown';
    }
  };
  
  this.getDeviceRecorderCapabilities = function(){
    
    if(audioContext!=null){
      
      navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleError);
      
    }
    else{
      alert('Web Audio API initialization failed');
      return false;
    }
  };
  
  this.handleError = function(error){
    alert('Recorder API Error ' + error);
    return false;
  };
  
  this.gotDevices = function(deviceInfos) {
    var audioInputSelect = $('#audioSource');
    var audioOutputSelect = $('#audioOutput');
    
    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label ||
            'microphone ' + (audioInputSelect.length + 1);
        audioInputSelect.append(option);
      } else if (deviceInfo.kind === 'audiooutput') {
        option.text = deviceInfo.label || 'speaker ' +
            (audioOutputSelect.length + 1);
        audioOutputSelect.append(option);
      } else {
        console.log('Some other kind of source/device: ', deviceInfo);
      }
    }

  };

}