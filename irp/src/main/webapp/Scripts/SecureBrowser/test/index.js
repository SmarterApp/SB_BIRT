this.runtime = null;
var isIOSDevice = (/Mobile/i.test(navigator.userAgent) && /Iphone/i
		.test(navigator.userAgent));
var isAndroidDevice = (/Mobile/i.test(navigator.userAgent) && /Android/i
		.test(navigator.userAgent));
var isFireFox = /Firefox/i.test(navigator.userAgent);
var isChrome = !!window.chrome;
var isDesktop = (Util.Browser.isWindows() || Util.Browser.isLinux() || Util.Browser
		.isMac());

if (isIOSDevice || isAndroidDevice) {
	this.runtime = (new Summit.SecureBrowser.Mobile()).getNativeBrowser();
	/*alert(runtime);
	alert("Runtime Methods" + getMethods(runtime));
	alert(runtime.checkRunningProcesses(null,null));*/
	
	alert(runtime.device);

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

QUnit.test('Get process list',function(assert) {

		assert.equal(isIOSDevice,true,'Checking if Browser is Mobile Browser, this test will return true only in case of IOS Device');
		assert.equal(isAndroidDevice,true,'Checking if Browser is Mobile Browser, this test will return true only in case of Android Device');
		assert.equal(isFireFox, true,'Checking if Browser is Mozilla Firefox Browser');
		assert.equal(isChrome, true,'Checking if Browser is Chrome Browser');
		assert.equal(isDesktop, true,'Checking if this is Desktop');

		assert.equal(typeof (SecureBrowser) != 'undefined', true,'Checking if this is Secure Browser');
		if (typeof (SecureBrowser) != 'undefined') {
			//alert("SecureBrowser Object " + SecureBrowser);
			//alert(window.JavaBrowserSecurity);
			alert("SecureBrowser Methods " + getMethods(SecureBrowser));
		}

		assert.equal(Util.Browser.supportsMathML(),true,'Check for MathML Support');
		//alert("Runtime Object" + runtime);
		
		alert("Voice Name " +runtime.voiceName);
		alert("Voices " + runtime.voices);
		runtime.initialize();
        runtime.play('Aarya');
		alert(runtime.status);
		runtime.pause();
		alert(runtime.status);
		runtime.resume();
		alert(runtime.status);
		//runtime.stop();
		
		if (runtime != null && typeof (runtime)!='undefined' && typeof(runtime)=='object') {
			alert("Runtime Methods" + getMethods(runtime));
			//alert("Runtime Device Methods" + getMethods(runtime.device));
			
			if (typeof (runtime.getRunningProcessList) == 'function') {
				var processes = runtime.getRunningProcessList();
				//alert("processes " + processes);
				assert.ok(processes.indexOf('chrome.exe') != -1,'Check for process we know exists');
			}
		}
		
		//alert("User Agent " + navigator.userAgent);

});

function getMethods(obj) {
	var result = [];
	for (var method in obj) {
		result.push(method)

	}
	return result;
}
