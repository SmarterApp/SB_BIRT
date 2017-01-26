//*******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
//*******************************************************************************
/*
 This is the entry point for setting up the secure browser.
 */

TDS = window.TDS || {};
TDS.SecureBrowser = TDS.SecureBrowser || {};

(function(SB) {

  var sbImpl = null;

  function initialize() {

    if (Util.Browser.isCertified()) {
      sbImpl = new TDS.SecureBrowser.Certified();
    } else if (Util.Browser.isSecure()) {
      if (Util.Browser.isCertified()) {
        sbImpl = new TDS.SecureBrowser.Certified();
      } else if (Util.Browser.isIOS()) {
        sbImpl = new TDS.SecureBrowser.Mobile.iOS();
      } else if (Util.Browser.isAndroid()) {
        sbImpl = new TDS.SecureBrowser.Mobile.Android();
      } else if (Util.Browser.isChrome()) {
        sbImpl = new TDS.SecureBrowser.Chrome();
      } else {
        sbImpl = new TDS.SecureBrowser.Firefox();
      }
    } else if (Util.Browser.isChrome()) {
      // HACK! currently, the TDS.BrowserInfo is not available at this
      // point in the code
      // So, isSecure() shows up false even if our secure extension is
      // installed.
      sbImpl = new TDS.SecureBrowser.Certified();
    }

    // set default?
    if (sbImpl == null) {
      sbImpl = new TDS.SecureBrowser.Base();
    }

    if (sbImpl != null)
      sbImpl.initialize();
  }

  // expose init
  SB.initialize = initialize;

  // get the secure browser core implementation api (returns base if none
  // exist)
  SB.getImplementation = function() {
    return sbImpl;
  };

})(TDS.SecureBrowser);
