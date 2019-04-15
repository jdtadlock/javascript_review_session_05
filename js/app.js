var db = firebase.database();
var auth = firebase.auth();
var is_register = false;
var uid;

function showAuthView(logged_in, email) {
  if (logged_in) {
    $('form').hide();
    $('header #login').hide();
    $('header #user-email').text(email);
    $('#logout').show();
  } else {
    $('form').show();
    $('header #login').show();
    $('header #user-email').hide();
    $('#logout').hide();
  }


}

function loginOrRegister(event) {
  event.preventDefault();

  var email = $('#email').val().trim();
  var password = $('#password').val().trim();
  var confirm_pass = $('#confirm').val().trim();
  var full_name = $('#name').val().trim();
  var info = $('#info').val().trim();

  // if (password !== confirm_pass) {
  //   return showPasswordConfirmationError();
  // }

  if (!is_register) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(function (data) {
        db.ref('users').child(data.user.uid).set({
          email: email,
          fullName: full_name,
          info: info
        })
      })
      .catch(function () {

      })
  } else {
    auth.signInWithEmailAndPassword(email, password)
      .then(function (data) {
        showAuthView(true, data.user.email);
      })
      .catch(function () {

      });
  }
}

function toggleRegisterState() {
  $('.toggle span').toggleClass('toggled');

  if (is_register) {
    $('form h3').text('Sign Up');
    $('form #confirm').show();
  } else {
    $('form h3').text('Log In');
    $('form #confirm').hide();
  }

  is_register = !is_register;
}

function checkAuthState() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      uid = firebase.auth().currentUser.uid;

      showAuthView(true, user.email);

      db.ref('/users/' + user.uid).once('value', function (ref) {
        console.log(ref.val());
      })
    } else {
      showAuthView(false, null);
    }
  });
}


function logUserOut() {
  firebase.auth().signOut().then(function () {
    showAuthView(false, null);
  }).catch(function (error) {
    // An error happened.
  });
}

function init() {
  $('#submit').on('click', loginOrRegister);
  $('#toggle-btn').on('click', toggleRegisterState);
  $('#logout').on('click', logUserOut);
  checkAuthState();
}

// Start The App
init();

















// Store DATA
// Create and manage Users

// db.ref('awesome').push({
//   name: 'JD',
//   is_awesome: null
// });



// var users = {
//   'dPTpKCqFlWezbCM9ioVfHTxGzPE3': {
//     name: 'JD',
//     email: 'jd@test.com'
//   }
// }





























// function test() {
//   return {
//     printNum: function (num) {
//       console.log(num);
//     }
//   };
// }

// var result = test();

// console.log(result);

// result.printNum(10020523);

// var result = 'blah';
