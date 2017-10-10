<!DOCTYPE html>
<html lang="en">
<head>
<title>Browser Implementation Readiness Test (BIRT)</title>
<%
      String contextPath = request.getContextPath();
      String version = System.getProperty("birt.app.version");
      String debugMode = System.getProperty("birt.app.debug.mode");
      String reportIdLength = System.getProperty ("birt.app.reportid.length");
      String gitBranch = System.getProperty("birt.git.branch");
      String birtEnv = System.getProperty("birt.env");
      String regTest = System.getProperty("birt.regTest");
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
   src="<%=contextPath%>/Scripts/Libraries/yahoo/customevent.js"></script> 
 <script type="text/javascript"
   src="<%=contextPath%>/Scripts/Libraries/yahoo/env.js"></script> 


<!-- WebAudio -->

<script type="text/javascript"
  src="<%=contextPath%>/Scripts/WebAudio/webaudiorecorder.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/WebAudio/certifiedrecorder.js"></script>



<script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/test/irtspec.js"></script>


<script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/factory.js"></script>



 <script type="text/javascript"
  src="<%=contextPath%>/Scripts/SecureBrowser/securebrowser.js"></script>

<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Utilities/util.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Utilities/util_browser.js"></script>
  
<script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/test/populateGrid.js"></script>


<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Shared/irt.css" />
<script type="text/javascript">

var appWindow = null;
var appOrigin = null;

  $(document).ready(
      function() {
   

    	  TDS.SecureBrowser.initialize();
    	  var impl = TDS.SecureBrowser.getImplementation();
        $.removeCookie("contextPath");
        $.removeCookie("name");
        $.removeCookie("emailId");
        $.removeCookie("browserDetails");
        $.removeCookie("gitBranch");
        $.removeCookie("organization");
        $.removeCookie("optionalScoring");
        $.cookie("version",  '<%=version%>');
        $.cookie("gitBranch" ,'<%=gitBranch%>');
        $.removeCookie("captchaInfo");
        $.removeCookie("regTest");
        
        $.cookie("regTest",  '<%=regTest%>');        
        $.cookie("contextPath",'<%=contextPath%>');
        
        $.removeCookie("birtEnv");
        $.cookie("birtEnv",'<%=birtEnv%>');
        

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

        var versionInfoLink =  "<a href='https://github.com/SmarterApp/SB_BIRT/commits/"+$.cookie("gitBranch")+"' id='versionLinkId' target='_blank' class='version-details'>v."+$.cookie("version")+"</a>";
        $("#versionInfo").html(versionInfoLink);
       

        $(document).tooltip({
          position : {
            my : "left+15 center",
            at : "right center"
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
        }else{
          $("#closeBrowser").show();
          $("#closeBrowser").click(function() {
            closeChromeExtension();
          });
        }
        
        $("#footerInfo").load(cntxPath + "/Scripts/SecureBrowser/test/footer.html");
        
        function onMessage(e) {
          appWindow = e.source;
          appOrigin = e.origin;
          console.log(e);
        }
        
        window.addEventListener('message', onMessage);
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

<%if("prod".equalsIgnoreCase (birtEnv)){ %>
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()
{ (i[r].q=i[r].q||[]).push(arguments)}
,i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-27429193-5', 'auto');
ga('send', 'pageview');
</script>
<%} %>

</head>
<body>

  <div id="main">

    <div>

      <h1 class="entry-title">
      <span onclick="javascript:openSmarterLinkDialog('smarterhome', 'Smarter Balanced Home Page','https://www.smarterbalanced.org/')"
      class="logo-link">
        <img alt="Smarter Balanced Assessment Consortium"
          class="smarter-logo"
          src="<%=contextPath%>/Shared/images/SmarterBalanced_logo.png"
          title="Smarter Balanced Assessment Consortium"> </span><span>Browser
          Implementation Readiness Test (BIRT)</span> <span id="versionInfo"
          ></span>
      </h1>
      <p class="header-paragraph" align="right">
          <img alt="Close" title="Close"
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
        <div id="lipsum" style="font-size: 14px; line-height: 20px;">
          <p>The Browser Implementation Readiness Test (BIRT) is an
            Open Source tool for testing browser compatibility to the
            Smarter Balanced Open Specification for Secure Browsers
            (OSSB) communication with educational software. BIRT not
            only tests browser compatibility with the OSSB but also
            tests browsers for a number of other protocols and
            specifications such as 
            <span onclick="javascript:openSmarterLinkDialog('w3cHtml5Spec', 'W3C HTML5 Specification','https://www.w3.org/TR/html5/')" class="about_link">HTML5</span>, 
            <span onclick="javascript:openSmarterLinkDialog('cssSpec', 'W3C CSS specifications','https://www.w3.org/Style/CSS/specs.en.html')" class="about_link">CSS3</span>, 
            <span onclick="javascript:openSmarterLinkDialog('w3cWebSpeech', 'W3C WebSpeech API','https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html')" class="about_link">Text-to-Speech</span>, 
            <span onclick="javascript:openSmarterLinkDialog('w3cWebAudio', 'Web Audio API','https://www.w3.org/TR/webaudio/')" class="about_link">Web Audio API</span> for playback and
            <span onclick="javascript:openSmarterLinkDialog('mediaStreamRecording', 'MediaStream Recording','https://www.w3.org/TR/mediastream-recording/')" class="about_link">MediaStream Recording</span> for recording.</p>
          <p>To optimize the implementation process, Smarter
            Balanced not only defined the OSSB but is also releasing a
            set of Secure Browsers under an Open Specification and as
            Open Source software.</p>
          <p>Smarter Balanced is releasing the BIRT as a tool for
            Implementation Readiness to be used by any browser
            manufacturer to verify that their browser works properly and
            is compatible with the OSSB. Smarter Balanced hopes that by
            leading the way with an Open Specification, and by making it
            available for other browser manufacturers, the end result
            will be such that schools will have a set of choices for
            secure browsers to be used with all of the available Test
            Delivery Systems employed for assessing student performance.</p>
        </div>
      </div>
    </div>
       <div id="dialog-error"></div>
     

  </div>
  
  <div>&nbsp;</div>
  <div class="main" id="footerInfo">

</div>

</body>
</html>
