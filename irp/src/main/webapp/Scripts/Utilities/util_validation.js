
(function(Util) {

	var resultArray = [];
	
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
	
	Validation.setResultItems = function(id,testName,testAPI,result,details){
		resultArray.push({ "id": id,"testName": testName,"testApi": testAPI,"testResult":result,"details":details});
	};
	
/*	Validation.setResultItems = function(id,testName,testAPI,result){
		resultArray.push({ "id": id,"testName": testName,"testApi": testAPI,"testResult":result});
	};*/
	
	Validation.getResult = function() {
        return resultArray;
    };

	Util.Validation = Validation;

})(Util);
