irp.testspec = {
  "browserapi" : [

  // ** SEC-1 : Check Global Object */
  "impl.checkGlobalObject()",

  // ** SEC-25 : API: Retrieve device details (R) * */
  "impl.checkDeviceInfo()",

  // ** SEC-27 : API: get system MAC address(es) (O) * */
  "impl.checkMACAddressAPI()",

  // ** SEC-28 : API: Retrieve client IP address(es) (O) * */
  "impl.checkIPAddressAPI()",

  // ** SEC-29 : API: Get application start time (O). * */
  "impl.checkAppStartTimeAPI()",

  // ** SEC-32 : API: Clear Cache (R) * */
  "impl.checkClearCacheAPI()",

  // ** SEC-26 : API: empty clipboard (O) * */
  "impl.checkEmptyClipBoardAPI()",

  // ** SEC-33 : API: Clear Cookies (R) * */
  "impl.checkClearCookiesAPI()",

  // ** SEC-34 : API: Get Process List (R) * */
  "impl.checkGetProcessListAPI()",

  // ** SEC-35 : API: Close Secure Browser (R)* */
  "impl.checkCloseAPI()",

  // ** SEC-31 : API: Check if environment is secure (R) * */
  "impl.checkIsEnvironmentSecureAPI()",

  // ** SEC-30 : API: Enable Lock Down (R)* */
  "impl.checkEnableLockDownAPI()",

  // ** SEC-57 : API: Get/Set System Volume (R) * */
  "impl.checkSystemVolumeAPI()",

  // ** SEC-56 : API: System Mute/Unmute/IsMuted (R) * */
  "impl.checkSystemMuteAPI()",

  // ** SEC-10 : API Check examineProcessList * */
  "impl.checkExamineProcessList()",

  // ** SEC-75 :Retrieve List of Features and their status * */
  "impl.checkGetFeatureAPI()",

  // ** SEC-76 : Get Capability of browser based on input string * */
  "impl.checkGetCapabilityAPI()",

  // ** SEC-77 : Set Capability of browser * */
  "impl.checkSetCapabilityAPI()",

  // ** SEC-80 : API: Get status of permissive mode * */
  "impl.checkGetPermissiveModeAPI()",

  // ** SEC-71 : API: Enable/disable permissive mode * */
  "impl.checkSetPermissiveModeAPI()"

  ],
  "ttsapi" : [

  // ** SEC-36 API : TTS Speak (R) * */
  "ttsImpl.checkTTSSpeakAPI()",

  // ** SEC-40 API : TTS Pause (R) * */
  "ttsImpl.checkTTSPauseAPI()",

  // ** SEC-41 API : TTS Resume (R) * */
  "ttsImpl.checkTTSResumeAPI()",

  // ** SEC-37 : API: TTS Stop (R) */
  "ttsImpl.checkTTSStopAPI()",

  // ** SEC-52 API: Get TTS volume (R) and SEC-53 API: Set TTS volume (R)* */
  "ttsImpl.checkTTSVolumeAPI()",

  // ** SEC-50 : API: Set TTS pitch (R) * */
  "ttsImpl.checkTTSPitchAPI()",

  // ** SEC-51 API: Set TTS rate (R) * */
  "ttsImpl.checkTTSRateAPI()",

  // ** SEC-38 : API: Get TTS Status (R) * */
  "ttsImpl.checkTTSStatusAPI()",

  // ** SEC-39 : API: Get Voices for TTS (R) * */
  "ttsImpl.checkTTSVoicesAPI()",

  // ** SEC-39 : API: Get Voices for TTS (R) * */
  "ttsImpl.checkTTSVoiceNameAPI()"

  ]

};