(function () {
    const authRoot = firebase.auth();
    const dbRoot = firebase.database();
    const storageRootRef = firebase.storage().ref();
    const warningPop = document.getElementById('warning');
    var userName, userMail, userPic, userFile;
    function refreshPage() {
        window.location.reload();
    };

    authRoot.onAuthStateChanged(function (user) {
        if (user) {
            var feedDirectory = dbRoot.ref('latest/');
            feedDirectory.on('child_added', snap => {
                var d = new Date(snap.child("time").val());
                var n = d.getDate();
                var m = d.getMonth() + 1;
                var y = d.getFullYear();
                var hour = d.getHours();
                var minute = d.getMinutes();
                var second = d.getSeconds();
                var publishedOn = n + "/" + m + "/" + y + " (" + hour + ":" + minute + ":" + second + ")";
                $('#mainFeed').prepend('<a id="' + snap.key + '" class="card mb-3 text-dark zoom" target="_blank"><div class="row no-gutters"><div class="col-4 p-md-3 d-flex align-items-center"><img src="' + snap.child("photo").val() + '" class="card-img rounded-circle" alt="User"></div><div class="col-8"><div class="card-body"><h5 class="card-title">' + snap.child("title").val() + '</h5><p class="card-text">' + snap.child("description").val() + '</p><p class="card-text"><small class="text-muted">' + publishedOn + ' by ' + snap.child("name").val() + '</small></p></div></div></div></a>');
                $("#" + snap.key).on('click', function () {
                    console.log($("#documentRender").children(''));
                    $('#documentModal').modal('show');
                    $('#documentTitle').text(snap.child('title').val());
                    $("#documentModal").on('hide.bs.modal', function(){
                        $("#documentRender").empty();
                    });
                    var pdfjsLib = window['pdfjs-dist/build/pdf'];
                    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
                    var loadingPDFDoc = pdfjsLib.getDocument(snap.child('link').val());
                    loadingPDFDoc.promise.then(function (doc) {
                        for (var i = 1; i <= doc._pdfInfo.numPages; i++) {
                            $("#documentRender").append('<canvas id="'+ i +'"></canvas>');
                            canvas = document.getElementById(i)
                            renderPage(i, canvas);
                        };
                        function renderPage(pageNumber, canvas) {
                            doc.getPage(pageNumber).then(function (page) {
                                var viewport = page.getViewport({scale: 1});
                                canvas.height = viewport.height;
                                canvas.width = viewport.width;
                                var renderTask = page.render({canvasContext: canvas.getContext('2d'),viewport: viewport});
                                renderTask.promise.then(function(){});
                            });
                        };
                    });
                });
            });
        } else {
            window.location.replace('../index.html');
        }
    })
}());