Secure Browser API Specification
------------------

All vendors are required to expose a window global object called `browser`. The APIs discussed below are exposed through this global object. Some APIs are supported as part of existing W3C specifications, and are identified as such.

## Required Methods

1. **Lock down environment to begin an assessment**. The testing web application will invoke this call prior to allowing students to start testing. The implementer is required to take any actions necessary to secure the testing environment. The steps taken to secure the environment are device specific and for example, include aspects such as disabling the ability to do screen captures, disabling the ability to voice chat when in secure mode, clearing the system clipboard, entering into a kiosk mode, disabling Spaces in OS X 10.7+ etc. The testing application will enable lockdown before an assessment commences and will disable the lockdown when the student has completed the assessment and is out of the secure test.

	`void browser.security.enableLockDown (boolean lockDown)`

1. **Check if environment is secure**. Check if the environment is secure. The testing web application will invoke this prior to allowing students to start testing and periodically when inside the test. 

    `object browser.security.isEnvironmentSecure()`  

    The return type is a JSON object containing two fields. The first is the `secure` field, which must return `true` only if all necessary locks have been enabled (or features disabled) to enable a secure testing environment, and none of these have been compromised since we entered the lockdown mode. The other field (`messageKey`) includes other details or information.
    
    `{
       'secure' : "true/false",
       'messageKey' : "some message"
    }`
    
1. [TBD] **Retrieve List of Features and their status**. In some cases, testing may not require the environment to be fully locked down. We may still allow a test to proceed even if `browser.security.isEnvironmentSecure()` returns false as long we can determine which features are currently available to the end user and allow the testing application to make a determination. 

	`object browser.security.getFeatures()`
	
    returns either a Javascript object or literal with the following structure

	`{<feature>:true|false, ...}`

    Example: `{"screencapture":true, "voicerecording":false, "videocamera":false, "cortana": true}`

1. **Retrieve information on the environment (device)**. The testing web application will invoke this to gather details about the platform on which it is running. This is used to augment any information that was discernible from the user agent.

	`object browser.security.getDeviceInfo()`

	The returned object has the following properties: `manufacturer`,`HWVer`, `SWVer`

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
    
    The ability to set the pitch, rate, voice, and volume is provided by this API call through the options object.

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

1. **Get current voice pack (Text to speech Synthesis)**. This is called by the testing application to get the name of the currently active voice pack. 

    `string browser.tts.getVoiceName()`

1. **Pause speech (Text to speech Synthesis)**. This is called by the web application to temporarily pause speech. Corresponding events are fired to notify the callback provided in the `speak` function of this.

	`void browser.tts.pause()`

1. **Resume speech (Text to speech Synthesis)**. This is called by the web application to resume speech if it was previously paused. 

	`void browser.tts.resume()`

1. [TBD] **Is OS X Spaces Enabled**. Applicable to Mac OS X only. This runtime browser property can be read by the testing application Returns true if Spaces is enabled, false otherwise. 

1. **Get System Volume**. Get system volume: This runtime browser property can be queried by the testing application to get the System Volume. This is only available in desktop secure browsers.

    `browser.systemVolume` contains the value of the current system volume (0-10)

1. **Set System Volume**. Set system volume: This runtime browser property can be written to by the testing application to set the System Volume. This is only available in desktop secure browsers.

    `browser.systemVolume` accepts a value for the system volume (0-10)
	
1. **Mute System Volume**. Mute system volume: This runtime browser property can be written to by the testing application to mute the System Volume. This is only available in desktop secure browsers.

    `browser.systemMute` set to true to mute, false to unmute. 

1. **Unmute System Volume**. Unmute system volume: This runtime browser property can be written to by the testing application to unmute the System Volume. This is only available in desktop secure browsers.

    `browser.systemMute` set to true to mute, false to unmute. 
    
1. **Check if System Volume is Muted**. Check if System Volume is Muted: This runtime browser property can be read by the testing application to check the mute status of the System Volume. This is only available in desktop secure browsers.

    `browser.systemMute` is true if muted, false if unmuted.
    
1. [TBD] **Enable permissive mode**. TBD

### Optional APIs

1. **Get Application Start Time**. The testing application will invoke this to determine the local client side time that the application was launched. This is mainly used to track application uptime. If this is not provided, the web application can track it using local/session storage but it is desirable to have this information natively supported:

	`DateTime browser.security.getStartTime()`

    Example response:
	 
    `"Thu May 29 2016 17:35:24 GMT-0500 (Central Standard Time)"`

#### Audio Recorder 
*NOTE: All recorder APIs should follow W3C's Web Audio API (https://www.w3.org/TR/webaudio/).*

1. **Initialize audio recorder**
1. **Get audio recorder status**
1. **Get audio recorder capabilities**
1. **Initiate audio capture**
1. **Stop recording**
1. **Retrieve recording**
1. **Playback a recording**
1. **Stop playback**
1. **Pause playback**
1. **Resume playback**


## Secure Browser Standards Compliance
### Required

1. [TBD] **HTML5 compliant**. The secure browser must be HTML5 compliant: https://www.w3.org/TR/html5/ and http://html5test.com

1. [TBD] **Acid3 compliant**. The secure browser must be Acid3 compliant: http://www.acidtests.org and http://acid3.acidtests.org

1. [TBD] **CSS3 compliant**. The secure browser must be CSS3 compliant: https://www.w3.org/TR/2014/REC-css-namespaces-3-20140320 and http://css3test.com

### Optional
1. **W3C Web Audio compliant**. W3C Web Audio API:
https://www.w3.org/TR/webaudio

1. **W3C Web Speech compliant**. W3C Web Speech API:
https://dvcs.w3.org/hg/speech-api/raw-file/9a0075d25326/speechapi.html

    *Note: As of Firefox v.51, SSML support lacks the features necessary for optimal TDS TTS delivery. Thererfore, support for TTS APIs as described in this document is necessary.*
