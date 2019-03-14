/* ((window, document)=>{
library.getID('view').enrutar()
.path('/', 'views/inicio.html', null, null)
.path('/create-post', 'views/post/create.html', null, null)
.path('/read-post', '/views/post/read.html', null, null)
.path('/update-post', '/views/post/update.html', null, null);
})(window, document); */

((window)=> {
libraryMe.getID('view').enrutar()
.path('/', 'views/inicio.html', null, null)
})(window);