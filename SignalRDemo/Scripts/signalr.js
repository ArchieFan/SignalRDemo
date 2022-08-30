//Immediately Invoked Function Expression

(function () {

    var chatHub = $.connection.chat;
   
    $.connection.hub.start()
        .done(function () {
            $.connection.hub.logging = true;
            writeToPage("It works!");
            $.connection.hub.log("Hub Connected!");
            chatHub.server.announcetoeverybody("Connected!");
            chatHub.server.getServerDateTime()
                .done(function (data) {
                    writeToPage(data);
                })
                .fail(function (e) {
                    writeToPage(e);
                });
        })
        .fail(function () {
            writeToPage("ERROR connecting to SignalR!")
        });

    chatHub.client.announce = function (message) {
        writeToPage(message);
    }

    var writeToPage = function (message) {
        $("#welcome-message").append(message + "<br>");
    }

    $("#click-me").on("click", function () {
        chatHub.server.getServerDateTime()
            .done(function (data) {
                writeToPage(data);
            })
            .fail(function (e) {
                writeToPage(e);
            });
    });

    //var x = 5;
    //var myfunction = function () {
    //    var x = 10;

    //}
    //myfunction();
    //console.log(x); // return 5
    //var myfunction = function () {
    //    return 10;

    //}
    //x = myfunction();
    //console.log(x); // return 10
})()


