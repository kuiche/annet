Template.login.events({
  "click #logout": function() {
    Meteor.logout();
  },
  "click #login-goog": function() {
    Meteor.loginWithGoogle();
  }
});