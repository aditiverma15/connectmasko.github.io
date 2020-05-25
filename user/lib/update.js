// contentType: 'application/pdf'
(function(){
    const authRoot = firebase.auth();
    const dbRoot = firebase.database();
    const storageRootRef = firebase.storage().ref();
    const warningPop = document.getElementById('warning');
    var userName, userMail, userPic, userFile;
    function refreshPage(){
        window.location.reload();
    };
    function displayWarning() {
        warningPop.innerHTML = e.message;
        if (e.message != '') {
            warningPop.classList.add('show');
            warningPop.classList.add('fixed-bottom');
        } else {
            warningPop.classList.remove('show');
            warningPop.classList.remove('fixed-bottom');
        }
    };
    authRoot.onAuthStateChanged(function(user){
        if(user){
            var feedDirectory = dbRoot.ref('latest/');
            feedDirectory.on('child_added', snap => {
                var publishedOn = Date(snap.child("time").val());
                $('#mainFeed').prepend('<a href="'+ snap.child("link").val() +'" class="card mb-3 text-dark" target="_blank"><div class="row no-gutters"><div class="col-4 p-md-3 d-flex align-items-center"><img src="' + snap.child("photo").val() + '" class="card-img rounded-circle" alt="User"></div><div class="col-8"><div class="card-body"><h5 class="card-title">' + snap.child("title").val() + '</h5><p class="card-text">' + snap.child("description").val() + '</p><p class="card-text"><small class="text-muted">' + publishedOn + ' by ' + snap.child("name").val() + '</small></p></div></div></div></a>');
            });
        } else {
            window.location.replace('../index.html');
        }
    })
}())