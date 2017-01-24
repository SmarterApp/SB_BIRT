//*******************************************************************************
// Educational Online Test Delivery System
// Copyright (c) 2017 American Institutes for Research
//
// Distributed under the AIR Open Source License, Version 1.0
// See accompanying file AIR-License-1_0.txt or at
// http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf
//*******************************************************************************
var isIOSDevice = Util.Browser.isIOS();
var isAndroidDevice = Util.Browser.isAndroid();
var isFireFox = Util.Browser.isFirefox();
var isChrome = Util.Browser.isChrome();
var isMobile = Util.Browser.isMobile();
var isCertified = Util.Browser.isCertified();
var isAIRSecureBrowser = Util.Browser.isSecure();

TDS.SecureBrowser.initialize();
var impl = TDS.SecureBrowser.getImplementation();

if (impl) {
	impl.checkGlobalObject();

	/** SEC-25 : API: Retrieve device details (R) * */
	impl.checkDeviceInfo();

	/** SEC-27 : API: get system MAC address(es) (O) * */
	impl.checkMACAddressAPI();

	/** SEC-28 : API: Retrieve client IP address(es) (O) * */
	impl.checkIPAddressAPI();

	/** SEC-29 : API: Get application start time (O). * */
	impl.checkAppStartTimeAPI();

	/** SEC-37 : API: TTS Stop (R) */
	impl.checkTTSStopAPI();

	/** SEC-38 : API: Get TTS Status (R) * */
	impl.checkTTSStatusAPI();

	/** SEC-39 : API: Get Voices for TTS (R) * */
	impl.checkTTSVoicesAPI();

	/** SEC-50 : API: Set TTS pitch (R) * */
	impl.checkTTSPitchAPI();

} else {
	console.log('No Implementation found for Secure Browser');
}

populateResults();

function getMethods(obj) {
	var result = [];
	for ( var method in obj) {
		result.push(method)

	}
	return result;
}

function closeBrowser() {
	impl.close();
}

function populateResults() {
	$("#jsGrid").jsGrid({
		width : "100%",
		height : "100%",

		data : Util.Validation.getResult(),

		fields : [
		/*
		 * { title: "ID", name: "id", type: "number", width: 20, validate:
		 * "required" },
		 */
		{
			title : "Test Name",
			name : "testName",
			type : "text",
			width : 150
		}, {
			title : "Test API",
			name : "testApi",
			type : "text",
			width : 150
		}, {
			title : "Result",
			name : "testResult",
			type : "text",
			width : 50,

			itemTemplate : function(value) {
				if (value) {
					return "Passed";
				} else {
					return "Failed";
				}

			}

		}, {
			title : "Details",
			name : "details",
			type : "text",
			width : 150
		}

		]
	});
}
