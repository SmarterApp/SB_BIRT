var isIOSDevice = Util.Browser.isIOS();
var isAndroidDevice = Util.Browser.isAndroid();
var isFireFox = Util.Browser.isFirefox();
var isChrome = Util.Browser.isChrome();
//var isDesktop = (Util.Browser.isWindows() || Util.Browser.isLinux() || Util.Browser.isMac());
var isMobile = Util.Browser.isMobile();
var isCertified = Util.Browser.isCertified();
var isAIRSecureBrowser = Util.Browser.isSecure();

TDS.SecureBrowser.initialize();
var impl = TDS.SecureBrowser.getImplementation();



/*if (isIOSDevice || isAndroidDevice) {
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
		alert('SB browser component failed to load');
	}
}*/


Util.Validation.setResultItems(1,'IOS Device','IOS Device', isIOSDevice);
Util.Validation.setResultItems(2,'Android Device','Android Device', isAndroidDevice);
Util.Validation.setResultItems(4,'Firefox Browser Check','Firefox Browser check', isFireFox );
Util.Validation.setResultItems(5,'Chrome Device Check','Chrome Browser check', isChrome );
Util.Validation.setResultItems(6,'AIRSecureBrowser Check','AIRSecureBrowser check', isAIRSecureBrowser );
Util.Validation.setResultItems(7,'Mobile','Mobile Device', isMobile );
Util.Validation.setResultItems(8,'Certified Browser','Certified', isCertified );

Util.Validation.setResultItems(9,'Check for MATHML Support','Util.Browser.supportsMathML()', Util.Browser.supportsMathML() );

Util.Validation.setResultItems(9,'Check for SVG Support','Util.Browser.supportsSVG()', Util.Browser.supportsSVG() );

Util.Validation.setResultItems(10,'Check for Audio OGG Support','Util.Browser.supportsAudioOGG()', Util.Browser.supportsAudioOGG() );

if (impl) {
	/*alert(impl);
	alert('runtime Methods  ' + getMethods(impl));*/
	//alert(impl.checkGlobalObject());
	impl.checkGlobalObject();
	impl.checkMACAddressAPI();
	//alert('found sb');
    
} else {
	alert('no sb');
}

//setResultItems(11,'Check for [SecureBrowser] global Object','typeof (SecureBrowser) != "undefined"', typeof (SecureBrowser) != 'undefined' ? "Passed":"Failed");

//setResultItems(12,'Check for [runtime] Object for AIR Browser','(runtime != null && typeof (runtime)!="undefined" && typeof(runtime)=="object")', (runtime != null && typeof (runtime)!='undefined' && typeof(runtime)=='object') ? "Passed":"Failed");

//setResultItems(13,'Check for [browser] window global Object','typeof (window.browser) != "undefined"', typeof (window.browser) != 'undefined' ? "Passed":"Failed");


/**SEC-25 : API: Retrieve device details (R) **/
var deviceInfo = null;

/** SEC-27 : API: get system MAC address(es) (O) **/
var macAddress = null;


/** SEC-28 : API: Retrieve client IP address(es) (O) **/
var ipAddress = null;

/** SEC-29 : API: Get application start time (O). **/
var startTime = null;

	if(Util.Browser.isSecure()){
		 
		 /** SEC-27 : API: get system MAC address(es) (O) **/
		 //macAddress = runtime.getMACAddress();
	
	}
	else if (isMobile) {
		/**SEC-25 : API: Retrieve device details (R) **/
		deviceInfo = runtime.security.getDeviceInfo();
		
		/** SEC-27 : API: get system MAC address(es) (O) **/
		macAddress =runtime.security.getMACAddress();
		
		/** SEC-28 : API: Retrieve client IP address(es) (O) **/
		ipAddress =runtime.security.getIPAddressList();
		
		/** SEC-29 : API: Get application start time (O). **/
		startTime = runtime.security.getStartTime();
		
		
	}else if(isCertified){
		/**SEC-25 : API: Retrieve device details (R) **/
		deviceInfo = browser.security.getDeviceInfo();
		
		/** SEC-27 : API: get system MAC address(es) (O) **/
		macAddress =browser.security.getMACAddress();
		
		/** SEC-28 : API: Retrieve client IP address(es) (O) **/
		ipAddress = browser.security.getIPAddressList();
		
		/** SEC-29 : API: Get application start time (O). **/
		startTime = browser.security.getStartTime();
	}


populateResults();
/*QUnit.test('Check Device and Browser Info',function(assert) {

		assert.equal(isIOSDevice,true,'Checking if Browser is Mobile Browser, this test will return true only in case of IOS Device');
		assert.equal(isAndroidDevice,true,'Checking if Browser is Mobile Browser, this test will return true only in case of Android Device');
		assert.equal(isFireFox, true,'Checking if Browser is Mozilla Firefox Browser');
		assert.equal(isChrome, true,'Checking if Browser is Chrome Browser');
		assert.equal(isDesktop, true,'Checking if this is Desktop');
		assert.equal(Util.Browser.supportsMathML(),true,'Check for MathML Support');
		assert.equal(Util.Browser.supportsSVG(),true,'Check for SVG Support');
		assert.equal(Util.Browser.supportsAudioOGG(),true,'Check for OGG Support');
});

QUnit.test('Check [SecureBrowser] Object',function(assert) {
	
	assert.equal(typeof (SecureBrowser) != 'undefined', true,'Checking [SecureBrowser] object');
	if (typeof (SecureBrowser) != 'undefined') {
		alert('SecureBrowser Methods ' + getMethods(SecureBrowser));
	}
});

QUnit.test('Check runtime browser Object',function(assert) {
	
	console.log('runtime Methods  ' + getMethods(runtime));
	
	assert.equal((runtime != null && typeof (runtime)!='undefined' && typeof(runtime)=='object'), true,'Checking if runtime object for runtime is available');
	*//**SEC-25 : API: Retrieve device details (R) **//*
	var deviceInfo = "";
	
	var processListAPI = "";
	var processes = "";
	
	*//** SEC-27 : API: get system MAC address(es) (O) **//*
	var macAddress = null;
	
	
	*//** SEC-28 : API: Retrieve client IP address(es) (O) **//*
	var ipAddress = null
	
	

		if(Util.Browser.isSecure()){
			
			 processes = runtime.getRunningProcessList();
			 processListAPI = runtime.getRunningProcessList;
			 
			 *//** SEC-27 : API: get system MAC address(es) (O) **//*
			 macAddress = runtime.getMACAddress();
		
		}
		else if (isMobile) {
			*//**SEC-25 : API: Retrieve device details (R) **//*
			deviceInfo = runtime.security.getDeviceInfo();
			processes = runtime.security.getProcessList();
			processListAPI =  runtime.security.getProcessList;
			
			*//** SEC-27 : API: get system MAC address(es) (O) **//*
			macAddress =runtime.security.getMACAddress();
			
			*//** SEC-28 : API: Retrieve client IP address(es) (O) **//*
			ipAddress =runtime.security.getIPAddressList();
			
		}else if(isCertified){
			*//**SEC-25 : API: Retrieve device details (R) **//*
			deviceInfo = browser.security.getDeviceInfo();
			processes  = browser.security.getProcessList();
			processListAPI =  browser.security.getProcessList;
			
			*//** SEC-27 : API: get system MAC address(es) (O) **//*
			macAddress =browser.security.getMACAddress();
			
			*//** SEC-28 : API: Retrieve client IP address(es) (O) **//*
			ipAddress = browser.security.getIPAddressList()
		}
		
		
	
	
	
	*//**SEC-25 : API: Retrieve device details (R) **//*
	assert.equal((/Manufacturer/i.test(deviceInfo) && /HWVer/i.test(deviceInfo) &&
			/SWVer/i.test(deviceInfo)),true,'Check device info keys');
	
	*//** SEC-27 : API: get system MAC address(es) (O) **//*
	assert.equal(Util.Validation.isMacAddressValid(macAddress), true,'Checking if valid mac address is returned');
	
	*//** SEC-28 : API: Retrieve client IP address(es) (O) **//*
	assert.equal(Util.Validation.isIPAddressValid(ipAddress), true,'Checking if valid IP address is returned');
	
	alert(JSON.stringify({array: loop}));
	
	assert.equal(typeof (processListAPI) != 'undefined', true,'Checking if getProcessList method exists');
	assert.ok(processes.indexOf('chrome.exe') != -1,'Check for process we know exists');
});*/

function getMethods(obj) {
	var result = [];
	for (var method in obj) {
		result.push(method)

	}
	return result;
}

function closeBrowser(){
	impl.close();
}


function populateResults(){
	$("#jsGrid").jsGrid({
	    width: "100%",
	    height: "100%",

	    /* inserting: true,
	    editing: true,
	    sorting: true,
	    paging: true, */

	    data: Util.Validation.getResult(),
	    
	    fields: [
	        { title: "ID", name: "id", type: "number", width: 20, validate: "required" },
	        { title: "Test Name",name: "testName", type: "text", width: 150 },
	        { title: "Test API",name: "testApi", type: "text", width: 150 },
	        { title: "Result",name: "testResult", type: "text",width:50	,
	        
	        	itemTemplate : function(value) {
	        		if(value){
	        			return "Passed";
	        		}
	        		else{
	        			return "Failed";
	        		}
	        		
	        	}

	        		
	        	
	        }
	        ,
	        { title: "Details",name: "details", type: "text",width:150 }
	    
	    ]
	});
}
