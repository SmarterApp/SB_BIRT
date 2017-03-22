# Welcome to the Secure Browser Implementation Readiness Test (IRT) Application

The Implementation Readiness Test is much like a certification program in that it includes services, sample
content, and test scripts necessary to determine that a secure browser meets the requirements. It differs
from certification in that the emphasis is on self-testing by developers and the generation of a compliance
report.

* Match the updated Secure Browser Requirements including the Secure Browser Launch Protocol.
* Exercise and validate all required and optional Secure Browser APIs.
* Incorporate appropriate HTML support tests as recommended by supplier and approved by UCLASmarter Balanced to evaluate support of the HTML features required by the specification. Options include Acid3 and, HTML5Test. Tests must include support for certain Web Components features to be determined in partnership with Smarter Balanced. Web Component support may be achieved through polyfills.
* Produce an Implementation Readiness Report for any tested browser.

## License ##
* This project is licensed under the [AIR Open Source License v1.0](http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf).
* This project includes source code from [HTML5Test](http://html5test.com/) [Source](https://github.com/NielsLeenheer/html5test).
* This project includes source code from [CSS3Test](http://css3test.com/) [Source](https://github.com/LeaVerou/css3test).
* This project includes unmodified images from  [Double-J designs](http://www.doublejdesign.co.uk/), distributed under the [Creative Commons Attribution 3.0 Unported](https://creativecommons.org/licenses/by/3.0/) license.
* This project includes modified code for [jQuery RealPerson](http://keith-wood.name/realPerson.html), distributed under the [MIT](http://keith-wood.name/licence.html) licence.



## Getting Involved ##
We would be happy to receive feedback on its capabilities, problems, or future enhancements:

* Use the **Issues** link to file bugs or enhancement requests.
* Feel free to **Fork** this project and develop your changes!

# IRT UI Framework

## Module Overview

### Webapp
The Webapp module contains the IRP UI and REST APIs.

### irp/src/main/webapp/Scripts/SecureBrowser folder
* This folder contains factory.js which will work as an entry point for setting up test APIs for given browser.
* Based on browser and device it will initialize respective js file for testing respective API for browser readiness.
* index.js will call implementation method and other API test calls.
* For each test , test API will populate a json array with test info like test name, test api signature, result and details (Info about failure or other require details). Check below sample json

```
{details: "window.browser is not defined",
testApi : "!!window.browser"
testName : "[window.browser] global object check"
testResult : false .....}
```

### Tomcat (JVM Configuration)
IRT must be setup with following properties under JVM

* Host : `mongo.db.host`
* Port : `mongo.db.port`
* Username : `mongo.db.username`
* Password : `mongo.db.password`
* DB Name: `mongo.db.name`
* IRT Version : `irt.app.version` 

```
Example:
 -Dmongo.db.host=<DB_HOST> 
 -Dmongo.db.port=<DB_PORT> 
 -Dmongo.db.name=<DB_NAME> 
 -Dmongo.db.username=<USER_NAME>
 -Dmongo.db.password=<DB_PASSWORD>
 -Dirt.app.version=<IRT_APP_VERSION>
```

### Mongo DB Configuration
IRT Application connect to mongo DB to store report information.

Below are the two important object required to be created in mongo DB
* Database : `irt_report` [ Database name to be used in JVM configuration for property `mongo.db.name`.]
* Collection Name : `test_results`


### UI Framework
* [jQuery v3.1.1](http://jquery.com/)
* [jQueryUI v1.12](https://jqueryui.com/)
* [jQuery Multiselect Plugin](http://crlcu.github.io/multiselect/)
* [jQuery Cookie Plugin](http://plugins.jquery.com/cookie/)
* [jsGrid v1.5.3](http://js-grid.com/)
* [jQuery Real Person Captcha](http://keith-wood.name/realPerson.html)

### Pre-Dependencies
* Tomcat 6 or higher
* Maven (mvn) version 3.X or higher installed
* Java 7

### Runtime Dependencies
* Servlet API
* Persistence API
