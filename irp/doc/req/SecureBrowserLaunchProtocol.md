# Secure Browser Launch Protocol Specification
v.1.3 - Last modified 25-Apr-2017

## IP Notice
This specification is &copy;2017 by The Regents of the University of California, Smarter Balanced Assessment Consortium and is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## Overview
In order to provide a seamless launch experience for the student, as well as centrally-managed experience for states, the Secure Browser follows a simple caching protocol described herein.

The launch protocol is implemented using a hosted webpage with a hard-coded list of testing hosts. The host of the launch page would be the gatekeeper to other uses of the browser, and be responsible for managing link updates, load, and user experience for that page. 
 
Once the student selects a test site, the browser is redirected to that site and stores the selections in the browser's cache. Future launches of the browser will apply the cached selections (if any) and immediately direct to the selected testing site.

### Features
* Secure Browser hardcodes only one landing page URL, which is the hosted URL containing all available testing hosts.* Student makes site selection on landing page and gets redirected* Initial selection (target URL) will be cached by the browser and reused for next launch* A mechanism to clear the cache or return back to the launch page may be provided.### Benefits* URLs can be updated in real time in a single location* Landing site can be scaled to handle necessary load when needed* Login process only executed once per student

## Specification
The sequence diagram below (Figure 1) should be used as a guideline for the normal launch interactions among the secure browser, landing site, and the test delivery system (TDS).

1. Upon launch, the Secure Browser opens the hard-coded Landing Site URL.
1. The student student selects an appropriate testing site (e.g. California Summative).
1. The browser is redirected to the selected state site and caches the URL.
1. The student enters authentication information into the TDS login page.
1. The student begins the test after being authenticated and authorized.
1. Future connection attempts will have the Secure Browser immediately redirect to the previously selected (cached) testing site.
1. TDS provides a mechanism for the student to browse back to the landing site in case the selection needs to be changed.

<img alt="Secure Browser Launch Protocol Design Guidelines" src="https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/Secure_Browser_Launch_Protocol.png" width="800">
Figure 1: Secure Browser Launch Protocol Sequence Diagram

### Flow Chart
The flow chart (Figure 2) and design description below (Figure 3) include details of all possible launch protocol conditions and options.

<img alt="Secure Browser Launch Protocol Flow Chart" src="https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SBLP.png" width="800">

Figure 2: Launch Protocol flow chart

```
IF a URL is found on the command line
   IF the cacheURL option is set
      cache the URL
   ENDIF
   Redirect to that URL.
ELSE
   IF URL is found in Browser's URL cache
      Redirect to that URL.
   ENDIF
ENDIF
```
Figure 3: Launch Protocol design description


## References
1. [Secure Browser Functional Requirements](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserFunctionalRequirements.md)
1. [Secure Browser API Specification](https://github.com/SmarterApp/SB_BIRT/blob/master/irp/doc/req/SecureBrowserAPIspecification.md)
