FlowRouter.route('/', {
  action: function () {  	
  	BlazeLayout.render('mainLayout', {content: 'hello'});
  },
  name: "Main"
});