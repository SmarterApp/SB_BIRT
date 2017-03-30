<!DOCTYPE html>
<html lang="en">
<head>
<title>Browser Implementation Readiness Test (BIRT)</title>
<%
      String contextPath = request.getContextPath();
      String version = System.getProperty("irt.app.version");
      String debugMode = System.getProperty("birt.app.debug.mode");
      String reportIdLength = System.getProperty ("birt.app.reportid.length");
%>
<!-- JQuery -->
<script src="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-3.1.1.js"></script>
<script
  src="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui-1.12.js"></script>

<script src="<%=contextPath%>/Scripts/Libraries/jQuery/jquery.cookie.js"></script>

<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui.css" />
<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui.structure.css" />
<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui.theme.css" />

<!-- YAHOO -->
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Libraries/yahoo/yahoo-dom-event.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Libraries/yahoo/env.js"></script>

<!-- YUI -->
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Libraries/YUI/storage/storage-min.js"></script>

<!-- WebAudio -->

<script type="text/javascript"
  src="<%=contextPath%>/Scripts/WebAudio/mobilerecorder.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/WebAudio/webaudiorecorder.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/WebAudio/certifiedrecorder.js"></script>


<script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/test/irtspec.js"></script>

<script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/Summit/air_mobile.js"></script>

<script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/factory.js"></script>

<script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/certified.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/firefox.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/mobile.android.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/mobile.ios.js"></script>


<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Utilities/util.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Utilities/util_browser.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Utilities/util_mozilla.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Utilities/util_securebrowser.js"></script>




<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Shared/irt.css" />
<script type="text/javascript">
TDS.SecureBrowser.initialize();
var impl = TDS.SecureBrowser.getImplementation();
  $(document).ready(
      function() {
        
   
        $.removeCookie("contextPath");
        $.removeCookie("name");
        $.removeCookie("emailId");
        $.removeCookie("browserDetails");
        $.removeCookie("organization");
        $.removeCookie("optionalScoring");
        $.cookie("version",  '<%=version%>');
        $.removeCookie("captchaInfo");
        
        $.cookie("contextPath",'<%=contextPath%>');

        var cntxPath = '<%=contextPath%>';
        $('#beginIRTTest').button({
          label : 'Begin BIR Test'
        });

        $('#getIRTResult').button({
          label : 'Get BIRT Report'
        });

        $('#beginIRTTest').click(
            function(event) {
              event.preventDefault();

              $.cookie("name", $('#name').val());
              $.cookie("emailId", $('#emailId').val());
              $.cookie("browserDetails", $('#browserDetails').val());
              $.cookie("organization", $('#organization').val());

              var optionalScoringFlag = $(
                  'input[name="optionalScoring"]:checked').val();
              $.cookie("optionalScoring", optionalScoringFlag);

              
              if(validateForm()){
              window.location.href = cntxPath
                  + "/Scripts/SecureBrowser/test/index.html";
              }
            });

        $('#getIRTResult').click(function(event) {
          event.preventDefault();
          window.location.href = cntxPath + "/report/" + $('#reportId').val();
        });

        $("#reportId").keyup(function(event) {

          enableGetIRTResultButton(event);

        });

        $("#versionInfo").html('v.' + $.cookie("version"));

        $(document).tooltip({
          position : {
            my : "left+15 center",
            at : "right center"
          }
        });

        $('#newBirtTest').tooltip({
          position : {
            my : "center bottom-10",
            at : "center top"
          }
        });
        
        $('#birtReport').tooltip({
          position : {
            my : "center bottom-10",
            at : "center top"
          }
        });

        $('#enableOptionScoring').checkboxradio();
        $('#disableOptionScoring').checkboxradio();
        $("#tabs").tabs();

        if (Util.Browser.isSecure() && !Util.Browser.isMobile()) {
          $("#separator").show();
          $("#closeBrowser").show();
          $("#closeBrowser").click(function() {
            impl.close(false);
          });
        }
        <%if ("Y".equalsIgnoreCase(debugMode)) {%>
        $("#clearBrowserCache").show();
        $("#clearBrowserCache").click(function() {
          impl.clearCache();
        });
    <%}%>
  });

  function enableGetIRTResultButton(event) {

    var reportId = $("#reportId").val();

    if (reportId.length >= <%=reportIdLength%>) {
      $('#getIRTResult').button("enable");
    } else {
      $('#getIRTResult').button("disable");
      // When user hit enter/return, system will not call the form URL if the report id is not Valid
      if (event.which == 13) {
        event.preventDefault();
      }
    }

  }
  
  
  function validateForm(){
    
    
    var validData = true;
    var errorMessage = 'HTML and Script Tags are not allowed in below field(s): <ul style="-webkit-margin-start: 3em;">'
    
    if(!validateData($('#name').val())){
      validData = false;
      errorMessage = errorMessage + '<li>Name</li>';
    }
    if(!validateData($('#organization').val())){
      validData = false;
      errorMessage = errorMessage + '<li>Organization</li>';
    }
    if(!validateData($('#emailId').val())){
      validData = false;
      errorMessage = errorMessage + '<li>Email</li>';
    }
    if(!validateData($('#browserDetails').val())){
      validData = false;
      errorMessage = errorMessage + '<li>Browser Info</li>';
    }
    
    if(!validData){
      errorMessage = errorMessage + '</ul>';
      loadErrorDialogBox(errorMessage);
      return false;
    }
    else{
      return true;
    }
    
  }
  function validateData(value){
    var regex = /<(.|\n)*?>/g; 
    if (regex.test(value) == true) {
       return false;
    }
    return true;
   }
  

  function loadErrorDialogBox(htmlData) {
    $('#dialog-error').html('<p><span class="irt-failure-ui-icon"></span>' + htmlData
        + '</p>');
    
    $("#dialog-error").dialog({
      resizable : false,
      height : "auto",
      title : 'Form Validation Error',
      width : 400,
      modal : true,
      buttons : [ {
        text : "OK",
        click : function() {
          $(this).dialog("close");
        }
      } ]
    });
  }
  
</script>
</head>
<body>

  <div id="main">

    <div>

      <h1 class="entry-title">
        <img alt="Smarter Balanced Assessment Consortium"
          class="smarter-logo"
          src="<%=contextPath%>/Shared/images/SmarterBalanced_logo.png"
          title="Smarter Balanced Assessment Consortium"> <span>Browser
          Implementation Readiness Test (BIRT)</span> <span id="versionInfo"
          class="version-details"></span>
      </h1>
      <p class="header-paragraph" align="right">
        <img alt="Clear Cache" title="Clear Cache"
          src="<%=contextPath%>/Shared/images/clear.png"
          id="clearBrowserCache" class="header-ui-icon"
          style="display: none;"> <img alt="Close" title="Close"
          src="<%=contextPath%>/Shared/images/close.png"
          id="closeBrowser" class="header-ui-icon"
          style="display: none;">
      </p>
    </div>


    <div id="tabs" class="loginTab">
      <ul>
        <li><a href="#left-intro-section" class="intro-tab-detail"
           id="newBirtTest">New BIR Test</a></li>
        <li><a href="#right-intro-section" class="intro-tab-detail"
           id="birtReport">BIRT Report</a></li>
      </ul>



      <div class="divTable" id="left-intro-section">
        <form>
          <div class="divTableBody">


            <div class="divTableRow" id="instruction">
              <p style="padding-right: 4%">
                To test your current browser against the BIRT, please
                enter any of the optional information below (which will
                be included in the final report), then press <strong>Begin
                  BIR Test</strong>.
              </p>
            </div>

            <div class="divTableRow">
              <div class="divTableCell">
                <label for="name">Name:</label>
              </div>
              <div class="divTableCellRight">
                <input type="text" name="name" id="name">
              </div>
            </div>
            <div class="divTableRow">&nbsp;</div>
            <div class="divTableRow">
              <div class="divTableCell">
                <label for="organization">Organization:</label>
              </div>
              <div class="divTableCellRight">
                <input type="text" name="organization" id="organization">
              </div>
            </div>
            <div class="divTableRow">&nbsp;</div>
            <div class="divTableRow">
              <div class="divTableCell">Email:</div>
              <div class="divTableCellRight">
                <input type="text" name="emailId" id="emailId"
                  title="For identification purposes only. No email will be sent"
                  alt="For identification purposes only. No email will be sent">
              </div>
            </div>
            <div class="divTableRow">&nbsp;</div>
            <div class="divTableRow">
              <div class="divTableCell">
                <label for="browserDetails">Browser Info:</label>
              </div>
              <div class="divTableCellRight">
                  
                  <textarea name="browserDetails" id="browserDetails" style="width: 100%;resize: none;height: 60px;" title="Descriptive text about the browser you are testing"></textarea>
              </div>
            </div>


            <div class="divTableRow">&nbsp;</div>
            <div class="divTableRow" id="functionalityRow">
              <div class="divTableCell">
                <label for="optionalScoring">Score optional API
                  tests?</label>
              </div>
              <div class="divTableCellRight">
                <fieldset style="border: none !important;">
                  <label for="enableOptionScoring">Yes</label> <input
                    type="radio" id="enableOptionScoring" value="Yes"
                    name="optionalScoring"
                    title="Include optional tests in score"
                    alt="Include optional tests in score"> <label
                    for="disableOptionScoring">No</label> <input
                    type="radio" id="disableOptionScoring" value="No"
                    name="optionalScoring" checked="checked"
                    title="Exclude optional tests from score"
                    alt="Exclude optional tests from score">
                </fieldset>
              </div>
            </div>

            <div class="divTableRow">&nbsp;</div>
            <div class="divTableRow" align="center">
              <button id="beginIRTTest"></button>
            </div>
          </div>

        </form>
      </div>


      <div class="divTable" id="right-intro-section">
        <form>
          <div class="divTableBody">

            <div class="divTableRow" id="instruction">

              <p style="padding-right: 4%">
                To view a previously saved BIRT report, please enter its
                ID and press <strong>Get BIRT Report</strong>.
              </p>

            </div>
            <div class="divTableRow" align="center">
              <label for="reportId">Report Id:&nbsp;&nbsp;</label> <input
                type="text" name="reportId" id="reportId">
            </div>
            <div class="divTableRow">&nbsp;</div>

            <div class="divTableRow" align="center">
              <button id="getIRTResult" disabled="disabled"></button>
            </div>

          </div>
        </form>
      </div>


    </div>
  </div>
   <div id="dialog-error"></div>
</body>
</html>
