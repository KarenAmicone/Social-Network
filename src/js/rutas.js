(function (window, document) {
        libreria.getID('vista').enrutar()
                .ruta('/', './vistas/login.html', 'controlador', window.manejador.login)
                //Este es el muro
                .ruta('/muro', './vistas/muro.html', 'controlador', window.manejador.logOut)
                //Este es el perfil
                .ruta('/perfil', './vistas/perfil.html', 'controlador',window.manejador.perfil)


})(window, document);