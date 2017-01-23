var isIOSDevice = Util.Browser.isIOS();
var isAndroidDevice = Util.Browser.isAndroid();
var isFireFox = Util.Browser.isFirefox();
var isChrome = Util.Browser.isChrome();
var isMobile = Util.Browser.isMobile();
var isCertified = Util.Browser.isCertified();
var isAIRSecureBrowser = Util.Browser.isSecure();

TDS.SecureBrowser.initialize();
var impl = TDS.SecureBrowser.getImplementation();


Util.Validation.setResultItems(1,'IOS Device','IOS Device', isIOSDevice);
Util.Validation.setResultItems(2,'Android Device','Android Device', isAndroidDevice);
Util.Validation.setResultItems(4,'Firefox Browser Check','Firefox Browser check', isFireFox );
Util.Validation.setResultItems(5,'Chrome Device Check','Chrome Browser check', isChrome );
Util.Validation.setResultItems(6,'AIRSecureBrowser Check','AIRSecureBrowser check', isAIRSecureBrowser );
Util.Validation.setResultItems(7,'Mobile','Mobile Device', isMobile );
Util.Validation.setResultItems(8,'Certified Browser','Certified', isCertified );

Util.Validation.setResultItems(9,'Check for MATHML Support','Util.Browser.supportsMathML()', Util.Browser.supportsMathML() );

Util.Validation.setResultItems(10,'Check for SVG Support','Util.Browser.supportsSVG()', Util.Browser.supportsSVG() );

Util.Validation.setResultItems(11,'Check for Audio OGG Support','Util.Browser.supportsAudioOGG()', Util.Browser.supportsAudioOGG() );

if (impl) {
	impl.checkGlobalObject();
	
	/**SEC-25 : API: Retrieve device details (R) **/
	impl.checkDeviceInfo();
	
	/** SEC-27 : API: get system MAC address(es) (O) **/
	impl.checkMACAddressAPI();
	
	/** SEC-28 : API: Retrieve client IP address(es) (O) **/	
	impl.checkIPAddressAPI();
    
} else {
	alert('no sb');
}



populateResults();

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
	       /* { title: "ID", name: "id", type: "number", width: 20, validate: "required" },*/
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
