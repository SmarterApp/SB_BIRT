// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research

// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
// REQUIRES: YUI, IO.js, SecureBrowser.Base.js

/*
 * Unified API Version for SecureBrowser
 */

(function(SB) {

  function Unified() {

  }
  ;

  Unified.prototype.initialize = function() {

  };

  Unified.prototype.getRunTime = function() {
    return null;
  };

  Unified.prototype._hasAPI = function() {
    return (typeof (SecureBrowser) != 'undefined');
  };

  Unified.prototype.examineProcessManualTestSupported = function() {
    try {
      if (this._hasAPI()
          && typeof SecureBrowser.security.examineProcessList === 'function') {
        return true;
      }
    } catch (ex) {
      alert('Exception occurred ' + ex.message);
    }
    return false;
  };

  Unified.prototype.examineProcessList = function(blacklistedProcessList) {
    try {
      if (this._hasAPI()
          && typeof SecureBrowser.security.examineProcessList === 'function') {
        SecureBrowser.security.examineProcessList(blacklistedProcessList,
            this.populateRunningForbiddenApplist);
      }
    } catch (ex) {
      alert('Exception occurred ' + ex.message);
    }
  };

  Unified.prototype.populateRunningForbiddenApplist = function(
      forbiddenArrayFromApi) {

    $("#forbiddenAppListGrid").jsGrid({
      width : "100%",
      height : 250,
      data : loadRunningForbiddenApps(forbiddenArrayFromApi),
      selecting : false,

      fields : [ {
        title : 'Description',
        name : "processdescription",
        type : "text",
        width : 200
      }, {
        title : 'Name',
        name : "processname",
        type : "text",
        width : 100
      }

      ]
    });
  };

  Unified.prototype.capabilityManualTestSupported = function() {
    try {
      if (this._hasAPI()
          && typeof SecureBrowser.security.getCapability === 'function'
          && typeof SecureBrowser.security.setCapability === 'function') {
        return true;
      }
    } catch (ex) {
      console.log('Exception occurred ' + ex.message);
      return false;
    }
    return false;
  };

  Unified.prototype.setCapability = function(property, enable) {
    try {
      if (this._hasAPI()
          && typeof SecureBrowser.security.setCapability === 'function') {

        function callback(jsonliteral) {
        }
        SecureBrowser.security.setCapability(property, enable, callback,
            callback);
      }
    } catch (ex) {
      console.log('Exception occurred ' + ex.message);
    }
  };

  Unified.prototype.getCapability = function(property) {
    try {
      if (this._hasAPI()
          && typeof SecureBrowser.security.getCapability === 'function') {
        return SecureBrowser.security.getCapability(property);
      }
    } catch (ex) {
      console.log('Exception occurred ' + ex.message);
      return false;
    }
    return false;
  };

  SB.Unified = Unified;

})(TDS.SecureBrowser);