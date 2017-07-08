$(document).ready(function () {

    // Example 1: Select all "odd tr's and make their td's a different background color:

    $("#table1 tr:odd td").css("background-color", "#c8eaf4");

    // Example 2: wire up events to highlight all td elements for a row when the mouse is over it
    
    $("#table2").on("mouseenter", "tr", function(){
       $(this).children("td").css("background-color", "#c8eaf4");
    });

    $("#table2").on("mouseleave", "tr", function(){
       $(this).children("td").css("background-color", "#fff");
    });

    // You could also use following code instead:

   /* $("#table2").on({
        mouseenter: function () {
            $(this).children("td").css("background-color", "#c8eaf4");
        },
        mouseleave: function () {
            $(this).children("td").css("background-color", "#fff");
        }}
    ,"tr");*/

    // Example 3: wire up the AJAX button to call "ajaxPost" on click

    $("#ajaxBtn").on("click", function () {
        $.ajax({
            url: "https://httpbin.org/post",
            type: "POST",
            data: JSON.stringify({ user: "John Doe", job: "unknown" }),
            contentType: "application/json"
        })
        .done(function (data) {
            $("#ajaxResult").replaceWith("<div class='well'>success: " + JSON.stringify(data.json) + "</div>");
        })
        .fail(function (err) {
            $("#ajaxResult").replaceWith("<div class='well'>error: " + err.statusText + "</div>");
        });
    });

});
