<!DOCTYPE html>
<html lang="en">
<head>
<title>Browser Implementation Readiness Test (BIRT)</title>
<%
      String contextPath = request.getContextPath();
      String version = System.getProperty("birt.app.version");
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
  src="<%=contextPath%>/Scripts/SecureBrowser/securebrowser.js"></script>
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
        
        $("#reportId").change(function(event) {

            enableGetIRTResultButton(event);

          });

        var versionInfoLink =  "<a href='https://github.com/SmarterApp/SB_BIRT/commits/"+$.cookie("version")+"' id='versionLinkId' target='_blank' class='version-details'>v."+$.cookie("version")+"</a>";
        $("#versionInfo").html(versionInfoLink);
       

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

        if (Util.Browser.isSecureBrowser() && !!SecureBrowser.security.close) {
          
          $("#closeBrowser").show();
          $("#closeBrowser").click(function() {
            SecureBrowser.security.close(false);
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
    var errorMessage = 'HTML and script tags are not allowed in below field(s): <ul style="-webkit-margin-start: 3em;">'
    
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

<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()
{ (i[r].q=i[r].q||[]).push(arguments)}
,i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-27429193-5', 'auto');
ga('send', 'pageview');
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
          ></span>
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
         <li><a href="#aboutus-section" class="intro-tab-detail"
           id="aboutus">About</a></li>
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
    <div class="divTable" id="aboutus-section" style="width: 90%;">
        <h1>ABOUT BIRT</h1>
  <div id="lipsum" style="font-size: 14px;line-height: 20px;">
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc viverra elit sit amet risus accumsan dapibus. Aenean cursus lectus elit, ut facilisis justo vehicula ac. Aenean id feugiat arcu, in pharetra eros. Vestibulum lacinia ut odio vulputate ornare. Aenean dapibus vehicula mi vel commodo. Proin gravida hendrerit egestas. Cras mollis tellus ac orci porttitor, eget sodales dolor scelerisque. Proin volutpat, arcu ac blandit fringilla, ante nisl tempor augue, non luctus leo mi et ante. Aliquam nisi nisl, gravida a ex a, pharetra dapibus mauris. Phasellus sit amet nibh vitae neque eleifend vestibulum. Morbi tempus metus ut felis bibendum tristique. Sed sodales iaculis sem eu tincidunt.
</p>
<p>
Nullam dictum lacinia ipsum, ac semper libero vehicula vel. Mauris lectus sapien, faucibus quis malesuada iaculis, interdum nec purus. Nullam ac faucibus neque, id commodo nulla. Mauris nec tincidunt tellus. Proin sit amet lacus mauris. Curabitur sapien lectus, fermentum tristique sem nec, rhoncus congue enim. Nunc vulputate ut magna sit amet viverra. Quisque sit amet orci dictum, vehicula lectus in, accumsan urna. Pellentesque eu scelerisque nisi. In quis varius neque. Aliquam posuere lectus id velit finibus porta.
</p>
<p>
Vestibulum eget fringilla nulla. Maecenas vel sem elit. Donec consequat ante mauris, a lacinia odio luctus ac. Praesent eros nunc, rhoncus sit amet elit nec, vulputate rhoncus mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer elit ex, mattis sed malesuada eu, varius sed libero. Mauris vitae sem enim.
</p></div>
</div>
    </div>
  </div>
   <div id="dialog-error"></div>
</body>
</html>
