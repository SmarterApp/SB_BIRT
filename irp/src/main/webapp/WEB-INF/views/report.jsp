<!DOCTYPE html>
<html lang="en">
<head>

<title>Browser Implementation Readiness (BIR) Report Page</title>

<%
  String contextPath = request.getContextPath();
  String version = System.getProperty ("irt.app.version");
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

<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Shared/irt.css" />

<!-- JSGrid -->
<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jsgrid/jsgrid.min.css" />
<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jsgrid/jsgrid-theme.min.css" />
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Libraries/jQuery/jsgrid/jsgrid.min.js"></script>


  <!-- WebAudio -->

<script type="text/javascript"
  src="<%=contextPath%>/Scripts/WebAudio/mobilerecorder.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/WebAudio/webaudiorecorder.js"></script>
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/WebAudio/certifiedrecorder.js"></script>

<script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/test/irtspec.js"></script>


  <!-- YAHOO -->
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Libraries/yahoo/yahoo-dom-event.js"></script>
<script type="text/javascript" src="<%=contextPath%>/Scripts/Libraries/yahoo/env.js"></script>

<!-- YUI -->
<script type="text/javascript"
  src="<%=contextPath%>/Scripts/Libraries/YUI/storage/storage-min.js"></script>
  
 
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

  
<script type="text/javascript" src="<%=contextPath%>/Scripts/SecureBrowser/test/populateGrid.js"></script>

<script type="text/javascript">
TDS.SecureBrowser.initialize();
var impl = TDS.SecureBrowser.getImplementation();
  $(document).ready(
      function() {

        var reportId = ${reportId};
        var irtVersion = '${version}';
        
        
        $("#reportInfo").html($("#reportInfo").html() + ' for Report Id: ' + reportId);

        $.getJSON('<%=contextPath%>/report/getReport/' + reportId,
            function(data) {
              if (data.success == true) {
                console.log(data.reportData);
                populateReportData(data);
              } else {
                showReportIdDialog(data.message, reportId);
              }

            }).done(function() {
          console.log("Report Populate Done");
        }).fail(function(data) {
          showReportIdDialog(data.message, reportId);
        });

        $("#irtHome").click(function() {
          window.location.href = '<%=contextPath%>';
        });

        $("#versionInfo").html('v.' + irtVersion);

        $(document).tooltip();
        
        if (Util.Browser.isSecure() && !Util.Browser.isMobile()) {
          $("#separator").show();
          $("#closeBrowser").show();
          $("#closeBrowser").click(function() {
            impl.close(false);
          });
        }

      });
  
  function populateReportData(data) {

    var extReport = false;

    var jsonObject = data.reportData.externalReportConfig;    
    $("#testDate").html($("#testDate").html() + ' '+ data.reportData.creationdate);
    
    $("#irtVersion").html($("#irtVersion").html() + ' ' + data.reportData.version);
    

    var headerJsonObject = data.reportData.headerHTML;
    Object.keys(headerJsonObject).forEach(
        function(htmlItem, htmlIndex, htmlArray) {

          $("#" + htmlItem).html(eval('headerJsonObject.' + htmlItem));
          
            $('#' + htmlItem + ' #sectionScore').show();
            $('#' + htmlItem + ' #apiCountHeaderSection').show();
            $('#' + htmlItem + ' #extScore').show();
          
          
        });

    var userInfoJsonObj = data.reportData.reportInfo;
    Object.keys(userInfoJsonObj).forEach(
        function(userItem, userItemIndex, userArray) {
          
          if(userItem == 'specInfo'){
          
            
      
            var apiSpecLink = eval('IRT.BrowserSpecPath.'+eval('userInfoJsonObj.' + userItem));
            var finalSpecLink = '<%=contextPath%>' + apiSpecLink;
            
            
            var specLink =  "<a href='"+finalSpecLink+"' id='specLinkId' target='_blank'>"+eval('userInfoJsonObj.' + userItem)+"</a>";
            
            $("#" + userItem).html(
                $("#" + userItem).html() + ' '
                    + specLink);
          }
          else{
          $("#" + userItem).html(
              $("#" + userItem).html() + ' '
                  + eval('userInfoJsonObj.' + userItem));
          }
        });

    var reportGridDataObj = data.reportData.reportGridData;
    Object.keys(reportGridDataObj).forEach(
        function(item, index, array) {
          extReport = eval('jsonObject.' + item);
          populateResults($("#" + item), eval('reportGridDataObj.' + item),
              extReport);
        });
  }

  function showReportIdDialog(textInfo, reportId) {

    var id = $('#reportInfoDialog');

    var textMessage = eval(irtApiSpecConstant + specSeparator + specMessage
        + specSeparator + "errorDialog_" + textInfo);

    var iconClass = 'irt-failure-ui-icon';

    id.html('<p><span class="' + iconClass + '"></span>' + textMessage
        + '<div class="report-id-details">' + reportId + '</div></p>');

    id.dialog({
      resizable : false,
      height : "auto",
      title : 'BIRT Report Error',
      width : 400,
      modal : true,
      buttons : [ {
        text : "OK",
        click : function() {
          window.location.href = '<%=contextPath%>';
          $(this).dialog("close");
        }
      } ]
    });
  }
</script>

</head>

<body>
  <div id="report-main">
    <div>
      <h1 class="entry-title">
        <img alt="Smarter Balanced Assessment Consortium"
          style="width: 183px !important;"
          title="Smarter Balanced Assessment Consortium"
          src="<%=contextPath%>/Shared/images/SmarterBalanced_logo.png" /> <span>
          &nbsp;&nbsp;Browser Implementation Readiness Test (BIRT)
          Report </span> <span id="versionInfo" class="version-details"></span>
      </h1>
      <p align="right">


        <a href="#" id="irtHome">Home</a> <span>|</span> <a
          href="javascript:location.reload(true);">Reload</a>  <span
          id="seperatorPrint">|</span> <a href="#"
          id="printReport"  onclick="javascript:window.print()">Print</a>  <span
          id="separator" style="display: none;">|</span> <a href="#"
          id="closeBrowser" style="display: none;">Close</a>
      </p>


    </div>

    <div class="border-details">
      <div class="header-irt-report" id="reportInfo">Info</div>
      <div class="divTable-report">
        <div class="divTableBody">

          <div class="divTableRow">
            <div class="divTableCell" id="name">
              <b>Name:</b>
            </div>
            <div class="divTableCell" id="email">
              <b>Email:</b>
            </div>
            <div class="divTableCellReport" id="testDate">
              <b>Test Date:</b>
            </div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell" id="organization">
            <b>Organization:</b>
            </div>
            <div class="divTableCell" id="irtVersion">
              <b>BIRT Version:</b>
            </div>
             <div class="divTableCellReport" id="optionalScoring">
              <b>Scores include optional tests?</b>
            </div>
          </div>
          <div class="divTableRow" id="browserInfo">
            <b>Browser Info:</b>
              
          </div>
            <div class="divTableRow" id="specInfo">
            <b>Browser API Specification Used for Manual Testing: </b>
              
          </div>

        </div>
      </div>
    </div>


    <div>&nbsp;</div>
    <div class="header-irt" id="browserAPI">Browser API</div>
    <div id="jsGrid"></div>




    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div class="header-irt" id="textToSpeechAPI">Text-to-speech</div>
    <div id="jsTTSGrid"></div>


  <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div class="header-irt" id="audioAPI">Audio Recorder</div>
    <div id="jsAudioRecorderGrid"></div>

    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div id="html5TestMain">
      <div class="header-ext" id="html5TestHeader">HTML5 Test</div>
      <div id="jsHTML5TestGrid"></div>
    </div>


    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div id="css3TestMain">
      <div class="header-ext" id="css3TestHeader">CSS3 Test</div>
      <div id="jsCSS3TestGrid"></div>
    </div>


    <div id="reportInfoDialog"></div>

  </div>
</body>
</html>