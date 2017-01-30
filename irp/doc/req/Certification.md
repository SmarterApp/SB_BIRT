Functional Requirements
-----------------------
AIR assessments are web based and use HTML5 compliant browsers to deliver the assessment. Test security should be enforced by the device/browser delivering the assessments. All vendors seeking certification from AIR must provide a secure testing environment that supports modern web technologies to facilitate web-based student assessment.

* The device must have a web browser that supports all of the following technologies:
    * [INSERT LINK TO APPENDIX WITH TDS BROWSER TECHNOLOGIES]

* The device must comply with the API specification below.  No adaptations of this API may be used.  Failure to supply all required functions will result in a declassification or denied certification.  Some of the hallmark features of this API will allow AIR to:
    * Check if the device is secured
    * Utilize the device's native text-to-speech capability
    * Capture and playback audio
    * Operate standard browser functions such as clearing cookies and cache

* One of the primary functions of the device that must be available is the ability is to lock down the system to prevent unauthorized actions while administering an assessment.  Moreover, AIR's system requires acknowledgment that the security is being enforced and when/if a user compromises the security of the device an event must notify AIR's system so that it can react accordingly.  Users will not be able to log in to AIR's system if a device does not report that it is secure.  Failure to provide this API alone will result in a denied certification.  Examples of features that compromise test security and/or provide users with unintended features that should be be available on an assessment unless provided by AIR directly:
    * Keyboard functions such as Predictive Text, Spell Check, Grammar Check, etc
    * The ability to go to a different website
    * The ability to take a screenshot, record the screen or screencast
    * The ability to communicate with another person (e.g.; instant message, email, etc)
    * The ability to access any other application while in secure mode (e.g.; calculator, dictionary, another browser, etc)

* The browser on the device should provide as much screen real estate as possible.  All navigation buttons and features should be removed from the browser or disabled while in secure mode.  A user should not be able to hit back/next, type in a new URL, bookmark anything, save pages, etc.  AIR will provide all the navigation that a user will need while taking an assessment.  Moreover, removing all of these options from the screen and providing the student with a full-screen experience will make this device much more usable.

API Specification
------------------

All vendors are required to expose a window global object called `browser`. The APIs discussed below are exposed through this global object

1. **Lockdown environment to begin an assessment**. The testing web application will invoke this call prior to allowing students to start testing. The implementer is required to take any actions necessary to secure the testing environment. The steps taken to secure the environment are device specific and for example, include aspects such as disabling the ability to do screen captures, disabling the ability to voice chat when in secure mode, clearing the system clipboard, entering into a kiosk mode, disabling Spaces in OS X 10.7+ etc. The testing application will enable lockdown before an assessment commences and will disable the lockdown when the student has completed the assessment and is out of the secure test.

	`void browser.security.enableLockDown (boolean lockDown)`


2. **Check if the environment is secure**. The testing web application will invoke this prior to allowing students to start testing and periodically when inside the test. The return type is boolean. This call must return true only if all necessary locks have been enabled (or features disabled) to enable a securing testing environment and none of these have been compromised since we entered the lock down mode  

	`boolean browser.security.isEnvironmentSecure()`

3. **Retrieve List of Features and their status**. In some cases, testing may not require the environment to be fully locked down. We may still allow a test to proceed even if `browser.security.isEnvironmentSecure()` returns false as long we can determine which features are currently available to the end user and allow the testing application to make a determination. 

	`object browser.security.getFeatures()`
returns either a Javascript object or literal with the following structure
	`{<feature>:true|false, ...}`
Example: `{"screencapture":true, "voicerecording":false, "videocamera":false, "cortana": true}`

4. **Retrieve information on the environment**. The testing web application will invoke this to gather details about the platform on which it is running. This is used to augment any information that was discernible from the user agent.

	`object browser.security.getDeviceInfo()`

	The returned object has the following properties: `manufacturer`,`HWVer`, `SWVer`
  
5. **Clear browser cache**. The testing web application will invoke this call to clear any cached web resources. No secure content is ever marked with cache-control headers permitting them to be cached. However, static, non-secure resources such as css files, header/footer graphics etc are marked with cache headers allowing them to be cached on the client machine (for performance reasons). This API call allows the testing web application to clear any such cached resource.

	`void browser.security.clearCache()`
	
6. **Clear cookies**. The testing web application will invoke this call to clear any client side cookies held in the browser's memory. This is a safety precaution to ensure that no cookies from any previous testing sessions are currently active. This is a backup to the server side clearing of cookies. 
	
	`void browser.security.clearCookies()`

7. **Empty system clipboard (optional)**. The testing application will invoke this to force clear any data that may be in the system clipboard. This is a optional method. The implementer can choose to use the `browser.security.enableLockDown` to perform the same operation. 

	`void browser.security.emptyClipBoard()`

8. **Retrieve system MAC address(es) (optional)**. The testing application will invoke this to assist in diagnostics. It is difficult to rely on source IP addresses to distinguish between end user machines within our testing servers as firewalls/NATs/Proxies are commonly in use at the schools. The MAC addresses allow us to distinguish end client machines behind a common firewall for diagnostics purposes.

	`string[] browser.security.getMACAddress()`

     Example response:
	 
     `"['00','55','65','C0','00','EA']"`

9. **Retrieve client IP address(es) (optional)**. The testing application will invoke this to assist in diagnostics. A listing of IP addresses procured can be presented on the client side diagnostics screens. 

	string[] browser.security.getIPAddressList()

     Example response:
	 
     `"['192.168.7.100','172.22.38.45']"`

10. **Retrieve current list of running processes**. The testing application will invoke this to retrieve a list of all processes running on the client machine owned by the user. This list is used to determine if the user is running any processes that we have deemed blacklisted during testing cycle. This call will be invoked both at the start of an assessment and periodically which the student is taking the assessment and at any point, if a blacklisted app is detected, the assessment will be stopped to preserve test integrity.

	`string[] browser.security.getProcessList()`

     Example response:
	 
	`"['taskmgr.exe','chrome.exe','ccSvcHst.exe','Dropbox.exe','EXCEL.EXE','svchost.exe','System']"`

11. **Shutting down the browser**. The testing application will invoke this to close the browser when the user elects to exit the browser. The boolean parameter will determine if the browser should restart on exit or simply exit.

	`void browser.security.close(boolean restart)`

12. **Get Application Start Time (optional)**. The testing application will invoke this to determine the local client side time that the application was launched. This is mainly used to track application uptime. If this is not provided, the web application can track it using local/session storage but it is desirable to have this information natively supported

	`DateTime browser.security.getStartTime()`

     Example response:
	 
     `"Thu May 29 2014 17:35:24 GMT-0500 (Central Standard Time)"`

13. **Speak Text (Text to speech Synthesis)**. The testing application will invoke this to perform client side text to speech synthesis. The API call will be passed in a string with embedded speech markup, an options object to control the speech (optional) and a callback for TTS events (optional). The vendor can support one of the following markup standards, SSML, Microsoft speech markup (for windows) or Apple speech markup (for OS X). The options object include `voicename`, `rate`, `gender`, `language`, `pitch`, `volume`. The callback, if provided, is invoked for TTS events which include `start`, `end`, `word boundary`, `sentence boundary`, `synchronization/marker` encountered, `paused` and `error`. 

	`void browser.tts.speak(string text, object options, function callback)`

14. **Stop speech (Text to speech Synthesis)**. This is called by the testing application to stop any speech that may be in progress. 

	`void browser.tts.stop()`

15. **Get speech status (Text to speech Synthesis)**. This is called by the testing application to inspect the current status of speech. The valid values are `unavailable`, `idle`, `paused` and `speaking`

	`string browser.tts.getStatus()`

     Where Status is one of:

    'NotSupported'  : tts initialization failed.
    'Uninitialized' : tts is not initialized
    'Initializing'  : tts initialization in progress
    'Stopped'       : tts is initialized and there is nothing playing
    'Playing'       : playing is in progress
    'Paused'        : playing was paused
    'Unknown'       : unknown status

16. **Get available voices (Text to speech Synthesis)**. This is called by the testing application to get a listing of the available voice packs in the current system. 
	
	`string[] browser.tts.getVoices()`

     Example Response:

     `['US English Female TTS','en-US','es-ES']`

17. **Pause speech (Text to speech Synthesis)**. This is called by the web application to temporarily pause speech. Corresponding events are fired to notify the callback provided in the `speak` function of this.

	`void browser.tts.pause()`

18. **Resume speech (Text to speech Synthesis)**. This is called by the web application to resume speech if it was previously paused. 

	`void browser.tts.resume()`

19. **Initialize audio recorder**. This method is called by the testing application once to initialize the audio API after a page loads. The event listener passed in as argument is used to notify events to caller about progress.  Any attempts to call this method when it has already been called should be treated as a reset and reinit.

	`void browser.recorder.initialize (eventListener)`

	Events expected

	`INITIALIZING` – indicates that initialization is in progress
	`READY` – Initialization is done and internal data structures are loaded
	`ERROR` – Initialization failed with information on failure cause

20. **Get audio recorder status**. This method is called to enquire about the status of the recorder. Return values are 
 
	`string browser.recorder.getStatus()`

	values expected are

	`IDLE` – no recording in progress
	`ACTIVE`- recording in progress
	`INITIALIZING` – initialization in progress
	`ERROR` – terminal error state and reinit is required 
	`STOPPING` – recording is done and final book keeping and generation of encoded audio is in progress
	`PLAYING` - recorder is playing back some audio
	`PAUSED` - recorder is paused playing back some audio

21. **Get audio recorder capabilities**. This method is called to enquire about the capabilities of the platform. Throws error if called before initialize is completed successfully. The return value includes
 
	`object browser.recorder.getCapabilities()`

	`isAvailable` – recording is supported (Boolean)
	`supportedInputDevices` – a list of audio input devices detected. Each of these device definitions includesdevice id, device description/label, supported sample size(s), supported sample rate(s), supported channel count(s), encoding format(s) supported 	

22. **Intiate audio capture**. This method is called to initiate capture.  Throws error if called prior to successful initialization. Throws errors if the options passed in are not supported on the device. Throws error if capture status is currently not IDLE. The options object includes
`captureDevice` – the device id to use for data capture (int)
sample rate – the line rate to capture the raw audio in (8Khz, 11Khz etc) (specified as int in hz)
`channel count` – 1 (mono), 2(stereo) … (specified as int)
`sample size` – 8bit, 16bit etc 	(specified as int)
`encoding format` – SPX, HE-AAC, Opus etc (specified as string)
`quality indicator desired` – whether to perform and report a recording quality check or not (Boolean)
`progressEventFrequency` – how frequently the event listener should be called back to report progress events either based on time or on units of data collected. For example, we could ask for periodic progress events every 2 seconds to keep us notified as recording is happening or every 30KB of new data collected
`captureLimit `– object literal that specifies time or size for the data capture after which the recorder should automatically stop capturing and fire an end event (specified as {duration: 40} or {size:250}, unit for duration is in seconds and for size, is in KB). The event listener is passed in to receive capture events. The events include
`START` – Capture started
`INPROGRESS` – Progress event with progress data (34 seconds of audio captured, 36 seconds of audio captured etc or 10KB of audio captured, 30 KB of audio captured etc) 
`END` – Capture complete. The `END` event is special. This event gives us the pointer to the  data collection for the encoded audio. In addition, a quality check is performed on the captured audio stream to evaluate whether it is good or not. 

	`object browser.recorder.startCapture(options, eventListener)`

23. **Stop recording**. This method is called to stop audio capture. Throws error if status is currently not “RECORDING”.

	`void browser.recorder.stopCapture()`

24. **Retrieve recording**. This method is called to retrieve base64 encoded audio data that was previously captured (or played back by the recorder). If the `END` event for audio capture includes the base64 encoded audio, then this call is optional. Note: If the event does not include the data, the testing application will be invoking this api directly in the callback for the `END` event.

	`string browser.recorder.retrieveAudio()`

23. **Playback a recording**. This method is called to playback a recording made through the recorder at some prior time (even in a previous session of the browser) in an asynchronous manner. This API is optional if the browser supports HTML5 webaudio to playback encoded audio (encoded using the format specified in the `startcapture` call) obtained by a call to `retrieveAudio()`. The playback function is passed in the base64 audio string and a call back function.  

	`void browser.recorder.playback(b64audio, callback)`

The call back function is expecting the following events:
`PLAYBACK_START` - Playback has started. The event includes the id of the audio passed in 
`PLAYBACK_STOPPED` - Playback has stopped (either because the audio stream is done, `pausePlayback()` or `stopPlayback()` has been invoked). The event includes the id of the audio passed in

24. **Stop playback**. This method is invoked to stop an ongoing audio playback. Throws error if status is currently not "PLAYING".

	`void browser.recorder.stopPlayback()`

25. **Pause playback**. This method is invoked to pause an ongoing audio playback. Throws error if status is currently not "PLAYING"

	` void browser.recorder.pausePlayback()`

26. **Resume playback**. This method is invoked to resume an already paused audio playback. Throws error if status is currently not "PAUSED"

	`void browser.recorder.resumePlayback()`


API Usage:
=========

In this section, we will review typical usage scenarios for the APIs listed above. 

1. When the login page is loaded into the browser, the login page goes through a sequence of initial clean up steps to ensure that the student is starting from a pristine starting point for a test. These steps all need to succeed (optional calls that are not present will be skipped)

![](load.svg)

2. When the student enters their credentials and attempts to enter a test, we then attempt to secure the environment and only after the environment has been secured, do we allow the student to proceed

![](login.svg)

3. For tests where text to speech is offered, the web application goes through a sequence of calls to setup and subsequently offer text to speech on demand to the student. 

![](tts.svg)


4. For tests where audio recording is required, the web application goes through a sequence of calls to setup and subsequently offer recording on demand to the student.

![](record.svg)
