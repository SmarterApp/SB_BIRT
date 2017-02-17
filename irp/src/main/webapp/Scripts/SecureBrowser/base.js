// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
TDS = window.TDS || {};
TDS.SecureBrowser = TDS.SecureBrowser || {};

(function(SB) {

  /*
   * The base class for all secure browsers. Any new secure browser must extend
   * from this and override the methods to provide custom behavior if required
   */
  function Base() {

  }
  ;

  /* Any SB initialization code. This is called upon instantiation and only once */
  Base.prototype.initialize = function() {
  };

  Base.prototype.checkGlobalObject = function() {

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

  Base.prototype.checkDeviceInfo = function() {

    var result = false;
    var details = "browser.security.getDeviceInfo() is not defined";

    Util.Validation.setIRPTestResults('checkDeviceInfo', certified, result,
        details, null);
  };

  Base.prototype.checkMACAddressAPI = function() {
    var result = false;
    var details = '';
    try {
      if (!!browser.security.getMACAddress) {
        result = true;
      }
    } catch (ex) {
      details = ex.message;
    }

    Util.Validation.setIRPTestResults('checkMACAddressAPI', certified, result,
        details, null);

  };

  Base.prototype.checkIPAddressAPI = function() {
    var result = true;
    var details = 'testApi_removed';

    Util.Validation.setIRPTestResults('checkIPAddressAPI', certified, result,
        details, null);

  };

  Base.prototype.checkAppStartTimeAPI = function() {
    var result = false;
    var details = "browser.security.getStartTime() is not defined";

    Util.Validation.setIRPTestResults('checkAppStartTimeAPI', certified,
        result, details, null);
  };

  // SEC-32
  Base.prototype.checkClearCacheAPI = function() {
    var result = true;
    var details = 'testApi_removed';

    Util.Validation.setIRPTestResults('checkClearCacheAPI', certified, result,
        details, null);
  };

  // SEC-26
  Base.prototype.checkEmptyClipBoardAPI = function() {
    var result = false;
    var details = 'browser.security.emptyClipBoard() is not defined';

    Util.Validation.setIRPTestResults('checkEmptyClipBoardAPI', certified,
        result, details, null);
  };

  // SEC-33
  Base.prototype.checkClearCookiesAPI = function() {
    var result = true;
    var details = 'testApi_removed';

    Util.Validation.setIRPTestResults('checkClearCookiesAPI', certified,
        result, details, null);
  };

  // SEC-31
  Base.prototype.checkIsEnvironmentSecureAPI = function() {
    var result = false;
    var details = 'browser.security.isEnvironmentSecure is not defined';

    Util.Validation.setIRPTestResults('checkIsEnvironmentSecureAPI', certified,
        result, details, null);
  };

  // SEC-34
  Base.prototype.checkGetProcessListAPI = function() {
    var result = true;
    var details = 'testApi_removed';

    Util.Validation.setIRPTestResults('checkGetProcessListAPI', certified,
        result, details, null);
  };

  // SEC-35
  Base.prototype.checkCloseAPI = function() {
    var result = false;
    var details = 'browser.security.close is not defined';

    Util.Validation.setIRPTestResults('checkCloseAPI', certified, result,
        details, null);
  };

  // SEC-30
  Base.prototype.checkEnableLockDownAPI = function() {
    var result = false;
    var details = 'browser.security.enableLockDown is not defined';

    Util.Validation.setIRPTestResults('checkEnableLockDownAPI', certified,
        result, details, null);
  };

  Base.prototype.dispose = function() {
  };

  // Check if the environment is can be secured before testing
  Base.prototype.canEnvironmentBeSecured = function() {
    var result = {
      'canSecure' : true,
      'messageKey' : null
    };
    return result;
  };

  // Check if the environment is secure for testing
  Base.prototype.isEnvironmentSecure = function() {
    var result = {
      'secure' : true,
      'messageKey' : null
    };
    return result;
  };

  // Clear all cached resources
  Base.prototype.clearCache = function() {
    return false;
  };

  // Clear all cookies
  Base.prototype.clearCookies = function() {
    return false;
  };

  // Clear any history
  Base.prototype.clearHistory = function() {
    this.clearCache();
    this.clearCookies();
  };

  Base.prototype.emptyClipBoard = function() {
    return false;
  };

  Base.prototype.getMACAddress = function() {
    return null;
  };

  // Get all IP Addresses associated with this end point
  Base.prototype.getIPAddressList = function(bypassCache) {
    return [];
  };

  // Get primary IP
  Base.prototype.getIPAddress = function(bypassCache) {
    var addressList = this.getIPAddressList();
    if (addressList != null && addressList.length > 0) {
      return addressList[0];
    }
    return null;
  };

  // Get list of all running processes
  Base.prototype.loadProcessList = function() {
    return false;
  };

  Base.prototype.getProcessList = function() {
    return [];
  };

  /* get list of blacklisted processes */
  Base.prototype.getForbiddenApps = function() {
    var currentForbiddenApps = [];

    /* make sure forbidden apps list exists */
    if (typeof (TDS) != 'object' || typeof (TDS.Config) != 'object'
        || typeof (TDS.Config.forbiddenApps) != 'object'
        || (TDS.Config.forbiddenApps == null)) {
      return currentForbiddenApps;
    }

    /* get currently running processes []<string> */
    var processList = this.getProcessList();

    if (processList) {
      Util.Array.each(processList, function(currentProcess) {
        var processName = currentProcess;
        var parentProcessName = '';
        /* check if the process contains parent process info */
        if (currentProcess.indexOf("|") > -1) {
          var processInfoArray = currentProcess.split("|");
          processName = processInfoArray[0];
          parentProcessName = processInfoArray[1];
        }
        var matchingApp = Util.Array.find(TDS.Config.forbiddenApps, function(
            forbiddenApp) {
          /* check if there is any proceses on the forbidden app list */
          if (Util.String.equals(forbiddenApp.name, processName, {
            trim : true,
            ignoreCase : true
          })) {
            /*
             * compare parent process with exemptions, if either the parent
             * process or exemptions are unavailable, mark this process as
             * forbidden
             */
            if (Util.String.isNullOrEmpty(parentProcessName)
                || Util.String.isNullOrEmpty(forbiddenApp.exemptions)) {
              return true;
            } else {
              /*
               * check if the parent process name matches with any exemption
               * processes
               */
              var exemptionList = forbiddenApp.exemptions.split(",");
              var exemptionMatchFound = Util.Array.find(exemptionList,
                  function(exemption) {
                    return (parentProcessName.indexOf(exemption) > -1);
                  });
              return (exemptionMatchFound == null);
            }
          }
        });
        if (matchingApp != null) {
          currentForbiddenApps.push(matchingApp);
        }
      });
    }

    return currentForbiddenApps;
  };

  /*
   * call this function to fix an issue with the SB not getting proper focus and
   * arrow keys not working
   */
  Base.prototype.fixFocus = function() {
    return false;
  };

  /* force close the secure browser */
  Base.prototype.close = function() {
    window.close();
  };

  /* Get the start time of when the app was launched */
  Base.prototype.getAppStartTime = function() {
    /* set a session storage appStartTime item */
    if (window.sessionStorage.getItem("appStartTime") != null) {
      return Date.parse(window.sessionStorage.getItem("appStartTime"));
    }

    return null;
  };

  /*
   * Method called at startup to see if we need to set the appStartTime incase
   * we dont have a pref to report this
   */
  Base.prototype.setAppStartTime = function(timestamp, forceSet) {
    if (forceSet || this.getAppStartTime() == null) {
      window.sessionStorage.setItem("appStartTime", timestamp);
    }
  };

  /* Returns a handle to the native browser engine. */
  Base.prototype.getRunTime = function() {
    return null;
  };

  // Do any security steps here to lock down the browser
  Base.prototype.enableLockDown = function(lockDown) {
    return false;
  };

  // Mute the system volume
  Base.prototype.mute = function() {
    return false;
  };

  // Unmute the system volume
  Base.prototype.unmute = function() {
    return false;
  };

  // Check if the system is muted
  Base.prototype.isMuted = function() {
    return false;
  };

  Base.prototype.enablePermissiveMode = function(enabled) {
  };

  Base.prototype.isPermissiveModeEnabled = function() {
    return false;
  };

  Base.prototype.enableChromeMode = function(enabled) {
  };

  // get the volume.. if this returns -1 then not supported
  Base.prototype.getVolume = function() {
    return -1;
  };

  // set the volume.. if this returns false then not supported or invalid
  // percentage
  Base.prototype.setVolume = function(percent) {
    return false;
  };

  Base.prototype.HKEY_CURRENT_USER = 0x80000001;
  Base.prototype.HKEY_LOCAL_MACHINE = 0x80000002;

  // get windows registry key
  Base.prototype.readRegistryValue = function(hkey, key, name) {
    return null;
  };

  // SEC-56
  Base.prototype.checkSystemMuteAPI = function() {
    var result = false;
    var details = "";

    try {
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
  Base.prototype.checkSystemVolumeAPI = function() {
    var result = false;
    var details = "";

    try {
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
  Base.prototype.checkExamineProcessList = function() {
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
  Base.prototype.checkGetFeatureAPI = function() {
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
  Base.prototype.checkGetCapabilityAPI = function() {
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
  Base.prototype.checkSetCapabilityAPI = function() {
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
  Base.prototype.checkGetPermissiveModeAPI = function() {
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
  Base.prototype.checkSetPermissiveModeAPI = function() {
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

  SB.Base = Base;

})(TDS.SecureBrowser);