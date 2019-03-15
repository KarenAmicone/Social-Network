(function () {
    
    library.getID('view').redirect().road('/', './views/home.html', null, null)
           .road('/crear-contacto', 
                 './views/publication/create.html', 
                 'contact', 
                 function(){
                    library.getID('create-contact').noSubmit();
                 })
           .road('/leer-contacto', './views/publication/read.html', 'contact', null)
           .road('/actualizar-contacto', './views/publication/update.html','contact',null)
})();