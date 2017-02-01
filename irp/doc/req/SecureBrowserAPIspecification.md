Secure Browser API Specification
------------------

All vendors are required to expose a window global object called `browser`. The APIs discussed below are exposed through this global object.

## Required Methods

1. **Lock down environment to begin an assessment**. The testing web application will invoke this call prior to allowing students to start testing. The implementer is required to take any actions necessary to secure the testing environment. The steps taken to secure the environment are device specific and for example, include aspects such as disabling the ability to do screen captures, disabling the ability to voice chat when in secure mode, clearing the system clipboard, entering into a kiosk mode, disabling Spaces in OS X 10.7+ etc. The testing application will enable lockdown before an assessment commences and will disable the lockdown when the student has completed the assessment and is out of the secure test.

	`void browser.security.enableLockDown (boolean lockDown)`

1. [TBD] **Retrieve List of Features and their status**. In some cases, testing may not require the environment to be fully locked down. We may still allow a test to proceed even if `browser.security.isEnvironmentSecure()` returns false as long we can determine which features are currently available to the end user and allow the testing application to make a determination. 

	`object browser.security.getFeatures()`
returns either a Javascript object or literal with the following structure
	`{<feature>:true|false, ...}`
Example: `{"screencapture":true, "voicerecording":false, "videocamera":false, "cortana": true}`

1. **Empty system clipboard (optional)**. The testing application will invoke this to force clear any data that may be in the system clipboard. This is a optional method. The implementer can choose to use the `browser.security.enableLockDown` to perform the same operation. 

	`void browser.security.emptyClipBoard()`

1. [TBD] **Examine current list of running processes**. The testing application will invoke this to examine the list of all processes running on the client machine owned by the user, and compare it with a list of processes that we have deemed blacklisted during testing cycle. This call will be invoked both at the start of an assessment and periodically which the student is taking the assessment and at any point, if a blacklisted app is detected, the assessment will be stopped to preserve test integrity. It will return a list of running processes that match one or more of the blacklisted processes, if any.

	`string[] browser.security.examineProcessList(string[] blacklistedProcessList)`

     Example response:
	 
	`"['taskmgr.exe','chrome.exe','ccSvcHst.exe','Dropbox.exe','EXCEL.EXE','svchost.exe','System']"`

1. **Shut down the browser**. The testing application will invoke this to close the browser when the user elects to exit the browser. The boolean parameter will determine if the browser should restart on exit or simply exit.

	`void browser.security.close(boolean restart)`

1. **Speak Text (Text to speech Synthesis)**. The testing application will invoke this to perform client side text to speech synthesis. The API call will be passed in a string with embedded speech markup, an options object to control the speech (optional) and a callback for TTS events (optional). The vendor can support one of the following markup standards, SSML, Microsoft speech markup (for windows) or Apple speech markup (for OS X). The options object include `voicename`, `rate`, `gender`, `language`, `pitch`, `volume`. The callback, if provided, is invoked for TTS events which include `start`, `end`, `word boundary`, `sentence boundary`, `synchronization/marker` encountered, `paused` and `error`. 

	`void browser.tts.speak(string text, object options, function callback)`

1. **Stop speech (Text to speech Synthesis)**. This is called by the testing application to stop any speech that may be in progress. 

	`void browser.tts.stop()`

1. **Get speech status (Text to speech Synthesis)**. This is called by the testing application to inspect the current status of speech. The valid values are `unavailable`, `idle`, `paused` and `speaking`

	`string browser.tts.getStatus()`

     Where Status is one of:

    'NotSupported'  : tts initialization failed.
    'Uninitialized' : tts is not initialized
    'Initializing'  : tts initialization in progress
    'Stopped'       : tts is initialized and there is nothing playing
    'Playing'       : playing is in progress
    'Paused'        : playing was paused
    'Unknown'       : unknown status

1. **Get available voices (Text to speech Synthesis)**. This is called by the testing application to get a listing of the available voice packs in the current system. 
	
	`string[] browser.tts.getVoices()`

     Example Response:

     `['US English Female TTS','en-US','es-ES']`

1. [TBD] **Get current voice pack (Text to speech Synthesis)**. This is called by the testing application to get the name of the currently active voice pack. 

    `string browser.tts.getVoiceName()`

1. **Pause speech (Text to speech Synthesis)**. This is called by the web application to temporarily pause speech. Corresponding events are fired to notify the callback provided in the `speak` function of this.

	`void browser.tts.pause()`

1. **Resume speech (Text to speech Synthesis)**. This is called by the web application to resume speech if it was previously paused. 

	`void browser.tts.resume()`

1. [TBD] **Get current pitch setting (Text to speech Synthesis)**. This is called by the testing application to get the pitch of the current voice. 

1. [TBD] **Get current rate setting (Text to speech Synthesis)**. This is called by the testing application to get the speech rate of the current voice. 

1. [TBD] **Get current volume setting (Text to speech Synthesis)**. This is called by the testing application to get the volume of the current voice. 

1. [TBD] **Is OSX Spaces Enabled**. Applicable to Mac OS X only. Returns true if Spaces is enabled, false otherwise. 

1. [TBD] **Get System Volume**. TBD 

1. [TBD] **Set System Volume**. TBD 
	
1. [TBD] **Mute System Volume**. TBD 

1. [TBD] **Unmute System Volume**. TBD 

1. [TBD] **Check if System Volume is muted**. TBD 

1. [TBD] **Enable permissive mode**. TBD - deprecate?

### Optional APIs
1. [TBD] **Get Application Start Time (optional)**. The testing application will invoke this to determine the local client side time that the application was launched. This is mainly used to track application uptime. If this is not provided, the web application can track it using local/session storage but it is desirable to have this information natively supported

	`DateTime browser.security.getStartTime()`

     Example response:
	 
     `"Thu May 29 2016 17:35:24 GMT-0500 (Central Standard Time)"`

1. **Initialize audio recorder**. This method is called by the testing application once to initialize the audio API after a page loads. The event listener passed in as argument is used to notify events to caller about progress.  Any attempts to call this method when it has already been called should be treated as a reset and re-init.

	`void browser.recorder.initialize (eventListener)`

	Events expected:

    * `INITIALIZING` – indicates that initialization is in progress
    * `READY` – Initialization is done and internal data structures are loaded
    * `ERROR` – Initialization failed with information on failure cause

1. **Get audio recorder status**. This method is called to inquire about the status of the recorder. 
 
	`string browser.recorder.getStatus()`

	Status values expected are

	* `IDLE` – no recording in progress
	* `ACTIVE`- recording in progress
	* `INITIALIZING` – initialization in progress
	* `ERROR` – terminal error state and reinit is required 
	* `STOPPING` – recording is done and final book keeping and generation of encoded audio is in progress
	* `PLAYING` - recorder is playing back some audio
	* `PAUSED` - recorder is paused playing back some audio

1. **Get audio recorder capabilities**. This method is called to enquire about the capabilities of the platform. Throws error if called before initialize is completed successfully. The return value includes
 
	`object browser.recorder.getCapabilities()`

 Possible return values are:
 
	* `isAvailable` – recording is supported (Boolean)
    * `supportedInputDevices` – a list of audio input devices detected. Each of these device definitions includesdevice id, device description/label, supported sample size(s), supported sample rate(s), supported channel count(s), encoding format(s) supported.	

1. **Initiate audio capture**. This method is called to initiate audio capture.  Throws error if called prior to successful initialization. Throws errors if the options passed in are not supported on the device. Throws error if capture status is currently not IDLE. 

	`object browser.recorder.startCapture(options, eventListener)`

    The options object includes:

    * `captureDevice` – the device id to use for data capture (int)
sample rate – the line rate to capture the raw audio in (8Khz, 11Khz etc) (specified as int in hz)
    * `channel count` – 1 (mono), 2 (stereo) … (specified as int)
    * `sample size` – 8bit, 16bit etc. (specified as int)
`encoding format` – SPX, HE-AAC, Opus, etc. (specified as string)
    * `quality indicator desired` – whether to perform and report a recording quality check or not (Boolean)
    * `progressEventFrequency` – how frequently the event listener should be called back to report progress events either based on time or on units of data collected. For example, we could ask for periodic progress events every 2 seconds to keep us notified as recording is happening or every 30KB of new data collected
    * `captureLimit `– object literal that specifies time or size for the data capture after which the recorder should automatically stop capturing and fire an end event (specified as {duration: 40} or {size:250}, unit for duration is in seconds and for size, is in KB). The event listener is passed in to receive capture events. The events include:
        * `START` – Capture started
        * `INPROGRESS` – Progress event with progress data (34 seconds of audio captured, 36 seconds of audio captured etc or 10KB of audio captured, 30 KB of audio captured etc) 
        * `END` – Capture complete. The `END` event is special. This event gives us the pointer to the  data collection for the encoded audio. In addition, a quality check is performed on the captured audio stream to evaluate whether it is good or not. 

1. **Stop recording**. This method is called to stop audio capture. Throws error if status is currently not “RECORDING”.

	`void browser.recorder.stopCapture()`

1. **Retrieve recording**. This method is called to retrieve base64 encoded audio data that was previously captured (or played back by the recorder). If the `END` event for audio capture includes the base64 encoded audio, then this call is optional. Note: If the event does not include the data, the testing application will be invoking this api directly in the callback for the `END` event.

	`string browser.recorder.retrieveAudio()`

1. **Playback a recording**. This method is called to playback a recording made through the recorder at some prior time (even in a previous session of the browser) in an asynchronous manner. This API is optional if the browser supports HTML5 webaudio to playback encoded audio (encoded using the format specified in the `startcapture` call) obtained by a call to `retrieveAudio()`. The playback function is passed in the base64 audio string and a call back function.  

	`void browser.recorder.playback(b64audio, callback)`

    The call back function is expecting the following events:

    * `PLAYBACK_START` - Playback has started. The event includes the id of the audio passed in. 
    * `PLAYBACK_STOPPED` - Playback has stopped (either because the audio stream is done, `pausePlayback()` or `stopPlayback()` has been invoked). The event includes the id of the audio passed in.

1. **Stop playback**. This method is invoked to stop an ongoing audio playback. Throws error if status is currently not "PLAYING".

	`void browser.recorder.stopPlayback()`

1. **Pause playback**. This method is invoked to pause an ongoing audio playback. Throws error if status is currently not "PLAYING"

	` void browser.recorder.pausePlayback()`

1. **Resume playback**. This method is invoked to resume an already paused audio playback. Throws error if status is currently not "PAUSED"

	`void browser.recorder.resumePlayback()`
	
## Secure Browser Standards Compliance
### Required

1. [TBD] **HTML5 compliant**. The secure browser must be HTML5 compliant

1. [TBD] **Acid3 compliant**. The secure browser must be Acid3 compliant

1. [TBD] **HTML5 compliant**. The secure browser must be CSS3 compliant

### Optional
1. [TBD] **W3C Web Audio compliant**. 

1. [TBD] **W3C Web Speech compliant**. 
 
