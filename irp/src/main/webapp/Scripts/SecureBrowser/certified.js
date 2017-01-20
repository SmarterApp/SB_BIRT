﻿(function (SB) {

    function Certified() {
        /*Certified.superclass.constructor.call(this);*/
    };

    /*YAHOO.lang.extend(Certified, TDS.SecureBrowser.Base);*/
    
    Certified.prototype.checkGlobalObject = function() {
    	
    	var result = false;
    	var details = "";    	    	
    	try{
    		var hasAPI = (typeof (window.browser) === 'object');
    		
    		if (hasAPI && Util.Browser.isEdge() && !!window.browser.addEventListener) {
    			result = true;
            }
    		else if(!!window.browser){
    			result= true;
    		}
    		else{
    			result=  false;
    			details = 'window.browser is not defined';
    		}
    	}
    	catch (ex) {
    		result=  false;
    		details= ex.message
        }
    	
    	Util.Validation.setResultItems(1,'[window.browser] global object check','!!window.browser',result,details);
    	
    };
    
    Certified.prototype.checkMACAddressAPI = function() {
    	var result = false;
    	var details = "";
    	try{
    		if(!!browser.security.getMACAddress()){
    			result= true;
    		}
    		else{
    			result= false;
    		}
    	}
    	catch (ex) {
    		details = ex.message;
        }
    	
    	Util.Validation.setResultItems(2,'Retrieve system MAC address(es)','!!browser.security.getMACAddress()',result,details);
    	
    };

    Certified.prototype._hasAPI = function () {
        return Util.Browser.isCertified();
    };

    var onClosingEventHandler = function (se) {

        // If there were subscribers then let them cleanup otherwise do nothing
        if (this.Events.onClosing.subscribers.length) {
            var deferral = se.getDeferral();
            this.Events.onClosing.fire(function () {
                deferral.complete();
            });
        }
    };
    var onClosingEvent = null;

    Certified.prototype.initialize = function () {

        // The MS Take a Test app (aka Edge Secure Browser) fires the onclosing event if the student terminates the app via
        //  something like pressing Ctrl-Alt-Delete so we need to properly pause any acitve test session
        if (Util.Browser.isEdgeSB() && this._hasAPI()) {
            onClosingEvent = onClosingEventHandler.bind(this);
            browser.addEventListener("onclosing", onClosingEvent);

            if (typeof browser.security.setCapability === 'function') {
                browser.security.setCapability('screenCapture', false);
                browser.security.setCapability('printing', false);
            }
        }
    };

    Certified.prototype.dispose = function () {

        if (onClosingEvent) {
            browser.removeEventListener("onclosing", onClosingEvent);
        }
    };

    Certified.prototype.clearCache = function () {
        try {
            if (this._hasAPI()) {
                browser.security.clearCache(); // Device Certification Required API #3
                return true;
            }
        } catch (ex) {
        }

        return false;
    };

    Certified.prototype.clearCookies = function () {
        try {
            if (this._hasAPI()) {
                browser.security.clearCookies(); // Device Certification Required API #4
                return true;
            }
        } catch (ex) {
        }

        return false;
    };

    Certified.prototype.emptyClipBoard = function () {
        try {
            if (this._hasAPI()) {
                browser.security.emptyClipBoard(); // Device Certification Required API #5
                return true;
            }
        } catch (ex) {
        }

        return false;
    };

    Certified.prototype.getMACAddress = function () {
        var mac = null;

        try {
            if (this._hasAPI()) {
                alert('try');
                mac = browser.security.getMACAddress(); // Device Certification Required API #6
                mac.toUpperCase();
            }
        } catch (e) {
            alert('catch');
        }

        return mac;
    };

    Certified.prototype.getIPAddressList = function () {
        var addressList = [];

        try {
            if (this._hasAPI()) {
                addressList = browser.security.getIPAddressList(); // Device Certification Required API #7
            }
        } catch (ex) {
        }

        return addressList;
    };

    Certified.prototype.getProcessList = function () {
        var processList = [];

        try {
            if (this._hasAPI()) {
                processList = browser.security.getProcessList(); // Device Certification Required API #8

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

    Certified.prototype.close = function (restart) {

        try {
            if (this._hasAPI()) {
                // TDS-1403: Our latest API specifies 'close' as the name of this function which MS Edge SB uses
                if (typeof browser.security.closeWindow === 'function') {
                    browser.security.closeWindow(restart); // Device Certification Required API #9
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
    Certified.prototype.getAppStartTime = function () {
        try {
            if (this._hasAPI()) {
                browser.security.getStartTime(); // Device Certification Required API #10
                return true;
            }
        } catch (ex) {
        }
        return false;
    };

    Certified.prototype.enableLockDown = function (lockDown) {
        try {
            if (this._hasAPI()) {
                browser.security.enableLockDown(lockDown); // Device Certification Required API #1
                return true;
            }
        } catch (ex) {
        }
        return false;
    };

    Certified.prototype.isEnvironmentSecure = function () {
        try {
            if (this._hasAPI()) {
                var isSecure = browser.security.isEnvironmentSecure(); // Device Certification Required API #2
                var result = { 'secure': isSecure, 'messageKey': null };
                return result;
            }
        } catch (ex) {
        }
        return false;
    };

    Certified.prototype.getDeviceInfo = function () {
        try {
            if (this._hasAPI()) {
                browser.security.getDeviceInfo(); // Device Certification Required API #23
                return true;
            }
        } catch (ex) {
        }
        return false;
    };

    SB.Certified = Certified;

})(TDS.SecureBrowser);