# Secure Browser Launch Protocol Specification
v.1.5 - Last modified 27-Apr-2017

## IP Notice
This specification is &copy;2017 by The Regents of the University of California, Smarter Balanced Assessment Consortium and is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## Overview
In order to provide a seamless launch experience for the student, as well as centrally-managed experience for states, the Secure Browser follows a simple launch protocol described herein.

The launch protocol is implemented using a hosted webpage ("portal" or "landing" page) with a prescribed list of testing hosts. The host of the landing page would be the gatekeeper to other uses of the browser, and be responsible for managing link updates, load, and user experience for that page. 
 
Once the student selects a test site, the browser is redirected to that site and optionally stores that selection. If stored, future launches of the browser will apply the selection (if any) and immediately direct to the selected testing site.

### Benefits* URLs can be updated in real time in a single location* Landing site can be scaled to handle necessary load when needed* Login process only executed once per student

## Specification
The sequence diagram below (Figure 1) should be used as a guideline for the normal launch interactions among the secure browser, landing site, and the test delivery system (TDS).

1. The Secure Browser shall open the hard-coded landing site URL upon launch.
1. The student selects an appropriate testing site (e.g. California Summative).
1. The browser is redirected to the selected state site and stores the URL for future use if a URL option is provided (StoreURL).
1. The student enters authentication information into the TDS login page.
1. The student begins the test after being authenticated and authorized.
1. Future connection attempts will have the Secure Browser immediately redirect to the previously selected testing site, if that option was selected.
1. TDS provides a mechanism for the student to browse back to the landing site in case the selection needs to be changed.
1. A mechanism to reset the browser's default URL back to the launch page may be provided.<img alt="Secure Browser Launch Protocol Design Guidelines" src="Secure_Browser_Launch_Protocol.png" width="800">
Figure 1: Secure Browser Launch Protocol Sequence Diagram

### Example URLs

* Default (landing page) URL: http://browser.smarterbalanced.org/landing
* https://aa.tds.airast.org/student  (will redirect and not store)
* https://aa.tds.airast.org/student?StoreURL=true   (will redirect and store)
* https://aa.tds.airast.org/student?ResetURL=true   (will reset to default landing page but redirect to requested URL)
* https://aa.tds.airast.org/student?StoreURL=true&ResetURL=true   (will reset to default landing page, but redirect to requested URL. The StoreURL option is ignored.)

### Flow Chart
The flow chart (Figure 2) and design description below (Figure 3) include details of all possible launch protocol conditions and options. 

<img alt="Secure Browser Launch Protocol Flow Chart" src="SBLP.png" width="800">

Figure 2: Launch Protocol flow chart


```
IF the ResetURL option is set
   set the URL to the original (hardcoded) default URL
ELSE
   IF the storeURL option is set
      make this URL the new default URL
   ENDIF
ENDIF
```
Figure 3: Launch Protocol design description

### API

1. A1. **Store URL**

    This API will set a given URL as a default URL which will be used by the Secure Browser to redirect upon its next launch.

    `void SecureBrowser.security.setDefaultURL(String urlString, String identifier, String callback)`

    `urlString` : URL to set as a storeURL to be used as default URL (required)

    `identifier` : optional string
    
    `callback` : optional function
    

1. A2. **Reset URL**

    This API will reset the default URL back to the default landing page.

    `void SecureBrowser.security.resetURL()`



## References
1. [Secure Browser Functional Requirements](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserFunctionalRequirements.md)
1. [Secure Browser API Specification](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserAPIspecification.md)
