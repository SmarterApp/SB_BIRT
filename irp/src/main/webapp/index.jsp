
<%
  String contextPath = request.getContextPath();
			//response.sendRedirect(contextPath + "/Scripts/SecureBrowser/test/index.html");
%>


<!DOCTYPE html>
<html>
<head>

<!-- JQuery -->
<script src="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-3.1.1.js"></script>
<script
  src="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui-1.12.js"></script>

<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui.css" />
<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui.structure.css" />
<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Scripts/Libraries/jQuery/jquery-ui.theme.css" />

<link type="text/css" rel="stylesheet"
  href="<%=contextPath%>/Shared/irt.css" />
<script type="text/javascript">
  $(document).ready(function() {

    $('#beginIRTTest').button({
      label : 'Begin IRT Test'
    });
    
    $('#getIRTResult').button({
      label : 'GET IRT Test Result'
    });

    $('#beginIRTTest').click(function(event) {
      // prevent the default event behaviour    
      event.preventDefault();

      $.ajax({
          url: "<%=contextPath%>/report/startTest",
          type: "POST",
           data: { 'name': $('#name').val() ,'emailId' : $('#emailId').val(), 'browserDetails' : $('#browserDetails').val()}, 
          success: function (data) {

            window.location.href = "<%=contextPath%>/Scripts/SecureBrowser/test/index.html";

                          },
                            error : function() {
                              alert("An error has occured!!!");
                            }
                          });
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
      <div class="divTable" style="float: left; width: 50%;">
        <div class="divTableBody">

          <div class="divTableRow">
            <div class="divTableCell">Name:</div>
            <div class="divTableCellRight">
              <input type="text" name="name" id="name">
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
              <input type="text" name="browserDetails"
                id="browserDetails">
            </div>
          </div>
          <div class="divTableRow">&nbsp;</div>
          <div class="divTableRow">
            <button id="beginIRTTest"></button>
          </div>


        </div>
      </div>

      <div class="divTable" style="float: right; width: 50%;">

        <div class="divTableBody">

          <div class="divTableRow">
            <div class="divTableCell">Report Id:</div>
            <div class="divTableCellRight">
              <input type="text" name="reportId" id="reportId">
            </div>
          </div>
          <div class="divTableRow">&nbsp;</div>

          <div class="divTableRow">


            <button id="getIRTResult"></button>

          </div>

        </div>
      </div>

    </form>
  </div>

</body>
</html>