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
 * The mobile iOS version of the secure browser built on top of the Summit
 * application.
 */

TDS.SecureBrowser.Mobile.iOS = function() {

	TDS.SecureBrowser.Mobile.iOS.superclass.constructor.call(this);

	// retrieve the guide access status from local storage.
	this._guidedAccessMode = localStorage.getItem('ios-guidedaccessstatus');
	// set guided access status to 'unknown' if local storage does not have the
	// data
	if (this._guidedAccessMode == null) {
		this._guidedAccessMode = 'unknown';
	}
	this._ASAMMode = localStorage.getItem('ios-ASAMstatus');
	// set ASAM status to 'unknown' if local storage does not have the data
	if (this._ASAMMode == null) {
		this._ASAMMode = 'unknown';
	}

	this._processes = [];
	this._defaultBackgroundThreshold = 5; // default value is five seconds
	this._defaultBackgroundThresholdASAM = 20; // we allow up to twenty seconds
	// for the browser app to be
	// backgrounded if ASAM is on

	// get browser object and initialize
	this._airMobile = (new Summit.SecureBrowser.Mobile()).getNativeBrowser();
	this._airMobile.initialize();
};

YAHOO.lang.extend(TDS.SecureBrowser.Mobile.iOS, TDS.SecureBrowser.Base);

TDS.SecureBrowser.Mobile.iOS.prototype.loadProcessList = function() {
	this.setProcessList();
};

TDS.SecureBrowser.Mobile.iOS.prototype.getProcessList = function() {
	this.setProcessList();
	return this._processes;
};

TDS.SecureBrowser.Mobile.iOS.prototype.initialize = function() {

	var secBrowser = this._airMobile;
	var guidedAccessMode = this._guidedAccessMode;
	var backgroundThreshold;
	var backgroundThresholdASAM;
	var startTimeBackground = null;
	var hasBeenBackgrounded = false;
	this.getHasBeenBackgrounded = function() {
		return hasBeenBackgrounded;
	};
	this.setProcessList = function() {
		this._processes = secBrowser.device.runningProcesses;
	};
	var isLockedDown = true; // indicate if a student test session is going
	// on
	this.isSystemLockedDown = function() {
		return isLockedDown;
	};
	var isAutonomousGuidedAccessEnabled; // we cannot determine whether
	// autonomous guided access is
	// available until the student app
	// is fully loaded
	var ASAMMode = this._ASAMMode;
	var self = this;

	// a function to check if Automatic Assessment Configurator is enabled for a
	// given iOS version (yes for iOS 9.3.2 or later)
	this.isAACEnabled = function() {
		// retrieve and parse iOS version
		var osVersion = secBrowser.device.operatingSystemVersion;
		if (osVersion == null || osVersion == '' || osVersion == 'unknown') {
			return false;
		}
		// the version retrieved from iOS brower contains build id which should
		// be ignored; an example iOS version is '8.3 12F69'
		var versions = osVersion.split(' ')[0].split('.');
		if (versions.length == 1) {
			versions.push(0, 0);
		} else if (versions.length == 2) {
			versions.push(0);
		}
		// check if the version is 9.3.2 or later
		if (versions[0] > 9
				|| (versions[0] == 9 && versions[1] == 3 && versions[2] >= 2)) {
			return true;
		}
		return false;
	};

	this.checkAutonomousGuidedAccess = function() {
		if (typeof (isAutonomousGuidedAccessEnabled) == 'undefined') {
			// Determine whether autonomous guided access is available. ASAM
			// will cause the browser to crash on iOS 7.0.x,
			// so we limit the use of ASAM to iOS 7.1 or later versions.
			if (Util.Browser.getIOSVersion() >= 7.1) {
				isAutonomousGuidedAccessEnabled = TDS.getAppSetting(
						'sb.iosAutonomousGuidedAccessAllowed', false);
			} else {
				isAutonomousGuidedAccessEnabled = false;
			}
		}
		return isAutonomousGuidedAccessEnabled;
	};

	this.getGuidedAccessMode = function() {
		return guidedAccessMode;
	};

	this.getBackgroundThreshold = function() {
		if (typeof (backgroundThreshold) == 'undefined') {
			backgroundThreshold = (typeof TDS != 'undefined') ? TDS
					.getAppSetting('sb.iosBackgroundThreshold',
							this._defaultBackgroundThreshold)
					: this._defaultBackgroundThreshold;
		}
		return backgroundThreshold;
	}

	this.getBackgroundThresholdASAM = function() {
		if (typeof (backgroundThresholdASAM) == 'undefined') {
			backgroundThresholdASAM = (typeof TDS != 'undefined') ? TDS
					.getAppSetting('sb.iosASAMBackgroundThreshold',
							this._defaultBackgroundThresholdASAM)
					: this._defaultBackgroundThresholdASAM;
		}
		return backgroundThresholdASAM;
	}

	this.setLockDown = function(lockdown) {
		isLockedDown = lockdown;
		if (!lockdown) {
			hasBeenBackgrounded = false;
			// Disable guided access when lockdown is lifted.
			if (this.checkAutonomousGuidedAccess()
					&& guidedAccessMode == 'enabled') {
				secBrowser.enableGuidedAccess(lockdown, null, function(
						enableResults) {
					if (enableResults.didSucceed) {
						guidedAccessMode = 'disabled';
						// store the guided access status using local storage
						localStorage.setItem('ios-guidedaccessstatus',
								'disabled');
						// store ASAM status using local storage
						localStorage.setItem('ios-ASAMstatus', 'disabled');
					}
				});
			}
		} else if (this.checkAutonomousGuidedAccess()
				&& guidedAccessMode == 'disabled') {
			// if autonomous guided access is available, enable guided access
			// when system lockdown
			secBrowser.enableGuidedAccess(lockdown, null, function(
					enableResults) {
				if (enableResults.didSucceed) {
					guidedAccessMode = 'enabled';
					// store the guided access status using local storage
					localStorage.setItem('ios-guidedaccessstatus', 'enabled');
					// store ASAM status using local storage
					localStorage.setItem('ios-ASAMstatus', 'enabled');
				}
			});
		}
	};

	// check the guided access mode from the API
	secBrowser.checkGuidedAccessStatus(null, function(results) {
		if (results.enabled) {
			guidedAccessMode = 'enabled';
		} else {
			guidedAccessMode = 'disabled';
		}
		// store the guided access status using local storage
		localStorage.setItem('ios-guidedaccessstatus', guidedAccessMode);
		Util.log("access mode recorded is .. " + guidedAccessMode);
	});

	// listen and update for guided access changes
	secBrowser.listen(secBrowser.EVENT_GUIDED_ACCESS_CHANGED, document,
			function() {
				if (secBrowser.device.guidedAccessEnabled) {
					guidedAccessMode = 'enabled';
				} else {
					guidedAccessMode = 'disabled';
				}
				// store the guided access status using local storage
				localStorage
						.setItem('ios-guidedaccessstatus', guidedAccessMode);
				Util.log("access mode now is changed to ... "
						+ guidedAccessMode);
			});

	// listen and check if the browser has been pushed to the background
	secBrowser.listen(secBrowser.EVENT_ENTER_BACKGROUND, document, function() {
		// record the time when the browser enters background during a test
		// session
		if (isLockedDown) {
			startTimeBackground = (new Date()).getTime();
		}
		Util.log("the browser has been pushed to the background");
	});

	// listen and check if the browser has returned to the background
	secBrowser
			.listen(
					secBrowser.EVENT_RETURN_FROM_BACKGROUND,
					document,
					function() {
						// check if it is currently in a test session
						if (isLockedDown) {
							// check if the browser has been pushed to the
							// background previously
							if (startTimeBackground != null) {
								// calculate the duration in which the browser
								// has been running in the background
								var endTimeBackground = (new Date()).getTime();
								var threshold = (ASAMMode == 'enabled') ? self
										.getBackgroundThresholdASAM() : self
										.getBackgroundThreshold();
								if ((endTimeBackground - startTimeBackground) > (threshold * 1000)) {
									// issue a warning only when the duration is
									// longer than a threshold
									hasBeenBackgrounded = true;
								}
								startTimeBackground = null;
							}
						}
						Util.log("the browser has been put to the background");
					});
};

TDS.SecureBrowser.Mobile.iOS.prototype.enableLockDown = function(lockDown) {
	this.setLockDown(lockDown);
};

TDS.SecureBrowser.Mobile.iOS.prototype.canEnvironmentBeSecured = function() {
	var result = {
		'canSecure' : true,
		'messageKey' : null
	};

	if (this.getGuidedAccessMode() == 'enabled') {
		if (this.isAACEnabled()) {
			result.messageKey = 'LoginShell.Alert.EnvironmentSecureiOSGuidedAccess';
			var defaultGuidedAccessWarning = 'Warning: Guided Access is enabled. Please turn it off';
			TDS.Dialog.showWarning(result.messageKey,
					defaultGuidedAccessWarning);
		} else {
			// if guided access is ON, issue a warning for volume control on iOS
			// devices
			result.messageKey = 'LoginShell.Alert.EnvironmentSecureiOSVolumeControl';
			var defaultVolumeWarning = 'Warning: You cannot adjust the volume of your iPad during the test. If you need to adjust the volume, please turn off Guided Access. Adjust the volume using the volume control buttons on the iPad, and then activate Guided Access.  If you need help, please ask your proctor.';
			TDS.Dialog.showWarning(result.messageKey, defaultVolumeWarning);
		}
	} else if (!this.checkAutonomousGuidedAccess()) {
		// the guided access is OFF abd autonomous guided access is not enabled,
		// issue the warning that the security cannot be enabled
		result.canSecure = false;
		result.messageKey = 'LoginShell.Alert.EnvironmentInsecureiOSVolumeControl';
	}

	return result;
};

TDS.SecureBrowser.Mobile.iOS.prototype.isEnvironmentSecure = function() {
	var result = {
		'secure' : (this.getGuidedAccessMode() == 'enabled')
				&& (!this.getHasBeenBackgrounded()),
		'messageKey' : null
	};
	return result;
};

// Returns a handle to the native browser engine.
TDS.SecureBrowser.Mobile.iOS.prototype.getRunTime = function() {
	return this._airMobile;
};

TDS.SecureBrowser.Mobile.iOS.prototype.checkGlobalObject = function() {
	var result = false;
	var details = "";
	try {
		var sb = this._airMobile;
		result = true;
	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(1,
			'[Summit SecureBrowser Mobile] global object check',
			'(new Summit.SecureBrowser.Mobile()).getNativeBrowser()', result,
			details);

};

TDS.SecureBrowser.Mobile.iOS.prototype.checkDeviceInfo = function() {
	var result = false;
	var details = "";
	try {
		this._airMobile.security.getDeviceInfo();
		result = true;
	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(2, 'Retrieve device details',
			'runtime.security.getDeviceInfo()', result, details);
};

TDS.SecureBrowser.Mobile.iOS.prototype.checkMACAddressAPI = function() {
	var result = false;
	var details = "";
	try {
		this._airMobile.security.getMACAddress();
		result = true;
	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(2, 'Retrieve system MAC address(es)',
			'runtime.security.getMACAddress()', result, details);

};

TDS.SecureBrowser.Mobile.iOS.prototype.checkIPAddressAPI = function() {
	var result = false;
	var details = "";
	try {
		this._airMobile.security.getIPAddressList();
		result = true;
	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(2, 'Retrieve system IP address(es)',
			'runtime.security.getIPAddressList()', result, details);

};

TDS.SecureBrowser.Mobile.iOS.prototype.checkAppStartTimeAPI = function() {
	var result = false;
	var details = "";
	try {
		this._airMobile.security.getStartTime();
		result = true;
	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(2, 'Get application start time',
			'runtime.security.getStartTime()', result, details);
};

TDS.SecureBrowser.Mobile.iOS.prototype.checkTTSStopAPI = function() {
	var result = false;
	var details = "";
	try {
		this._airMobile.tts.stop(null, null);
		result = true;
	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(2, 'Stop speech (text-to-speech synthesis)',
			'runtime.tts.stop()', result, details);
};

TDS.SecureBrowser.Mobile.iOS.prototype.checkTTSStatusAPI = function() {
	var result = false;

	var details = "";
	try {
		this._airMobile.tts.getStatus();
		result = true;
	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(2,
			'Get speech status (text-to-speech synthesis)',
			'runtime.tts.getStatus()', result, details);
};

TDS.SecureBrowser.Mobile.iOS.prototype.checkTTSVoicesAPI = function() {
	var result = false;

	var details = "";
	try {
		this._airMobile.tts.getVoices();
		result = true;
	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(2,
			'Get available voices (text-to-speech synthesis)',
			'runtime.tts.getVoices()', result, details);
};

TDS.SecureBrowser.Mobile.iOS.prototype.checkTTSPitchAPI = function() {
	var result = false;

	var details = "";
	try {
		this._airMobile.device.ttsPitch;
		result = true;

	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(2,
			'Get/Set tts pitch API (text-to-speech synthesis)',
			'runtime.device.ttsPitch', result, details);
};

TDS.SecureBrowser.Mobile.iOS.prototype.checkTTSRateAPI = function() {
	var result = false;

	var details = "";
	try {
		this._airMobile.device.ttsRate
		result = true;
	} catch (ex) {
		details = ex.message;
	}

	Util.Validation.setResultItems(2,
			'Get/Set tts Rate API (text-to-speech synthesis)',
			'runtime.device.ttsRate', result, details);
};