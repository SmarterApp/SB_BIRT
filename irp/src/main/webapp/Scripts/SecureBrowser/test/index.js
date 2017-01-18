this.runtime = null;
var isIOSDevice = Util.Browser.isIOS();
var isAndroidDevice = Util.Browser.isAndroid();
var isFireFox = Util.Browser.isFirefox();
var isChrome = Util.Browser.isChrome();
var isDesktop = (Util.Browser.isWindows() || Util.Browser.isLinux() || Util.Browser
		.isMac());
var isMobile = Util.Browser.isMobile();
var isCertified = Util.Browser.isCertified();

if (isIOSDevice || isAndroidDevice) {
	this.runtime = (new Summit.SecureBrowser.Mobile()).getNativeBrowser();
}

if (isDesktop && Util.Browser.isSecure()) {
	var success = Mozilla.execPrivileged(function() {
		var sbClass = Components.classes["@mozilla.org/securebrowser;1"];
		if (sbClass) {
			this.runtime = sbClass
					.createInstance(Components.interfaces.mozISecureBrowser);
		}
	}.bind(this));
	if (!success) {
		alert('SB runtime component failed to load');
	}
}

QUnit.test('Check Device and Browser Info',function(assert) {

		assert.equal(isIOSDevice,true,'Checking if Browser is Mobile Browser, this test will return true only in case of IOS Device');
		assert.equal(isAndroidDevice,true,'Checking if Browser is Mobile Browser, this test will return true only in case of Android Device');
		assert.equal(isFireFox, true,'Checking if Browser is Mozilla Firefox Browser');
		assert.equal(isChrome, true,'Checking if Browser is Chrome Browser');
		assert.equal(isDesktop, true,'Checking if this is Desktop');
		assert.equal(Util.Browser.supportsMathML(),true,'Check for MathML Support');
		assert.equal(Util.Browser.supportsSVG(),true,'Check for SVG Support');
		assert.equal(Util.Browser.supportsAudioOGG(),true,'Check for OGG Support');
});

QUnit.test('Check SecureBrowser Object',function(assert) {
	assert.equal(typeof (SecureBrowser) != 'undefined', true,'Checking if this is Secure Browser');
	if (typeof (SecureBrowser) != 'undefined') {
		//alert('SecureBrowser Methods' + getMethods(SecureBrowser));
	}
});

QUnit.test('Check browser runtime Object',function(assert) {
	
	assert.equal((runtime != null && typeof (runtime)!='undefined' && typeof(runtime)=='object'), true,'Checking if runtime object for browser is available');
	/**SEC-25 : API: Retrieve device details (R) **/
	var deviceInfo = "";
	
	var processListMethod = "";
	var processes = "";
	
	/** SEC-27 : API: get system MAC address(es) (O) **/
	var macAddress = null;
	
	
	/** SEC-28 : API: Retrieve client IP address(es) (O) **/
	var ipAddress = null
	
	

		if(Util.Browser.isSecure()){
			
			 processes = runtime.getRunningProcessList();
			 processListMethod = runtime.getRunningProcessList;
			 
			 /** SEC-27 : API: get system MAC address(es) (O) **/
			 macAddress =runtime.getMACAddress();
		
		}
		else if (isMobile) {
			/**SEC-25 : API: Retrieve device details (R) **/
			deviceInfo = runtime.security.getDeviceInfo();
			processes = runtime.security.getProcessList();
			processListMethod =  runtime.security.getProcessList;
			
			/** SEC-27 : API: get system MAC address(es) (O) **/
			macAddress =runtime.security.getMACAddress();
			
			/** SEC-28 : API: Retrieve client IP address(es) (O) **/
			ipAddress =runtime.security.getIPAddressList();
			
		}else if(isCertified){
			/**SEC-25 : API: Retrieve device details (R) **/
			deviceInfo = browser.security.getDeviceInfo();
			processes  = browser.security.getProcessList();
			processListMethod =  browser.security.getProcessList;
			
			/** SEC-27 : API: get system MAC address(es) (O) **/
			macAddress =browser.security.getMACAddress();
			
			/** SEC-28 : API: Retrieve client IP address(es) (O) **/
			ipAddress = browser.security.getIPAddressList()
		}
		
		
	
	
	
	/**SEC-25 : API: Retrieve device details (R) **/
	assert.equal((/Manufacturer/i.test(deviceInfo) && /HWVer/i.test(deviceInfo) &&
			/SWVer/i.test(deviceInfo)),true,'Check device info keys');
	
	/** SEC-27 : API: get system MAC address(es) (O) **/
	assert.equal(Util.Validation.isMacAddressValid(macAddress), true,'Checking if valid mac address is returned');
	
	/** SEC-28 : API: Retrieve client IP address(es) (O) **/
	assert.equal(Util.Validation.isIPAddressValid(ipAddress), true,'Checking if valid IP address is returned');
	
	
/*	assert.equal(typeof (processListMethod) != 'undefined', true,'Checking if getProcessList method exists');
	assert.ok(processes.indexOf('chrome.exe') != -1,'Check for process we know exists');*/
});

function getMethods(obj) {
	var result = [];
	for (var method in obj) {
		result.push(method)

	}
	return result;
}
