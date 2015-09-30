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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("posts", function(limit) {
    return Posts.find({
      author: this.userId
    }, {limit: limit || 10, sort: {createdAt: -1}});
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
