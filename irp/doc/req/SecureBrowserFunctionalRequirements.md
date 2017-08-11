# Secure Browser Functional Requirements

v.2.1.0 - Last modified 10-Aug-2017

## IP Notice
This specification is &copy;2017 by American Institutes for Research and is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## Overview
At a high level, the Secure Browser must do the following:

1. Browse to the designated test-taking URL (and no other) and act as the web browser user agent for the test delivery servers.
  * _Rationale_: It's crucial for the browser to prevent the user from browsing to an unauthorized site, since test-related information may be obtained and/or shared with others at that site. Furthermore, the browser needs to be "trusted" by the test delivery systems and be capable of delivering and faithfully rendering assessments according to modern web standards.
  * _User Stories_:
        * The student starts the browser by pointing it at an unauthorized site. The browser recognizes this and instead directs the user to the default testing site. After state selection by the student, the browser authenticates with the TDS servers.
        * The student starts the browser without an explicit URL. The browser opens the default testing site and after state selection by the student, the browser authenticates with the TDS servers.2. Exclude the student from accessing any unauthorized service or application on the device. Generally speaking this includes all applications and tools except for assistive technology applications.
   * _Rationale_: The browser must prevent the user from accessing tools or applications that could provide them with an advantage in answering test questions (and thereby violating the construct of the assessment). Examples of such applications would be another web browser, a calculator, a spell checker, a dictionary, email, VoIP, or IM.
   * _User Stories_: 
      * The student is taking a math assessment which requires long division. The student switches to the Calculator application, performs the division, and enters the response into the test.
      * The student is taking a science assessment which requires analysis of a chemical reaction. The student switches to another web browser, searches the internet for the response, and enters it into the test.3. Provide a security API, callable from JavaScript, which allows the testing server to assess the security status of the devices. (The API is defined in [1].)
    * _Rationale_: The browser must be able to assess the security status of the device on which it is running, and pass that information securely to the testing server.
    * _User Stories_: 
      * The student starts the secure browser but other apps are open. The testing server requests the security status of the device from the browser. The browser detects if the appropriate conditions are in place to consider the device secure and reports back to the testing server.
4. Provide a text-to-speech API, callable from JavaScript, which allows the testing application to make use of text-to-speech functionalities provided by the device operating system or by the browser.
    * _Rationale_: The browser must be able to use available TTS systems (either custom or W3C standard) when requested by the testing server.
    * _User Stories_: 
      * The student starts a test on the secure browser. The testing server requests that certain assessment items be read out loud to the student. The server makes appropriate API calls to effect this.
 
Most of the high level functional requirements listed below are implemented by the Secure Browser API Specification [1].

## Requirements
### A. Security Related Requirements
1. F01. The secure browser shall NOT provide a means to clear browser cache.
   * Rationale: 
   * References: Smarter Balanced Secure Browser Contract requirements.
1. F02. The secure browser shall NOT provide a means to clear browser cookies.
1. F03. The secure browser shall provide a means to clear system clipboard.
1. F04. The secure browser shall provide a means to retrieve system MAC address.
1. F05. The secure browser shall NOT provide a means to retrieve the system IP address(es).
1. F06. The secure browser shall NOT provide a means to retrieve the current list of running processes, their PIDs and their PPIDs.
1. F07. The secure browser shall provide a means to obtain the application start time.
1. F08. The secure browser shall provide a means to query if `Spaces` is enabled or not, for macOS.
1. F15. The secure browser shall provide a means to set permissive mode.
1. F49. The secure browser shall provide a means to query the status of permissive mode.
1. F31. The secure browser shall be able to determine whether blacklisted processes are running on the client machine.
1. F36. The secure browser may be able to get device info (optional).
1. F37. The secure browser shall be able to lock down the environment.
1. F38. The secure browser shall be able to check if environment is secure for testing.
1. F46. The secure browser shall be able to get the status of a particular browser capability.
1. F47. The secure browser shall be able to set the status of a particular browser capability.

### B. Device Related Requirements
1. F09. The secure browser shall provide a means to get system volume.
1. F10. The secure browser shall provide a means to set system volume.
1. F11. The secure browser shall provide a means to mute system volume.
1. F12. The secure browser shall provide a means to unmute system volume.
1. F13. The secure browser shall provide a means to check if system volume is Muted.
1. F14. The secure browser shall provide a means to close the browser.

### C. Text-to-Speech (TTS) Related Requirements
1. F16. The secure browser shall provide shall provide a means to play arbitrary text.
1. F17. The secure browser shall provide a means to stop TTS speech in progress.
1. F18. The secure browser shall provide a means to pause TTS speech in progress.
1. F19. The secure browser shall provide a means to retrieve list of TTS voice packs available on the machine.
1. F21. The secure browser shall provide a means to resume previously paused TTS speech.
1. F22. The secure browser shall provide a means events to notify the web application of status and progress of TTS.
1. F23. The secure browser shall provide a means to set a TTS voice pack as the current voice.
1. F28. The secure browser shall provide a means to get/set TTS pitch.
1. F29. The secure browser shall provide a means to get/set TTS rate.
1. F30. The secure browser shall provide a means to get/set TTS volume.

### D. Audio Recording Related Requirements
These requirements are optional.

1. F50. The secure browser may provide a means to initialize the audio recording system.
1. F25. The secure browser may provide a means to start an audio recording.
1. F26. The secure browser may provide a means to stop an audio recording.
1. F27. The secure browser may provide a means to playback an audio recording.
1. F40. The secure browser may provide a means to set audio recorder status.
1. F41. The secure browser may provide a means to get audio recorder capabilities.
1. F42. The secure browser may provide a means to retrieve a recording for playback.
1. F43. The secure browser may provide a means to stop playback.
1. F44. The secure browser may provide a means to pause playback.
1. F45. The secure browser may provide a means to resume playback of a paused audio recording.
1. F48. The secure browser may provide a means to list all available audio recordings.
1. F51. The secure browser may provide a means to retrieve an audio file from a filename.

### E. Standards Compliance Requirements
1. F32. The secure browser shall be HTML5 compliant.
1. F34. The secure browser shall be CSS3 compliant.

### F. Miscellaneous Requirements
1. F35. The secure browser shall check for an appropriate Global Object for API use.
2. F52. The Secure Browser shall support the Secure Browser Launch Protocol as defined in [2].

## References
1. [Secure Browser API Specification](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserAPIspecification.md)
2. [Secure Browser Launch Protocol](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserLaunchProtocol.md)
