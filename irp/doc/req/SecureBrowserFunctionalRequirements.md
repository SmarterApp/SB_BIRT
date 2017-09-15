# Secure Browser Functional Requirements

v.2.1.9 - Last modified 15-Sep-2017

## IP Notice
This specification is &copy;2017 by American Institutes for Research and is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## Overview
At a high level, the Secure Browser must do the following:

1. Browse to the designated test-taking URL (and no other) and act as the web browser user agent for the test delivery servers.
   * _Rationale_: It's crucial for the browser to prevent the user from browsing to an unauthorized site, since test-related information may be obtained and/or shared with others at that site. Furthermore, the browser needs to be "trusted" by the test delivery systems and be capable of delivering and faithfully rendering assessments according to modern web standards.
   * _User Stories_:
      * The student starts the browser by pointing it at an unauthorized site. The browser recognizes this and instead directs the user to the default testing site. After state selection by the student, the browser authenticates with the TDS servers.
      * The student starts the browser without an explicit URL. The browser opens the default testing site and after state selection by the student, the browser authenticates with the TDS servers.
2. Exclude the student from accessing any unauthorized service or application on the device. Generally speaking this includes all applications and tools except for assistive technology applications.
   * _Rationale_: The browser must prevent the user from accessing tools or applications that could provide them with an advantage in answering test questions (and thereby violating the construct of the assessment). Examples of such applications would be another web browser, a calculator, a spell checker, a dictionary, email, VoIP, or IM.
   * _User Stories_: 
      * The student is taking a math assessment which requires long division. The student switches to the Calculator application, performs the division, and enters the response into the test.
      * The student is taking a science assessment which requires analysis of a chemical reaction. The student switches to another web browser, searches the internet for the response, and enters it into the test.
3. Provide a security API, callable from JavaScript, which allows the testing server to assess the security status of the devices. (The API is defined in [1].)
   * _Rationale_: The browser must be able to assess the security status of the device on which it is running, and pass that information securely to the testing server.
   * _User Stories_: 
      * The student starts the secure browser but other apps are open. The testing server requests the security status of the device from the browser. The browser detects if the appropriate conditions are in place to consider the device secure and reports back to the testing server.
4. Provide a text-to-speech API, callable from JavaScript, which allows the testing application to make use of text-to-speech functionalities provided by the device operating system or by the browser.
   * _Rationale_: The browser must be able to use available TTS systems (either custom or W3C standard) when requested by the testing server.
   * _User Stories_: 
      * The student starts a test on the secure browser. The testing server requests that certain assessment items be read out loud to the student. The server makes appropriate API calls to effect this.
5. Optionally provide a recording API, allowing simple recording capabilities such as play/pause/resume/stop, as well as recording retrieval. This capability is browser-dependent.
   * _Rationale_: In order to evaluate a student's verbal skills, the device should have the ability to record and playback audio via the browser.
   * _User Stories_: 
      * The student starts a test on the secure browser. The testing server displays a test item and requests that the student provide a verbal response. The server makes appropriate API calls to effect this.
 
Most of the high level functional requirements listed below are implemented by the Secure Browser API Specification [1].

## Requirements
### A. Security Related Requirements
1. F01. The secure browser shall NOT provide a means to clear browser cache.
   * _Rationale_:
		* Browser cache is controlled via `cache-control` headers set from the server side. The server attaches query strings to js/CSS links which allows it to break caches by changing the query string parameters.
   * _References_: Smarter Balanced Secure Browser Contract requirements.
1. F02. The secure browser shall NOT provide a means to clear browser cookies.
	* _Rationale_:
		* Browser cookies can be indirectly expired by the server (by setting the cookie's expiration date to a past date). The next time a user makes a request to a page within the domain or path that set the cookie, the browser will determine that the cookie has expired and remove it.
	* _References_: Smarter Balanced Secure Browser Contract requirements.
1. F03. The secure browser may provide a means to clear system clipboard (optional).
	* _Rationale_:
		* The clipboard is a software facility used for short-term data storage and/or data transfer between documents or applications, via copy and paste operations. Clearing it can eliminate the possibility of the student using the clipboard to maintain assessment-related information.
	* _User Stories_:
		* The student copies assessment-related details for a particular test before starting a test and paste that information to answer assessment questions in secure browser . 
1. F04. The secure browser may provide a means to retrieve system MAC address (optional).
	* _Rationale_:
		* A Media Access Control address, better known as MAC address, is a unique identifier assigned to a network adapter or network interface card (NIC) by the manufacturer for identification. Keeping track of MAC addresses allows for troubleshooting machine-specific issues.
	* _User Stories_: 
		* The student takes a test on a particular device and experiences random timeout problems not experienced by other students. The student's MAC address can be used to identify the specific device and troubleshoot the issue.
1. F05. The secure browser shall NOT provide a means to retrieve the system IP address(es).
	* _Rationale_:
		* An Internet Protocol address (IP address) is a numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. Exposing IP addresses through a browser service can enable hackers to exploit a service on an open port.
	* _User Stories_:
		* To exploit a service on a port, a hacker could banner grab for the software and version. With this information, they would search for known exploits to run against the service.
1. F06. The secure browser shall NOT provide a means to retrieve the current list of running processes, their PIDs and their PPIDs.
	* _Rationale_:
		* The process identifier (normally referred to as the process ID or just PID) is a number used by most multiprocessing operating system kernels to uniquely identify an active process. Exposing PID or PPIDs could potentially be misused to compromise student privacy.
	* _User Stories_:
		* A nefarious user obtains the PIDs of all processes running on a student machine, compromising the student's privacy and potentially the school's security.
1. F07. The secure browser may provide a means to obtain the application start time (optional).
	* _Rationale_:
		* Application start time provides client-side time of current launch.
	* _User Stories_:
		* The ability to capture uptime provides useful statistics about the usage model of the secure browser. This information could possibly be used in the future to restart the browser periodically for improved performance.
1. F08. The secure browser shall provide a means to query if `Spaces` is enabled or not, for macOS.
	* _Rationale_:
		* Spaces enables users to create multiple virtual desktops suited to the unique needs or work habits of the user. A user could, for example, create and assign a "space" to office work, enabling him or her to leave a work-related application (such as a word processor or a spreadsheet) running full screen and then switch to a different space designated for browsing the Internet or navigating file structure in Finder windows.
	* _User Stories_:
		* The student uses one space for the Test Delivery System, while dedicating another space to searching the internet for answers. This API provides the capability to determine whether spaces are enabled, and if so blocks user from taking a test.
1. F15. The secure browser shall provide a means to set permissive mode.
	* _Rationale_:
		* Permissive mode provides the user with the ability to change configurations for assistive technology tools such as JAWS, during a testing session.
	* _User Stories_:
		* Student wants to change rate/pitch of JAWS for the test. Without permissive mode, the student would not be able to switch window focus away from the test.
1. F49. The secure browser shall provide a means to query the status of permissive mode.
	* _Rationale_:
		* Permissive mode provides the user with the ability to change configurations for assistive technology tools such as JAWS, during a testing session.
	* _User Stories_:
		* This API provides the ability for the Test Delivery System to determine whether machine is in permissive mode or not if enabled Test Delivery System disable the permissive mode before starting any items to answer.
1. F31. The secure browser shall be able to determine whether blacklisted processes are running on the client machine.
	* _Rationale_:
		* Applications such as Skype, FaceTime, Outlook or internet browsers could allow students to obtain test answers or share test details from with others. Checking blacklisted process provides ability for the calling application to block user from taking a test if such applications are running.
	* _User Stories_:
		* The student begins a test and attempts to switch to an unauthorized application to look for the answer. This would violate test construct and security. This scenario should be blocked.
1. F36. The secure browser shall be able to get device info.
	* _Rationale_:
		* Device info provides application with the ability to identify software/hardware version of the machine. Keeping track of device info allows for troubleshooting machine-specific/operating system specific issues.
	* _User Stories_:
		* The student takes a test on a particular device and experiences random timeout problems not experienced by other students. The student's device info can be used to identify and troubleshoot the issue.
1. F37. The secure browser shall be able to lock down the environment.
   * _Rationale_:
		* It's crucial for the browser to prevent the user from browsing to an unauthorized site, since test-related information may be obtained and/or shared with others at that site. Locking down student environment will prevent student from accessing different application like internet browser or Skype to make calls during test session.
   * _User Stories_:
		* Student uses internet browser to look for an answer during test session running in secure browser. This would violate test construct and security. This scenario should be blocked.
1. F38. The secure browser shall be able to check if environment is secure for testing.
   * _Rationale_:
		* It's crucial for the browser to prevent the user from browsing to an unauthorized site, since test-related information may be obtained and/or shared with others at that site. Locking down student environment will prevent student from accessing different application like internet browser or Skype to make calls during test session.
	* _User Stories_:
		* The student uses secure browser for the Test Delivery System, while running other applications searching the internet for answers. This API provides the capability to determine environment is secure, and if not blocks user from taking a test.
1. F46. The secure browser may be able to get the status of a particular browser capability (optional).
	* _Rationale_:
		* Browser capability will provide information on capabilities like screen capture, print, etc. on MS-TAT browser.
	* _User Stories_:
		* This API provides the ability for the Test Delivery System to determine whether screen capture, print, etc. is enabled or not if enabled Test Delivery System disable those capabilities before starting any items to answer.
1. F47. The secure browser may be able to set the status of a particular browser capability (optional).
	* _Rationale_:
		* Browser capability will provide information on capabilities like screen capture, print, etc. on MS-TAT browser.
	* _User Stories_:
		* This API provides the ability for the Test Delivery System to determine whether screen capture, print, etc. is enabled or not if enabled Test Delivery System disable those capabilities before starting any items to answer.

### B. Device Related Requirements
1. F09. The desktop secure browser shall provide a means to get system volume.
	* _Rationale_:
		* System volume provides the student with the ability to change system volume settings in secure browser as it is open in kiosk/fullscreen mode where minimization of secure browser is not allowed to access volume setting.
	* _User Stories_:
		* Student is listening to voice output through JAWS and wants to change volume without going into permissive mode, student selects setting and changes system volume.
1. F10. The desktop secure browser shall provide a means to set system volume.
	* _Rationale_:
		* System volume provides the user with the ability to change system volume settings in secure browser as it is open in kiosk/fullscreen mode where minimization of secure browser is not allowed to access volume setting.
	* _User Stories_:
		* Student is listening to voice output through JAWS and wants to change volume without going into permissive mode, student selects setting and changes system volume.
1. F11. The desktop secure browser shall provide a means to mute system volume.
	* _Rationale_:
		* System mute provides the user with the ability to mute system volume settings in secure browser as it is open in kiosk/fullscreen mode where minimization of secure browser is not allowed to access volume setting.
	* _User Stories_:
		* Student is listening to voice output through JAWS and wants to mute system volume without going into permissive mode, student selects setting and mute system volume.
1. F12. The desktop secure browser shall provide a means to unmute system volume.
	* _Rationale_:
		* System unmute provides the user with the ability to unmute system volume settings in secure browser as it is open in kiosk/fullscreen mode where minimization of secure browser is not allowed to access volume setting.
	* _User Stories_:
		* Student is using JAWS and wants to unmute system volume without going into permissive mode, student selects setting and unmute system volume.
1. F13. The desktop secure browser shall provide a means to check if system volume is Muted.
	* _Rationale_:
		* System Volume is muted status events allow the application to monitor volume settings and make adjustments for UI updates accordingly.
	* _User Stories_:
		* Student wants to listen to audio output, application will update UI to show volume is muted or not, and prompt user to unmute the system volume.
1. F14. The desktop secure browser shall provide a means to close the browser.
	* _Rationale_:
		* Close Browser API provides student with the ability to close secure browser as it is open in kiosk/fullscreen mode where switching to different application is not allowed.
	* _User Stories_:
		* Student completed test and want to close the secure browser to continue his/her other assignment on device.
		* School Administration team wants to update system or software on the device and want to close the secure browser.

### C. Text-to-Speech (TTS) Related Requirements

_Rationale_: Text-to-Speech, abbreviated as TTS, is a form of speech synthesis that converts text into spoken voice output. Text-to-Speech API provides the ability for visually impaired student to listen computer-generated spoken voice that would "read" questionnaire during test session. Users may need to interact with the TTS speech (stop, pause, play, etc.) for a variety of reasons. For example, the room may have become noisy, or the user needs to replay the selection for better comprehension, or the user doesn't want or need to hear the remainder of the selected text being spoken.
	
1. F16. The secure browser shall provide shall provide a means to play arbitrary text.
	* _User Stories_: 
		* Student selects an arbitrary amount of text and chooses to play it aloud. The browser outputs this text in a spoken voice.
1. F17. The secure browser shall provide a means to stop TTS speech in progress.
	* _User Stories_:
		* Student is finished listening to the spoken voice output of previously selected text, and directs the browser to stop playing it.
1. F18. The secure browser shall provide a means to pause TTS speech in progress.
	* _User Stories_:
		* Student needs to pause the currently active TTS speech, and directs the browser to pause the speech.
1. F19. The secure browser shall provide a means to retrieve list of TTS voice packs available on the machine.
	* _Rationale_: 
		* Text-to-Speech voice packs are necessary in order to provide a variety of speech languages to the users. These voice packs provide different languages, regional accents, and gender variants.
	* _User Stories_:
		* Student is listening to TTS voice output but has difficulty understanding it due to the voice's regional accents. Student can change the voice pack being used for Text-to-Speech.
1. F21. The secure browser shall provide a means to resume previously paused TTS speech.
	* _User Stories_:
		* Student desires to continue the previously paused speech, and directs the browser to resume voice output of the previously selected text from where it was last paused.
1. F22. The secure browser shall provide a means of notifying the web application of status and progress of TTS.
	* _Rationale_: 
		* Text-to-Speech status events allow the application to monitor TTS speech progress and make adjustments for UI updates accordingly.
	* _User Stories_:
		* Student is listening to TTS voice output and can visually track which word is being spoken from the event updates of the currently highlighted word.
1. F23. The secure browser shall provide a means to set a TTS voice pack as the current voice.
	* _Rationale_: 
		* Text-to-Speech voice packs are necessary in order to provide a variety of speech languages to the students. These voice packs provide different languages, regional accents, and gender variants.
	* _User Stories_:
		* Student is listening to TTS voice output but has difficulty understanding the voice output due to a voice's regional accent. The student is able to select a different voice pack for Text-to-Speech via the browser.
1. F28. The secure browser shall provide a means to get/set TTS pitch.
	* _User Stories_:
		* Student is listening to TTS voice output but has difficulty understanding the voice output due to a voice's pitch. The student is able to change pitch settings for Text-to-Speech via the browser.
1. F29. The secure browser shall provide a means to get/set TTS rate.
	* _User Stories_:
		* Student is listening to TTS voice output but has difficulty understanding the voice output due to a voice's rate. The student is able to change rate settings for Text-to-Speech via the browser.
1. F30. The secure browser shall provide a means to get/set TTS volume.
	* _User Stories_:
		* Student is listening to TTS voice output but has difficulty understanding the voice output due to a volume. The student is able to change volume settings for Text-to-Speech via the browser.

### D. Audio Recording Related Requirements
These requirements are optional.

_Rationale_: English Language Proficiency Assessment for the 21st Century (ELPA21) assessment measures and reports on students’ English language proficiency(ELP) in reading, writing, speaking, listening, and comprehension. Audio recorder and playback will allow user to listen to audio based question and record a verbal answer during ELP test session. Users may need to interact with Audio Recording(Start and Stop Recording) and Playback(stop,pause,play, etc.) for a variety of reasons. For example, user recorded a verbal answer but the room was noisy and audio quality was not good, so user can stop recording and record answer again. 

1. F50. The secure browser may provide a means to initialize the audio recording system.
	* _User Stories_:
		* Student wants to answer a question verbally and directs the browser to initialize audio recording system.
1. F25. The secure browser may provide a means to start an audio recording.
	* _User Stories_:
		* Student wants to answer a question verbally and directs the browser to start recording for selected question.
1. F26. The secure browser may provide a means to stop an audio recording.
	* _User Stories_:
		* Student is finished with the recording verbal answer and directs the browser to stop the recording.
1. F27. The secure browser may provide a means to playback an audio recording.
	* _User Stories_:
		* Student is finished with recording verbal anser and want to listen to the recorded answer, Audio API playback will provide means for student to listen to recorded output.
1. F40. The secure browser may provide a means to set audio recorder status.
	* _Rationale_:
		* Audio recorder status event allow the application of recording progress and make adjustments for UI updates accordingly.
	* _User Stories_:
		* Student wants to record a answer, application will update UI to show audio recorder is ready for recording or any error occured and cannot continue with recording.
		* Student is finished with recording and stops the recording, application will update UI to show audio recording is stopped.
1. F41. The secure browser may provide a means to get audio recorder capabilities.
	* _Rationale_:
		* Audio recorder capabilities are necessary in order to provide a list of supporting media device (speaker, headphones, etc.) on given machine to the students.
	* _User Stories_:
		* Student wants to record an answer but realize that default microphone is not the microphone attached externally and wants to select desired microphone to record verbal answer.
1. F42. The secure browser may provide a means to retrieve a recording for playback.
	* _Rationale_:
		* Retrive recording provide ability to application to get recording which was recorded for a given question.
	* _User Stories_:
		* User is finished with the recording and wants to playback the recording for a question. User select the play recording. The browser outputs this recorded audio in a audio output playback.
1. F43. The secure browser may provide a means to stop playback.
	* _User Stories_:
		* Student is finished listening to the audio playback of recorded voice, and directs the browser to stop playing it.
1. F44. The secure browser may provide a means to pause playback.
	* _User Stories_:
		* Student needs to pause the currently active audio playback, and directs the browser to pause the playback.
1. F45. The secure browser may provide a means to resume playback of a paused audio recording.
	* _User Stories_:
		* Student desires to continue the previously paused playback, and directs the browser to resume audio playback from where it was last paused.
1. F48. The secure browser may provide a means to list all available audio recordings.
	* _Rationale_:
		* Audio recordings list is necessary in order to get multiple recorded answer provided for a question or for an entire test.
	* _User Stories_:
		* Student provided multiple verbal answer for different section of a question and wants to review all recorded answer of a question. 
1. F51. The secure browser may provide a means to retrieve an audio file from a filename.
	* _Rationale_:
		* Retriving audio file from filename provides an application with a capability to get selective recorded answer for a given test during review.
	* _User Stories_:
		* Student provided multiple verbal answer for different section of a question and wants to review particular recorded response.

### E. Standards Compliance Requirements
1. F32. The secure browser shall be HTML5 compliant.
	* _Rationale_:
		* HTML5 compliant browser makes creating websites easier for various reasons like: semantics, ARIA, video and audio support, smarter storage, mobile support, etc.
	* _User Stories_:
		* Student wants to access video/audio based question, without HTML5 support for video and audio tag, application has to rely on Flash Player and other third party media players to access audio and video.
1. F34. The secure browser shall be CSS3 compliant.
	* _Rationale_:
		* CSS3 compliant browser makes creating websites easier for various reasons like: platform independent and cross browser compatible, attractive backgrounds, images and animations, etc.
	* _User Stories_:
		* Test delivery system wants to provide different themes for different state clients, with CSS3 it will be easy to change backgrounds and images as it is simple and independent, unlike CSS2 which came as one big package.

### F. Miscellaneous Requirements
1. F35. The secure browser shall check for an appropriate Global Object for API use.
	* _Rationale_:
		* The Global object will represents the secure browser specific API object namespace, Keeping all security, Text-to-Speech, Audio, settings etc. API under Global Object will allow unification of API across different operating system in secure browser and reduce amount of code maintained in Test Delivery System to access different function of secure browser.
	* _User Stories_:
		* Test delivery system wants verify that browser is secure browser and not mock version of secure browser using user agent override. It checks for browser global object to determine whether it is a secure browser.
2. F52. The Secure Browser shall support the Secure Browser Launch Protocol as defined in [2].

## References
1. [Secure Browser API Specification](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserAPIspecification.md)
2. [Secure Browser Launch Protocol](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserLaunchProtocol.md)
