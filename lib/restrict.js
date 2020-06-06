$(".full").css({"min-height": $(window).height(),"max-width": $(window).width(),"padding-top": $(window).height() / 3,});
var firebaseConfig = {
    apiKey: "AIzaSyC9JnWJfksbC9JFT6-160VgrkU3JTZnTPk",
    authDomain: "restrictedauthmasko.firebaseapp.com",
    databaseURL: "https://restrictedauthmasko.firebaseio.com",
    projectId: "restrictedauthmasko",
    storageBucket: "restrictedauthmasko.appspot.com",
    messagingSenderId: "301471552506",
    appId: "1:301471552506:web:24b9cbf89c97c51997ca43"
};
firebase.initializeApp(firebaseConfig);
const authRoot = firebase.auth();
const btnRegis = document.getElementById('submit');
const emailRegis = document.getElementById('email');
const passRegis = document.getElementById('password');
const warningPop = document.getElementById('warning');
btnRegis.addEventListener('click', e => {
    const mail = emailRegis.value;
    const pass = passRegis.value;
    const promise = authRoot.signInWithEmailAndPassword(mail, pass);
    promise.catch(function (e) {
        warningPop.innerHTML = e.message;
        if (e.message != '') {
            warningPop.classList.add('show');
        } else {
            warningPop.classList.remove('show');
        }
    });
});
authRoot.onAuthStateChanged(function (user) {
    if (user) {
        $('.full').remove();
        window.location.replace('lib/restrict.php');
    }
});
authRoot.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function () {
    return authRoot.signInWithEmailAndPassword(emailRegis.value, passRegis.value)
});