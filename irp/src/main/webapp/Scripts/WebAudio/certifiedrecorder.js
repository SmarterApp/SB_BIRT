// *******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
// *******************************************************************************
function Recorder_CertifiedService() {

  this.isSupported = function() {

    if (Util.Browser.isCertified() && browser.recorder
        && (typeof browser.recorder.initialize == 'function'))
      return true;
    else
      return false;
  };
}