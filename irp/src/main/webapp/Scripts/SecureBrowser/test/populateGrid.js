function populateResults(id, gridData, extTest) {
  var extCss = '';
  var showCSS = 'irt-grid-column-wrap';
  var detailTitle = 'Details';
  var detailWidth = 150;
  var testNameWidth = 150;
  var detailAlign = "left";

  var cntxPath = getContextPath();

  if (extTest === true) {
    extCss = 'irt-grid-column-hide';
    detailTitle = 'Score';
    detailWidth = 50;
    testNameWidth = 100;
    detailAlign = "center";
  }
  id
      .jsGrid({
        width : "100%",
        data : gridData,
        selecting : false,
        fields : [
            {
              title : "Test Name",
              name : "testName",
              type : "text",
              width : testNameWidth,
              css : showCSS
            },
            {
              title : "Test API",
              name : "testApi",
              type : "text",
              width : 150,
              css : showCSS + ' ' + extCss
            },
            {
              title : "Result",
              name : "testResult",
              type : "text",
              width : 45,
              align : "center",
              css : showCSS,

              itemTemplate : function(value, item) {

                // alert(item);
                var isRequired = true;
                if (item != null && item != undefined && item.required != null
                    && item.required != undefined && item.required.all != null
                    && item.required.all != undefined && !item.required.all) {
                  isRequired = false;
                }

                if (value == null) {
                  return '<img alt="Test not performed by user" title="Test not performed by user" src="'
                      + cntxPath
                      + '/Shared/images/question_blue.png" id="result-icon">';
                } else if (isRequired === true && value === true) {
                  return '<img alt="Required test passed" title="Required test passed" src="'
                      + cntxPath
                      + '/Shared/images/button-check_green.png" id="result-icon">';
                } else if (isRequired === true && value === false) {
                  return '<img alt="Required test failed" title="Required test failed" src="'
                      + cntxPath
                      + '/Shared/images/button-cross_red.png" id="result-icon">';
                } else if (isRequired === false && value === true) {
                  return '<img alt="Optional test passed" title="Optional test passed" src="'
                      + cntxPath
                      + '/Shared/images/button-check_yellow.png" id="result-icon">';
                } else if (isRequired === false && value === false) {
                  return '<img alt="Optional test failed" title="Optional test failed" src="'
                      + cntxPath
                      + '/Shared/images/button-cross_yellow.png" id="result-icon">';
                } else {
                  return value;
                }

              }

            }, {
              title : detailTitle,
              name : "details",
              type : "text",
              align : detailAlign,
              width : detailWidth,
              css : showCSS,
              itemTemplate : function(value) {
                if (value == null) {
                  return "Not Available";
                } else {
                  return value;
                }

              }
            }, {
              title : 'Points',
              name : "testPoints",
              type : 'number',
              width : 15,
              css : 'irt-grid-column-hide'
            } ]
      });

}

function getContextPath() {
  return $.cookie("contextPath");
}

function populateSectionCount(currHeaderId, rTestPass, rTestFail, oTestPass,
    oTestFail, totalTest) {
  $.ajax({
    url : "apisectioncount.html",
    success : function(result) {
      var countStaticHtml = result;
      var cntxPathRegex = /contextPath/g;
      countStaticHtml = countStaticHtml
          .replace(cntxPathRegex, getContextPath());
      countStaticHtml = countStaticHtml.replace('requiredPassCount', rTestPass
          + "/" + (rTestPass + rTestFail));
      countStaticHtml = countStaticHtml.replace('requiredFailCount', rTestFail
          + "/" + (rTestPass + rTestFail));
      countStaticHtml = countStaticHtml.replace('optionalPassCount', oTestPass
          + "/" + (oTestPass + oTestFail));
      countStaticHtml = countStaticHtml.replace('optionalFailCount', oTestFail
          + "/" + (oTestPass + oTestFail));

      countStaticHtml = countStaticHtml.replace('notperformedCount', 0 + "/"
          + (rTestPass + rTestFail));

      $('#' + currHeaderId[0].id + ' #scoreHTML').append(countStaticHtml);

    }
  });
}

function openSmarterLinkDialog(id, testTitle, url) {

  var iframe = $('<iframe id="'
      + id
      + '" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');

  isManualTestSupported = true;

  id = $("<div id='" + id + "'></div>").append(iframe).appendTo("body");

  var dialogWidth = '90%';
  var dialogHeight = 800;

  id.dialog({
    autoOpen : false,
    width : dialogWidth,
    height : dialogHeight,
    modal : true,
    title : testTitle,
    position : {
      my : "center",
      at : "center",
      of : window
    },
    buttons : [ {
      text : "OK",
      click : function() {
        $(this).dialog("close");
      }

    } ]
  });

  iframe.attr({
    src : url,
    width : '100%',
    height : '100%'
  });

  id.dialog("open");
}