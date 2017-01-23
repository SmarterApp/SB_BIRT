// REQUIRES: SecureBrowser.Base.js, Summit/air_mobile.js

TDS.SecureBrowser.Mobile = TDS.SecureBrowser.Mobile || {};

/*
The mobile Android version of the secure browser built on top of the Summit application.
*/
TDS.SecureBrowser.Mobile.Android = function () {
    TDS.SecureBrowser.Mobile.Android.superclass.constructor.call(this);
    this._config = { pausedSinceLaunch: false, keyboardChanged: false, clipboardChanged: false };
    this._airMobile = (new Summit.SecureBrowser.Mobile()).getNativeBrowser();
    this._airMobile.initialize();
    this._textSelected = { rangyValue: null };
    this._miniAppTimeThreshold = 5;     // time threshold for detecting mini apps, default value is 5 seconds
    this._miniAppCountThreshold = 3;    // count threshold for detecting mini apps, default value is 3 times
};

YAHOO.lang.extend(TDS.SecureBrowser.Mobile.Android, TDS.SecureBrowser.Base);

TDS.SecureBrowser.Mobile.Android.prototype.initialize = function () {
    var sb = this._airMobile;
    var config = this._config;
    var textSelected = this._textSelected;
    var miniAppDetectedTime = null;   // used to record the time when a mini app event was first captured
    var miniAppDetectedCount = 0; // record the number of times a mini app event has been captured
    var miniAppTimeThreshold = this._miniAppTimeThreshold;
    var miniAppCountThreshold = this._miniAppCountThreshold;

    // wait for SB to be ready
    sb.listen(sb.EVENT_DEVICE_READY, window.document, function () {

        // Any time the app returns from background, we treat that as a breach of security
        sb.listen(sb.EVENT_RETURN_FROM_BACKGROUND, window.document, function () {
            config.pausedSinceLaunch = true;
        });

        // check if a differnt keyboard other than the default soft keyboard is being used, and if so,
        // retreat as a breach of security
        if (sb.device.keyboard != 'com.air.mobilebrowser/.softkeyboard.SoftKeyboard') {
            config.keyboardChanged = true;
        }

        // detect any change in keyboard, and if there is change, treat as a breach of security
        sb.listen(sb.EVENT_KEYBOARD_CHANGED, window.document, function () {
            config.keyboardChanged = true;
        });

        // detect if the content of the clipboard has been changed, and if there is change, treat as a breach of security
        sb.listen(sb.EVENT_CLIPBOARD_CHANGED, window.document, function () {
            config.clipboardChanged = true;
        });

        // This is the code to capture the event that will be fired when mini apps are running
        sb.listen(sb.EVENT_MINI_APP_DETECTED, window.document, function () {
            miniAppDetectedCount++;
            // record the time when the mini app event was first captured
            if (miniAppDetectedTime == null) {
                miniAppDetectedTime = (new Date()).getTime();
            } else if (miniAppDetectedCount > miniAppCountThreshold) {
                var currentTime = (new Date()).getTime();
                if ((currentTime - miniAppDetectedTime) < (miniAppTimeThreshold * 1000)) {
                    // if the number of events within a short period is larger than the threshold value, issue security warning
                    config.pausedSinceLaunch = true;
                }
                miniAppDetectedCount = 0;
                miniAppDetectedTime = null;
            }
        });
    });

    sb.listen(sb.EVENT_TEXT_SELECTED, window.document, function () {
        textSelected.rangyValue = window.rangy.getSelection(document);
    });

};

TDS.SecureBrowser.Mobile.Android.prototype.isEnvironmentSecure = function () {
    var result = { 'secure': (!this._config.pausedSinceLaunch && !this._config.keyboardChanged && !this._config.clipboardChanged), 'messageKey': null };
    return result;
};

TDS.SecureBrowser.Mobile.Android.prototype.getSelectedText = function () {
    return this._textSelected.rangyValue;
};

// Returns a handle to the native browser engine.
TDS.SecureBrowser.Mobile.Android.prototype.getRunTime = function () {
    return this._airMobile;
};


TDS.SecureBrowser.Mobile.Android.prototype.checkGlobalObject = function() {
	var result = false;
	var details = "";
	try{
		if(!!this._airMobile){
			result= true;
		}
		else{
			result= false;
		}
	}
	catch (ex) {
		details = ex.message;
    }
	
	Util.Validation.setResultItems(1,'[Summit SecureBrowser Mobile] global object check','(new Summit.SecureBrowser.Mobile()).getNativeBrowser()',result,details);
	
};


TDS.SecureBrowser.Mobile.Android.prototype.checkDeviceInfo = function() {
	var result = false;
	var details = "";
	try{
		if(!!this._airMobile.security.getDeviceInfo()){
			result= true;
		}
		else{
			result= false;
		}
	}
	catch (ex) {
		details = ex.message;
    }
	
	Util.Validation.setResultItems(2,'Retrieve device details','!!runtime.security.getDeviceInfo()',result,details);
};


TDS.SecureBrowser.Mobile.Android.prototype.checkMACAddressAPI = function() {
	var result = false;
	var details = "";
	try{
		if(!!this._airMobile.security.getMACAddress()){
			result= true;
		}
		else{
			result= false;
		}
	}
	catch (ex) {
		details = ex.message;
    }
	
	Util.Validation.setResultItems(2,'Retrieve system MAC address(es)','!!runtime.security.getMACAddress()',result,details);
	
};


TDS.SecureBrowser.Mobile.Android.prototype.checkIPAddressAPI = function() {
	var result = false;
	var details = "";
	try{
		if(!!this._airMobile.security.getIPAddressList()){
			result= true;
		}
		else{
			result= false;
		}
	}
	catch (ex) {
		details = ex.message;
    }
	
	Util.Validation.setResultItems(2,'Retrieve system IP address(es)','!!runtime.security.getIPAddressList()',result,details);
	
};
