(function () {
    library.getID('view').redirect().road('/', './views/home.html', null, null)
           .road('/crear-contacto', './views/publication/create.html', null, null)
           .road('/leer-contacto', './views/publication/read.html', null,null)
           .road('/actualizar-contacto', './views/publication/update.html',null,null)
})();