﻿// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
(function(SB) {

  function Certified() {
    // Certified.superclass.constructor.call(this);
  }
  ;

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

      /*
       * if (typeof browser.security.setCapability === 'function') {
       * browser.security.setCapability('screenCapture', false);
       * browser.security.setCapability('printing', false); }
       */

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

  Certified.prototype.setCapability = function(property, enable) {
    try {
      if (this._hasAPI()
          && typeof browser.security.setCapability === 'function') {
        browser.security.setCapability(property, false);
        return true;
      }
    } catch (ex) {
      alert('Exception occurred ' + ex.message);
    }
    return false;
  };

  Certified.prototype.getCapability = function(property) {
    try {
      if (this._hasAPI()
          && typeof browser.security.getCapability === 'function') {
        return browser.security.getCapability(property);
      }
    } catch (ex) {
      alert('Exception occurred ' + ex.message);
    }
    return false;
  };

  Certified.prototype.examineProcessList = function(blacklistedProcessList) {
    try {
      if (this._hasAPI()
          && typeof browser.security.examineProcessList === 'function') {
        return browser.security.examineProcessList(blacklistedProcessList);
      }
    } catch (ex) {
      alert('Exception occurred ' + ex.message);
    }
    return [];
  };

  Certified.prototype.capabilityManualTestSupported = function() {
    try {
      if (this._hasAPI()
          && typeof browser.security.getCapability === 'function'
          && typeof browser.security.setCapability === 'function') {
        return true;
      }
    } catch (ex) {
      alert('Exception occurred ' + ex.message);
    }
    return false;
  };

  Certified.prototype.examineProcessManualTestSupported = function() {
    try {
      if (this._hasAPI()
          && typeof browser.security.examineProcessList === 'function') {
        return true;
      }
    } catch (ex) {
      alert('Exception occurred ' + ex.message);
    }
    return false;
  };

  Certified.prototype.getRunTime = function() {
    return null;
  };

  SB.Certified = Certified;

})(TDS.SecureBrowser);