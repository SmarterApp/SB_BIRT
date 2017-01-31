//*******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
//*******************************************************************************
// REQUIRES: SecureBrowser.Base.js, Summit/air_mobile.js

TDS.SecureBrowser.Mobile = TDS.SecureBrowser.Mobile || {};

/*
 * The mobile Android version of the secure browser built on top of the Summit
 * application.
 */
TDS.SecureBrowser.Mobile.Android = function() {
  TDS.SecureBrowser.Mobile.Android.superclass.constructor.call(this);
  this._config = {
    pausedSinceLaunch : false,
    keyboardChanged : false,
    clipboardChanged : false
  };
  this._airMobile = (new Summit.SecureBrowser.Mobile()).getNativeBrowser();
  this._airMobile.initialize();
  this._textSelected = {
    rangyValue : null
  };
  this._miniAppTimeThreshold = 5; // time threshold for detecting mini apps,
  // default value is 5 seconds
  this._miniAppCountThreshold = 3; // count threshold for detecting mini
  // apps, default value is 3 times
};

YAHOO.lang.extend(TDS.SecureBrowser.Mobile.Android, TDS.SecureBrowser.Base);

TDS.SecureBrowser.Mobile.Android.prototype.initialize = function() {
  var sb = this._airMobile;
  var config = this._config;
  var textSelected = this._textSelected;
  var miniAppDetectedTime = null; // used to record the time when a mini app
  // event was first captured
  var miniAppDetectedCount = 0; // record the number of times a mini app
  // event has been captured
  var miniAppTimeThreshold = this._miniAppTimeThreshold;
  var miniAppCountThreshold = this._miniAppCountThreshold;

  // wait for SB to be ready
  sb
      .listen(
          sb.EVENT_DEVICE_READY,
          window.document,
          function() {

            /*
             * Any time the app returns from background, we treat that as a
             * breach of security
             */
            sb.listen(sb.EVENT_RETURN_FROM_BACKGROUND, window.document,
                function() {
                  config.pausedSinceLaunch = true;
                });

            /*
             * check if a differnt keyboard other than the default soft keyboard
             * is being used, and if so, retreat as a breach of security
             */
            if (sb.device.keyboard != 'com.air.mobilebrowser/.softkeyboard.SoftKeyboard') {
              config.keyboardChanged = true;
            }

            /*
             * detect any change in keyboard, and if there is change, treat as a
             * breach of security
             */
            sb.listen(sb.EVENT_KEYBOARD_CHANGED, window.document, function() {
              config.keyboardChanged = true;
            });

            /*
             * detect if the content of the clipboard has been changed, and if
             * there is change, treat as a breach of security
             */
            sb.listen(sb.EVENT_CLIPBOARD_CHANGED, window.document, function() {
              config.clipboardChanged = true;
            });

            /*
             * This is the code to capture the event that will be fired when
             * mini apps are running
             */
            sb
                .listen(
                    sb.EVENT_MINI_APP_DETECTED,
                    window.document,
                    function() {
                      miniAppDetectedCount++;
                      /*
                       * record the time when the mini app event was first
                       * captured
                       */
                      if (miniAppDetectedTime == null) {
                        miniAppDetectedTime = (new Date()).getTime();
                      } else if (miniAppDetectedCount > miniAppCountThreshold) {
                        var currentTime = (new Date()).getTime();
                        if ((currentTime - miniAppDetectedTime) < (miniAppTimeThreshold * 1000)) {
                          /*
                           * if the number of events within a short period is
                           * larger than the threshold value, issue security
                           * warning
                           */
                          config.pausedSinceLaunch = true;
                        }
                        miniAppDetectedCount = 0;
                        miniAppDetectedTime = null;
                      }
                    });
          });

  sb.listen(sb.EVENT_TEXT_SELECTED, window.document, function() {
    textSelected.rangyValue = window.rangy.getSelection(document);
  });

};

TDS.SecureBrowser.Mobile.Android.prototype.isEnvironmentSecure = function() {
  var result = {
    'secure' : (!this._config.pausedSinceLaunch
        && !this._config.keyboardChanged && !this._config.clipboardChanged),
    'messageKey' : null
  };
  return result;
};

TDS.SecureBrowser.Mobile.Android.prototype.getSelectedText = function() {
  return this._textSelected.rangyValue;
};

// Returns a handle to the native browser engine.
TDS.SecureBrowser.Mobile.Android.prototype.getRunTime = function() {
  return this._airMobile;
};

TDS.SecureBrowser.Mobile.Android.prototype.checkGlobalObject = function() {
  var result = false;
  var details = "";
  try {
    var sb = this._airMobile;
    result = true;
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkGlobalObject',
      'testname.checkGlobalObject.mobile', 'api.checkGlobalObject.mobile',
      result, details);

};

TDS.SecureBrowser.Mobile.Android.prototype.checkDeviceInfo = function() {
  var result = true;
  var details = 'testApi.remove';
  try {
    if (!!this._airMobile.security.getDeviceInfo) {
      result = false;
      details = 'testApi.exist';
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation
      .setResultItems('apiId.checkDeviceInfo', 'testname.checkDeviceInfo',
          'api.checkDeviceInfo.mobile', result, details);
};

TDS.SecureBrowser.Mobile.Android.prototype.checkMACAddressAPI = function() {
  var result = true;
  var details = 'testApi.remove';
  try {
    if (!!this._airMobile.security.getMACAddress) {
      result = false;
      details = 'testApi.exist';
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkMACAddressAPI',
      'testname.checkMACAddressAPI', 'api.checkMACAddressAPI.mobile', result,
      details);

};

TDS.SecureBrowser.Mobile.Android.prototype.checkIPAddressAPI = function() {
  var result = true;
  var details = 'testApi.remove';
  try {
    if (!!this._airMobile.security.getIPAddressList) {
      result = false;
      details = 'testApi.exist';
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkIPAddressAPI',
      'testname.checkIPAddressAPI', 'api.checkIPAddressAPI.mobile', result,
      details);

};

TDS.SecureBrowser.Mobile.Android.prototype.checkAppStartTimeAPI = function() {
  var result = false;
  var details = "";
  try {
    if (!!this._airMobile.security.getStartTime) {
      result = true;
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkAppStartTimeAPI',
      'testname.checkAppStartTimeAPI', 'api.checkAppStartTimeAPI.mobile',
      result, details);
};

// SEC-30
TDS.SecureBrowser.Mobile.Android.prototype.checkEnableLockDownAPI = function() {
  var result = false;
  var details = "";
  try {
    if (!!this._airMobile.security.enableLockdown) {
      result = true;
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkEnableLockDownAPI',
      'testname.checkEnableLockDownAPI', 'api.checkEnableLockDownAPI.mobile',
      result, details);
};

// SEC-33
TDS.SecureBrowser.Mobile.Android.prototype.checkClearCookiesAPI = function() {
  var result = true;
  var details = 'testApi.remove';
  try {
    if (!!this._airMobile.security.clearCookies) {
      result = false;
      details = 'testApi.exist';
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkClearCookiesAPI',
      'testname.checkClearCookiesAPI', 'api.checkClearCookiesAPI.mobile',
      result, details);
};

// SEC-32
TDS.SecureBrowser.Mobile.Android.prototype.checkClearCacheAPI = function() {
  var result = true;
  var details = 'testApi.remove';
  try {
    if (!!this._airMobile.security.clearCache) {
      result = false;
      details = 'testApi.exist';
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkClearCacheAPI',
      'testname.checkClearCacheAPI', 'api.checkClearCacheAPI.mobile', result,
      details);
};

// SEC-31
TDS.SecureBrowser.Mobile.Android.prototype.checkIsEnvironmentSecureAPI = function() {
  var result = true;
  var details = 'testApi.remove';
  try {
    if (!!this._airMobile.security.isEnvironmentSecure) {
      result = false;
      details = 'testApi.exist';
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkIsEnvironmentSecureAPI',
      'testname.checkIsEnvironmentSecureAPI',
      'api.checkIsEnvironmentSecureAPI.mobile', result, details);
};

// SEC-35
TDS.SecureBrowser.Mobile.Android.prototype.checkCloseAPI = function() {
  var result = false;
  var details = "";
  var restart = false;
  try {
    if (!!this._airMobile.security.close) {
      result = true;
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkCloseAPI',
      'testname.checkCloseAPI', 'api.checkCloseAPI.mobile', result, details);
};

// SEC-34
TDS.SecureBrowser.Mobile.Android.prototype.checkGetProcessListAPI = function() {
  var result = true;
  var details = 'testApi.remove';
  try {
    if (!!this._airMobile.security.getProcessList) {
      result = false;
      details = 'testApi.exist';
    }
  } catch (ex) {
    details = ex.message;
  }

  Util.Validation.setResultItems('apiId.checkGetProcessListAPI',
      'testname.checkGetProcessListAPI', 'api.checkGetProcessListAPI.mobile',
      result, details);
};

// SEC-26
// air_mobile.js does not have support for emptyClipBoard function
TDS.SecureBrowser.Mobile.Android.prototype.checkEmptyClipBoardAPI = function() {
  var result = true;
  var details = 'Mobile Secure browser does not support emptyClipBoard function';

  Util.Validation.setResultItems('apiId.checkEmptyClipBoardAPI',
      'testname.checkEmptyClipBoardAPI', 'api.checkEmptyClipBoardAPI.mobile',
      result, details);

};

TDS.SecureBrowser.Mobile.Android.prototype.close = function(restart) {

  try {
    if (!!this._airMobile) {

      if (this._airMobile.security.close === 'function') {
        this._airMobile.security.close(restart);
      }
      return true;
    }
  } catch (ex) {
  }
  return false;
};