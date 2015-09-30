Template.home.events({
  "submit #post-form": function(e) {
  	e.preventDefault();

  	Meteor.call("addPost", e.target.message.value);
  }
});

Meteor.subscribeWithPagination("posts", 5);

Template.home.helpers({
  posts: function () {
    // Find all posts and list the newest groups first
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});