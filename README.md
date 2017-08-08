# Welcome to the Browser Implementation Readiness Test (BIRT) Application

The Browser Implementation Readiness Test (BIRT) is much like a certification program in that it includes services, sample
content, and test scripts necessary to determine that a secure browser meets the requirements. It differs
from certification in that the emphasis is on self-testing by developers and the generation of a compliance
report. The BIRT:

* Implements the new [Secure Browser Requirements](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserAPIspecification.md).<sup>*</sup> 
* Exercises and validates all required and optional Secure Browser APIs.
* Incorporates appropriate HTML support tests as recommended by supplier and approved by Smarter Balanced to evaluate support of the HTML features required by the specification. Currently, these include CSS3 and HTML5.
* Produces an Implementation Readiness Report for any tested browser.

<sup>*</sup> Note that as of 13-Apr-2017, BIRT tests for the legacy APIs for mobile secure browsers. All other tests are geared towards the new APIs. Mobile support for the new APIs will be added in the coming weeks.

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

# BIRT UI Framework

## Module Overview

### Webapp
The Webapp module contains the BIRT UI and REST APIs.

### irp/src/main/webapp/Scripts/SecureBrowser folder
* This folder contains factory.js which will work as an entry point for setting up test APIs for given browser.
* Based on browser and device it will initialize respective js file for testing respective API for browser readiness.
* index.js will call implementation method and other API test calls.
* For each test, test API will populate a JSON array with test info such as test name, test API signature, results, details and other info Please refer [BIRT_Test_Configuration](https://github.com/SmarterApp/SB_BIRT/blob/vk/irp/doc/design/IRT_Automated_Testing_Configuration.docx). See sample JSON:

```
{
      "id" : "21",
      "testName" : "TEST NAME",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "API_SIGNATURE_TO_BE_TESTED",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
}
```

### Tomcat (JVM Configuration)
BIRT must be setup with the following JVM properties:

* Host : `mongo.db.host`
* Port : `mongo.db.port`
* Username : `mongo.db.username`
* Password : `mongo.db.password`
* DB Name  : `mongo.db.name`
* BIRT Version : `birt.app.version` 
* Debug Mode (Y/N) : `birt.app.debug.mode`
* ReportID Length (integer) : `birt.app.reportid.length` 
* BIRT Report Retention period (days) : `birt.app.report.retention`
* BIRT GitHub Branch name : `-Dbirt.git.branch`
* BIRT SB API Regression Testing Flag : `-Dbirt.regTest`

```
Examples:
 -Dmongo.db.host=test.db.org 
 -Dmongo.db.port=27017
 -Dmongo.db.name=testName
 -Dmongo.db.username=testUser
 -Dmongo.db.password=testPassword
 -Dirt.app.version=testVersion
 -Dbirt.app.debug.mode=Y 
 -Dbirt.app.reportid.length=8 
 -Dbirt.app.report.retention=30
 -Dbirt.git.branch = R01.02.01-20170412
 -Dbirt.regTest=Y
```

### Mongo DB Configuration
The BIRT application connects to a Mongo DB instance to store report information.

Below are the four important elements that must be created in mongo DB:

* A database named `irt_report` (defined in the JVM configuration property `mongo.db.name`)
* A collection named `test_results` which will store the report documents.
* A collection named `birt_statistics` which will store BIRT usage statistics.
* A collection named `report_delete_statistics` which will store ReportIDs which have been deleted by `BirtScheduler` after the retention period has expired.


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

### Documentation
* Additional documentation is available [here](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc).

# Captcha

* In order to prevent attacks in the form of false or repeated, automated submissions, the jQuery UI Plugin [jQuery Real Person Captcha](http://keith-wood.name/realPerson.html) was integrated
* index.html is modified to include Captcha configuration as below
 
```
   * Javascript : $(selector).realperson({chars : $.realperson.alphanumeric,length : 8});
   * chars : The list of characters to generate the challenge from, $.realperson.alphabetic or  $.realperson.alphanumeric for the standard character sequences.
   * length : The number of characters to be entered.
```

* Once the user enters the correct challenge characters, the UI enables the `Finish and Generate Report` button. 
* If a JSON is sent directly via HTTP with incorrect Captcha information, the system will throw an exception and will not save the data in the database.
