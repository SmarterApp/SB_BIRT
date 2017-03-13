<!DOCTYPE html>
<html>
<head>
<%
  String contextPath = request.getContextPath();
  String version = System.getProperty ("irt.app.version");
            //response.sendRedirect(contextPath + "/Scripts/SecureBrowser/test/index.html");
%>
<!-- JQuery -->
<script src="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-3.1.1.js"></script>
<script
  src="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui-1.12.js"></script>

<script
  src="<%=contextPath%>/Scripts/Libraries/jQuery/jquery.cookie.js"></script>

<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui.css" />
<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui.structure.css" />
<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui.theme.css" />
  
  <!-- YAHOO -->
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Libraries/yahoo/yahoo-dom-event.js"></script>
<script type="text/javascript" src="<%=contextPath%>/Scripts/Libraries/yahoo/env.js"></script>

<!-- YUI -->
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Libraries/YUI/storage/storage-min.js"></script>
  
  


<script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/test/irtspec.js"></script>

 <script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/Summit/air_mobile.js"></script> 

<script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/factory.js"></script>

<script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/certified.js"></script>
<script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/firefox.js"></script>
<script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/mobile.android.js"></script>
<script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/mobile.ios.js"></script>


  <script type="text/javascript" src="<%=contextPath%>/Scripts/Utilities/util.js"></script>
<script type="text/javascript" src="<%=contextPath%>/Scripts/Utilities/util_browser.js"></script>
<script type="text/javascript" src="<%=contextPath%>/Scripts/Utilities/util_mozilla.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Utilities/util_securebrowser.js"></script>

<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Shared/irt.css" />
<script type="text/javascript">
TDS.SecureBrowser.initialize();
var impl = TDS.SecureBrowser.getImplementation();
  $(document).ready(
      function() {
        
   
        
        $.removeCookie("name");
        $.removeCookie("emailId");
        $.removeCookie("browserDetails");
        $.removeCookie("organization");
        $.removeCookie("optionalScoring");
        $.cookie("version",  '<%=version%>');

        var cntxPath = '<%=contextPath%>';
        $('#beginIRTTest').button({
          label : 'Begin IRT Test'
        });

        $('#getIRTResult').button({
          label : 'Get IRT Test Result'
        });

        $('#beginIRTTest').click(
            function(event) {    
              event.preventDefault();
              $.cookie("name",  $('#name').val());
              $.cookie("emailId",  $('#emailId').val());
              $.cookie("browserDetails",  $('#browserDetails').val());
              $.cookie("organization",  $('#organization').val());
              
              var optionalScoringFlag = $('input[name="optionalScoring"]:checked').val();
              $.cookie("optionalScoring",optionalScoringFlag);
              
              window.location.href = cntxPath + "/Scripts/SecureBrowser/test/index.html";
            });
        
        $('#getIRTResult').click(
            function(event) {    
              event.preventDefault();
              window.location.href = cntxPath + "/report/" + $('#reportId').val();
            });
        
        
        $( "#reportId" ).keyup(function( event ) {
          
          enableGetIRTResultButton(event);
          
        });
        
        $( "#reportId" ).change(function( event ) {
          
          enableGetIRTResultButton(event);
          
        });
        
        $("#versionInfo").html('v.' + $.cookie("version"));
        
        $( document ).tooltip({
              position: { my: "left+15 center", at: "right center"}
        });
        
        $('#enableOptionScoring').checkboxradio();
        $('#disableOptionScoring').checkboxradio();
        
        
        if (Util.Browser.isSecure()) {
          $("#closeBrowser").show();
          $("#closeBrowser").click(function() {
            impl.close(false);
          });
        }
        
      });
  
  function enableGetIRTResultButton(event){
    
    var reportId = $( "#reportId" ).val();
    
    
    if(reportId > 0 && $.isNumeric(reportId)){
      $('#getIRTResult').button("enable");
    }
    else{ 
      $('#getIRTResult').button("disable");
     // When user hit enter/return, system will not call the form URL if the report id is not Valid
    if (event.which == 13 ) {
      event.preventDefault();
    }
    }
    
  }
</script>
</head>
<body>

  <div id="main">

    <div>

      <h1 class="entry-title">
        <img alt="Smarter Balanced Assessment Consortium"
          style="width: 183px !important;"
          src="<%=contextPath%>/Shared/images/SmarterBalanced_logo.png" title="Smarter Balanced Assessment Consortium" />
        <span> &nbsp;&nbsp;Secure Browser Implementation
          Readiness Test (IRT) </span>
          <br/>
           <span id="versionInfo" class="version-details"></span>
      </h1>
      <p align="right">
      
      <a href="#"
          id="closeBrowser" style="display: none;">Close</a>
      </p>
    </div>

    <form>

      <div class="divTable" id="left-intro-section">
        <div class="divTableBody">
        
        
          <div class="divTableRow" >
                <div id="instruction">
                <p style="padding: 4px;">To test your current browser against the IRT, please enter any of the optional information below (which will be included in the final report), then press <strong>Begin IRT Test</strong>.</p>
                </div>
          </div>
               
          <div class="divTableRow">
            <div class="divTableCell">Name:</div>
            <div class="divTableCellRight">
              <input type="text" name="name" id="name">
            </div>
          </div>
          <div class="divTableRow">&nbsp;</div>
          <div class="divTableRow">
            <div class="divTableCell">Organization:</div>
            <div class="divTableCellRight">
              <input type="text" name="organization" id="organization">
            </div>
          </div>
           <div class="divTableRow">&nbsp;</div>
          <div class="divTableRow">
            <div class="divTableCell">Email:</div>
            <div class="divTableCellRight">
              <input type="text" name="emailId" id="emailId" title="For identification purposes only. No email will be sent">
            </div>
          </div>
          <div class="divTableRow">&nbsp;</div>
          <div class="divTableRow">
            <div class="divTableCell">Browser Info:</div>
            <div class="divTableCellRight">
            <textarea id="browserDetails" name="browserDetails" title="Descriptive text about the browser you are testing" cols="30" rows="3" style="resize: none;"></textarea>           
            </div>
          </div>
          
          
          <div class="divTableRow">&nbsp;</div>
           <div class="divTableRow" id="functionalityRow">
            <div class="divTableCell">Score optional tests?</div>
            <div class="divTableCellRight">
              <label for="enableOptionScoring">Yes</label> <input
                type="radio" id="enableOptionScoring" value="Yes"
                name="optionalScoring" title="Include optional tests in score" alt="Include optional tests in score"> <label
                for="disableOptionScoring">No</label> <input
                type="radio" id="disableOptionScoring" value="No"
                name="optionalScoring" checked="checked" title="Exclude optional tests from score" alt="Exclude optional tests from score" >
            </div>
          </div>
          
          
          
          
          <div class="divTableRow">&nbsp;</div>
          <div class="divTableRow" align="center">
            <button id="beginIRTTest"></button>
          </div>
        </div>
      </div>

    </form>
    <form>
      <div class="divTable" id="right-intro-section">

        <div class="divTableBody">

        <div class="divTableRow">
        <div id="instruction">
            <p style="padding: 4px;">To view a previously saved IRT report, please enter its ID and press <strong>Get IRT Test Result</strong>.</p>
            </div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell">Report Id:</div>
            <div class="divTableCellRight">
              <input type="number" name="reportId" id="reportId">
            </div>
          </div>
          <div class="divTableRow">&nbsp;</div>

          <div class="divTableRow" align="center">


            <button id="getIRTResult" disabled="disabled"></button>

          </div>

        </div>
      </div>

    </form>
  </div>

</body>
</html>