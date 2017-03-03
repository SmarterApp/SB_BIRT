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

<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Shared/irt.css" />
<script type="text/javascript">
  $(document).ready(
      function() {
        
        $.removeCookie("name");
        $.removeCookie("emailId");
        $.removeCookie("browserDetails");
        $.removeCookie("organization");
        $.removeCookie("reportId");
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
              window.location.href = cntxPath + "/Scripts/SecureBrowser/test/index.html";
            });
        
        $('#getIRTResult').click(
            function(event) {    
              event.preventDefault();
              $.cookie("reportId",  $('#reportId').val());
              window.location.href = cntxPath + "/Scripts/SecureBrowser/test/report.html";
            });
        
      });
</script>
</head>
<body>

  <div id="main">

    <div>

      <h1 class="entry-title">
        <img alt="Smarter Balanced Assessment Consortium"
          style="width: 183px !important;"
          src="<%=contextPath%>/Shared/images/SmarterBalanced_logo.png" />
        <span> &nbsp;&nbsp;Secure Browser Implementation
          Readiness Test (IRT) </span>
      </h1>
    </div>

    <form>

      <div class="divTable" id="left-intro-section">
        <div class="divTableBody">
        
        
          <div class="divTableRow" >
                <div id="instruction">
                <p style="padding: 4px;">To test your current browser against the IRT, please optionally enter any of the information below then press <strong>Begin IRT Test</strong>.</p>
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
              <input type="text" name="emailId" id="emailId">
            </div>
          </div>
          <div class="divTableRow">&nbsp;</div>
          <div class="divTableRow">
            <div class="divTableCell">Browser Info:</div>
            <div class="divTableCellRight">
            <textarea id="browserDetails" name="browserDetails" cols="40" rows="3" style="resize: none;"></textarea>           
            </div>
          </div>
          <div class="divTableRow">&nbsp;</div>
          <div class="divTableRow" align="center">
            <button id="beginIRTTest"></button>
          </div>
        </div>
      </div>


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


            <button id="getIRTResult"></button>

          </div>

        </div>
      </div>

    </form>
  </div>

</body>
</html>