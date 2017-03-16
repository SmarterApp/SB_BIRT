function Recorder_WebAudioService() {

  this.audioContext = null;

  var constraints = {
    audio : true
  };
  
  var mediaRecorder ;
  
  var chunks = [];
 
  var reader = new FileReader();

  var audioURL = '';
  
  var source = null,
  startedAt = 0,
  pausedAt = 0,
  playing = false,
  offset;
  
  var recordedData;
  
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
      alert('Web Audio API initialization failed ' + e);
      return false;
    }

  };

  this.audioRecorderInitialize = function() {

    try {

      audioContext = new (window.AudioContext || webkitAudioContext)();
      
      return true;
    } catch (e) {
      alert('Web Audio API initialization failed ' + e);
      return false;
    }

  };
  
  this.getAudioRecorderStatus = function(){
    try {
    if(audioContext!=null){
      return audioContext.state;
    }
    else{
      return 'Unknown';
    }
    } catch (e) {
      alert('Recorder Status API Failed ' + e);
      return 'Unknown';
    }
  };
  
  this.getDeviceRecorderCapabilities = function(){
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
      return Unknown;
    }
  };
  
  this.setRecorderInputDevice = function(label, value, index){
    
    
    this.constraints = {
        audio: {deviceId: value ? {exact: value} : undefined}
     };
    
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
      if(mediaRecorder!=null){
        mediaRecorder = null;
      }
      mediaRecorder = new MediaRecorder(stream); 
      window.stream = stream;
     }).catch(this.handleError);
      
  };
  
  this.startAudioRecording = function(){
    
    try {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    $('#stopRecording').button('enable');
    return mediaRecorder.state;
    } catch (e) {
      alert('Web Audio failed to start recording API  ' + e);
      return 'Unknown';
    }
  };
  
  this.stopAudioRecording = function(){
    
    try {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    
    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      
      chunks = [];
      audioURL = window.URL.createObjectURL(blob);
     
      reader.readAsArrayBuffer(blob);
    
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
    
    return mediaRecorder.state;
    } catch (e) {
      alert('Web Audio failed to start recording API ' + e );
      return 'Unknown';
    }
  };
  
  this.startAudioPlayback = function(){
    
    fetch(audioURL)
    .then(function(response) { return response.arrayBuffer(); })
    .then(function(mybuffer) {
      audioContext.decodeAudioData( mybuffer ).then(function(decodedData){
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
       pausedAt = 0;
       playing = true;
      }).catch(this.handleError);
    });
  };
  
    this.stopAudioPlayback = function() {
      if (source) {          
        source.disconnect();
        source.stop(0);
        source = null;
      }
      pausedAt = 0;
      startedAt = 0;
      playing = false;
   };
 
   this.pauseAudioPlayback = function(){
     var elapsed = audioContext.currentTime - startedAt;
     this.stopAudioPlayback();
     pausedAt = elapsed;
   };
 
  this.resumeAudioPlayback = function () {
  // connect the source to the output
    source = audioCtx.createBufferSource();
    source.buffer = recordedData; 
    source.connect(audioCtx.destination); 
    offset = pausedAt;
    source.start(0, offset); 
    startedAt = audioCtx.currentTime - offset;
    pausedAt = 0;
    playing = true;
  };

  
  this.handleError = function(error){
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