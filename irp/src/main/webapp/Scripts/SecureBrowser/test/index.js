var loop = [];
this.runtime = null;
var isIOSDevice = Util.Browser.isIOS();
var isAndroidDevice = Util.Browser.isAndroid();
var isFireFox = Util.Browser.isFirefox();
var isChrome = Util.Browser.isChrome();
var isDesktop = (Util.Browser.isWindows() || Util.Browser.isLinux() || Util.Browser
		.isMac());
var isMobile = Util.Browser.isMobile();
var isCertified = Util.Browser.isCertified();
var isAIRSecureBrowser = Util.Browser.isSecure();

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
		alert('SB browser component failed to load');
	}
}


setResultItems(1,'IOS Device','IOS Device', isIOSDevice ? "Passed":"Failed");
setResultItems(2,'Android Device','Android Device', isAndroidDevice ? "Passed":"Failed");
setResultItems(3,'Desktop','Desktop', isDesktop ? "Passed":"Failed");
setResultItems(4,'Firefox Browser Check','Firefox Browser check', isFireFox ? "Passed":"Failed");
setResultItems(5,'Chrome Browser Check','Chrome Browser check', isChrome ? "Passed":"Failed");
setResultItems(6,'AIRSecureBrowser Check','AIRSecureBrowser check', isAIRSecureBrowser ? "Passed":"Failed");
setResultItems(7,'Mobile','Mobile Device', isMobile ? "Passed":"Failed");
setResultItems(8,'Certified Browser','Certified', isCertified ? "Passed":"Failed");

setResultItems(9,'Check for MATHML Support','Util.Browser.supportsMathML()', Util.Browser.supportsMathML() ? "Passed":"Failed");

setResultItems(9,'Check for SVG Support','Util.Browser.supportsSVG()', Util.Browser.supportsSVG() ? "Passed":"Failed");

setResultItems(10,'Check for Audio OGG Support','Util.Browser.supportsAudioOGG()', Util.Browser.supportsAudioOGG() ? "Passed":"Failed");

setResultItems(11,'Check for [SecureBrowser] global Object','typeof (SecureBrowser) != "undefined"', typeof (SecureBrowser) != 'undefined' ? "Passed":"Failed");

setResultItems(12,'Check for [runtime] Object for AIR Browser','(runtime != null && typeof (runtime)!="undefined" && typeof(runtime)=="object")', (runtime != null && typeof (runtime)!='undefined' && typeof(runtime)=='object') ? "Passed":"Failed");

setResultItems(13,'Check for [browser] window global Object','typeof (window.browser) != "undefined"', typeof (window.browser) != 'undefined' ? "Passed":"Failed");

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




function setResultItems(id,testName,testAPI,result){
	 loop.push({ "id": id,"testName": testName,"testApi": testAPI,"testResult":result});
}


function populateResults(){
	$("#jsGrid").jsGrid({
	    width: "100%",
	    height: "100%",

	    /* inserting: true,
	    editing: true,
	    sorting: true,
	    paging: true, */

	    data: loop,

	    fields: [
	        { title: "ID", name: "id", type: "number", width: 50, validate: "required" },
	        { title: "Test Name",name: "testName", type: "text", width: 150 },
	        { title: "Test API",name: "testApi", type: "text", width: 200 },
	        { title: "Result",name: "testResult", type: "text",width:50 }
	    
	    ]
	});
}
