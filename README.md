# Welcome to the Secure Browser Implement Readiness Package Application

The Implementation Readiness Package is much like a certification program in that it includes services, sample content, and test scripts necessary to determine that a secure browser meets the requirements. It differs from certification in that the emphasis is on self-testing by developers and the generation of a compliance report.

* Match the updated Secure Browser Requirements including the Secure Browser Launch Protocol.
* Exercise and validate all required and optional Secure Browser APIs.
* Incorporate appropriate HTML support tests as recommended by supplier and approved by UCLASmarter Balanced to evaluate support of the HTML features required by the specification. Options include Acid3 and, HTML5Test. Tests must include support for certain Web Components features to be determined in partnership with Smarter Balanced. Web Component support may be achieved through polyfills.
* Produce an Implementation Readiness Report for any tested browser.

## License ##
This project is licensed under the [AIR Open Source License v1.0](http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf).

## Getting Involved ##
We would be happy to receive feedback on its capabilities, problems, or future enhancements:

* For general questions or discussions, please use the [Forum](http://forum.opentestsystem.org/viewforum.php?f=9).
* Use the **Issues** link to file bugs or enhancement requests.
* Feel free to **Fork** this project and develop your changes!

# IRP UI Framework

## Module Overview

### Webapp
The Webapp module contains the IRP UI and REST APIs.

### irp\src\main\webapp\Scripts\SecureBrowser folder
* This folder contains factory.js which will work as an entry point for setting up test API's for given browser.
* Based on browser and device it will initialize respective js file for testing respective API for browser readiness.
* index.js will call implementation method and other API test calls

### UI Framework
* jQuery v1.11.1
* jsGrid v1.5.3 

### Pre-Dependencies
* Tomcat 6 or higher
* Maven (mvn) version 3.X or higher installed
* Java 7

### Runtime Dependencies
* Servlet API
* Persistence API
