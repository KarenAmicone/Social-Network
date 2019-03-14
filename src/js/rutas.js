(function(window, document){
window.libraryMe.getID('view').enrutar().path('/', 'views/inicio.html', null, null);
window.libraryMe.getID('view').enrutar().path('/create-post', 'views/post/create.html', null, null);
window.libraryMe.getID('view').enrutar().path('/read-post', 'views/post/read.html', null, null);
window.libraryMe.getID('view').enrutar().path('/update-post', 'views/post/update.html', null, null);
})(window, document);