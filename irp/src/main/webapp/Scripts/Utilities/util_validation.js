// REQUIRES: util_event.js, YUI

/*
 Parser help:
 https://github.com/tobie/ua-parser/blob/master/regexes.yaml
 https://github.com/faisalman/ua-parser-js/
 */

(function(Util) {

	var MACREGEX = new RegExp(
			"^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$");

	var Validation = {};

	Validation.isMacAddressValid = function(macAddress) {
		return macAddress != null && MACREGEX.test(macAddress);
	};

	Validation.isIPAddressValid = function(ipaddress) {
		if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
				.test(ipaddress)) {
			return (true)
		}
		return (false)
	};

	Util.Validation = Validation;

})(Util);
