Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Meteor.subscribe("posts");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("posts", function() {
    return Posts.find({
      author: this.userId
    });
  });

  Meteor.methods({
    addPost: function(content) {
      if (!Meteor.user()) {
        throw new Error("Cannot post as user is not logged in!")
      }

      Posts.insert({
        author: Meteor.userId(),
        content: content,
        createdAt: Date.now()
      });
    }
  });
}
