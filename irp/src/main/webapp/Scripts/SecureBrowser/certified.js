// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
(function(SB) {

  function Certified() {
    Certified.superclass.constructor.call(this);
  }
  ;

  YAHOO.lang.extend(Certified, TDS.SecureBrowser.Base);

  Certified.prototype.checkGlobalObject = function() {

    var result = false;
    var details = "";
    var apiPrefix = certified;
    try {
      var hasAPI = (typeof (window.browser) === 'object');

      if (hasAPI && Util.Browser.isEdge() && !!window.browser.addEventListener) {
        result = true;
        apiPrefix = certified_edge;
      } else if (!!window.browser) {
        result = true;
      } else {
        result = false;
        details = 'window.browser is not defined';
      }
    } catch (ex) {
      result = false;
      details = ex.message
    }

    Util.Validation.setIRPTestResults('checkGlobalObject', apiPrefix, result,
        details, null);

  };

  Certified.prototype.checkDeviceInfo = function() {

    var result = false;
    var details = '';
    try {
      if (!!browser.security.getDeviceInfo) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkDeviceInfo', certified, result,
        details, null);
  };

  Certified.prototype.checkMACAddressAPI = function() {
    var result = false;
    var details = '';
    try {
      if (!!browser.security.getMACAddress) {
        result = true;

        var macAddress = browser.security.getMACAddress();
        if (!Util.Validation.isMacAddressValid(macAddress)) {
          result = false;
          details = 'Invalid MAC Address : ' + macAddress;
        } else {
          details = 'MAC Address : ' + macAddress;
        }
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkMACAddressAPI', certified, result,
        details, null);

  };

  Certified.prototype.checkIPAddressAPI = function() {
    var result = true;
    var details = 'testApi_removed';
    try {
      if (!!browser.security.getIPAddressList) {
        result = false;
        details = 'testApi_exists';
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkIPAddressAPI', certified, result,
        details, null);

  };

  Certified.prototype.checkAppStartTimeAPI = function() {
    var result = false;
    var details = "";
    try {
      if (!!browser.security.getStartTime) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkAppStartTimeAPI', certified,
        result, details, null);
  };

  // SEC-32
  Certified.prototype.checkClearCacheAPI = function() {

    var result = true;
    var details = 'testApi_removed';
    try {
      if (!!browser.security.clearCache) {
        result = false;
        details = 'testApi_exists';
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkClearCacheAPI', certified, result,
        details, null);
  };

  // SEC-33
  Certified.prototype.checkClearCookiesAPI = function() {
    var result = true;
    var details = 'testApi_removed';

    try {
      if (!!browser.security.clearCookies) {
        result = false;
        details = 'testApi_exists';
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkClearCookiesAPI', certified,
        result, details, null);
  };

  // SEC-26
  Certified.prototype.checkEmptyClipBoardAPI = function() {
    var result = false;
    var details = "";

    try {
      if (!!browser.security.emptyClipBoard) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkEmptyClipBoardAPI', certified,
        result, details, null);

  };

  // SEC-34
  Certified.prototype.checkGetProcessListAPI = function() {
    var result = true;
    var details = 'testApi_removed';

    try {
      if (!!browser.security.getProcessList) {
        result = false;
        details = 'testApi_exists';
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkGetProcessListAPI', certified,
        result, details, null);

  };

  // SEC-35
  Certified.prototype.checkCloseAPI = function() {
    var result = false;
    var details = "";
    var restart = false;
    var testApi = '';

    try {
      // TDS-1403: Our latest API specifies 'close' as the name of this function
      // which MS Edge SB uses
      if (!!browser.security.closeWindow) {
        testApi = certified;
        result = true;
      } else if (!!browser.security.close) {
        testApi = certified_edge;
        result = true;

      }

    } catch (ex) {
      details = ex.getMessage();
    }

    Util.Validation.setIRPTestResults('checkCloseAPI', testApi, result,
        details, null);
  };

  // SEC-30
  Certified.prototype.checkEnableLockDownAPI = function() {
    var result = false;
    var details = "";
    var lockDown = true;

    try {
      if (!!browser.security.enableLockDown) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkEnableLockDownAPI', certified,
        result, details, null);
  };

  // SEC-31
  Certified.prototype.checkIsEnvironmentSecureAPI = function() {
    var result = false;
    var details = "";

    try {
      if (!!browser.security.isEnvironmentSecure) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkIsEnvironmentSecureAPI', certified,
        result, details, null);

  };

  Certified.prototype._hasAPI = function() {
    return Util.Browser.isCertified();
  };

  var onClosingEventHandler = function(se) {

    // If there were subscribers then let them cleanup otherwise do nothing
    if (this.Events.onClosing.subscribers.length) {
      var deferral = se.getDeferral();
      this.Events.onClosing.fire(function() {
        deferral.complete();
      });
    }
  };
  var onClosingEvent = null;

  Certified.prototype.initialize = function() {

    // The MS Take a Test app (aka Edge Secure Browser) fires the onclosing
    // event if the student terminates the app via
    // something like pressing Ctrl-Alt-Delete so we need to properly pause
    // any acitve test session
    if (Util.Browser.isEdgeSB() && this._hasAPI()) {
      onClosingEvent = onClosingEventHandler.bind(this);
      browser.addEventListener("onclosing", onClosingEvent);

      if (typeof browser.security.setCapability === 'function') {
        browser.security.setCapability('screenCapture', false);
        browser.security.setCapability('printing', false);
      }
    }
  };

  Certified.prototype.dispose = function() {

    if (onClosingEvent) {
      browser.removeEventListener("onclosing", onClosingEvent);
    }
  };

  Certified.prototype.clearCache = function() {
    try {
      if (this._hasAPI()) {
        browser.security.clearCache(); // Device Certification Required
        // API #3
        return true;
      }
    } catch (ex) {
    }

    return false;
  };

  Certified.prototype.clearCookies = function() {
    try {
      if (this._hasAPI()) {
        browser.security.clearCookies(); // Device Certification
        // Required API #4
        return true;
      }
    } catch (ex) {
    }

    return false;
  };

  Certified.prototype.emptyClipBoard = function() {
    try {
      if (this._hasAPI()) {
        browser.security.emptyClipBoard(); // Device Certification
        // Required API #5
        return true;
      }
    } catch (ex) {
    }

    return false;
  };

  Certified.prototype.getMACAddress = function() {
    var mac = null;

    try {
      if (this._hasAPI()) {
        alert('try');
        mac = browser.security.getMACAddress(); // Device Certification
        // Required API #6
        mac.toUpperCase();
      }
    } catch (e) {
      alert('catch');
    }

    return mac;
  };

  Certified.prototype.getIPAddressList = function() {
    var addressList = [];

    try {
      if (this._hasAPI()) {
        addressList = browser.security.getIPAddressList(); // Device
        // Certification
        // Required
        // API #7
      }
    } catch (ex) {
    }

    return addressList;
  };

  Certified.prototype.getProcessList = function() {
    var processList = [];

    try {
      if (this._hasAPI()) {
        processList = browser.security.getProcessList(); // Device
        // Certification
        // Required
        // API #8

      }
    } catch (ex) {
    }
    // clean any leading or trailing whitespace
    for (var i = 0; i < processList.length; i++) {
      processList[i] = YAHOO.lang.trim(processList[i]).toLowerCase();
    }

    // remove any duplicates
    processList = Util.Array.unique(processList);
    return processList;
  };

  Certified.prototype.close = function(restart) {

    try {
      if (this._hasAPI()) {
        // TDS-1403: Our latest API specifies 'close' as the name of
        // this function which MS Edge SB uses
        if (typeof browser.security.closeWindow === 'function') {
          browser.security.closeWindow(restart); // Device
          // Certification
          // Required API #9
        } else {
          browser.security.close(restart);
        }
        return true;
      }
    } catch (ex) {
    }
    return false;
  };

  // Get the start time of when the app was launched
  Certified.prototype.getAppStartTime = function() {
    try {
      if (this._hasAPI()) {
        browser.security.getStartTime(); // Device Certification
        // Required API #10
        return true;
      }
    } catch (ex) {
    }
    return false;
  };

  Certified.prototype.enableLockDown = function(lockDown) {
    try {
      if (this._hasAPI()) {
        browser.security.enableLockDown(lockDown); // Device
        // Certification
        // Required API #1
        return true;
      }
    } catch (ex) {
    }
    return false;
  };

  Certified.prototype.isEnvironmentSecure = function() {
    try {
      if (this._hasAPI()) {
        var isSecure = browser.security.isEnvironmentSecure(); // Device
        // Certification
        // Required
        // API
        // #2
        var result = {
          'secure' : isSecure,
          'messageKey' : null
        };
        return result;
      }
    } catch (ex) {
    }
    return false;
  };

  Certified.prototype.getDeviceInfo = function() {
    try {
      if (this._hasAPI()) {
        browser.security.getDeviceInfo(); // Device Certification
        // Required API #23
        return true;
      }
    } catch (ex) {
    }
    return false;
  };

  // SEC-56
  Certified.prototype.checkSystemMuteAPI = function() {
    var result = false;
    var details = "";

    try {
      // alert('System Mute ' + this.runtime.systemMute);
      if (!!browser.systemMute) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkSystemMuteAPI', certified, result,
        details, null);
  };

  // SEC-57
  Certified.prototype.checkSystemVolumeAPI = function() {
    var result = false;
    var details = "";

    try {
      // alert('System Volume ' + this.runtime.systemVolume);
      if (!!browser.systemVolume) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkSystemVolumeAPI', certified,
        result, details, null);
  };

  // SEC-10
  Certified.prototype.checkExamineProcessList = function() {
    var result = false;
    var details = "";

    try {
      if (!!browser.security.examineProcessList) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkExamineProcessList', certified,
        result, details, null);
  };

  // SEC-75
  Certified.prototype.checkGetFeatureAPI = function() {
    var result = false;
    var details = "";

    try {
      if (!!browser.security.getFeatures) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkGetFeatureAPI', certified, result,
        details, null);
  };

  // SEC-76
  Certified.prototype.checkGetCapabilityAPI = function() {
    var result = false;
    var details = "";

    try {
      if (!!browser.security.getCapability) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkGetCapabilityAPI', certified,
        result, details, null);
  };

  // SEC-77
  Certified.prototype.checkSetCapabilityAPI = function() {
    var result = false;
    var details = "";

    try {
      if (!!browser.security.setCapability) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkSetCapabilityAPI', certified,
        result, details, null);
  };

  // SEC-80
  Certified.prototype.checkGetPermissiveModeAPI = function() {
    var result = false;
    var details = "";

    try {
      if (!!browser.security.getPermissiveMode) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkGetPermissiveModeAPI', certified,
        result, details, null);
  };

  // SEC-71
  Certified.prototype.checkSetPermissiveModeAPI = function() {
    var result = false;
    var details = "";

    try {
      if (!!browser.security.setPermissiveMode) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkSetPermissiveModeAPI', certified,
        result, details, null);
  };

  SB.Certified = Certified;

})(TDS.SecureBrowser);