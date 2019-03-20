(function(window, document){
    libreria.getID('vista').enrutar()
        .ruta('/', './index.html', null, null)
        
           .ruta('/','./vistas/inicio.html', 'firebase', function(){
                   _.getID('perfil').noSubmit();
           })
           .ruta('/crear-contacto', './vistas/crear.html', 'contacto', function(){
                   _.getID('crearContacto').noSubmit();
           })
           .ruta('/listar-contactos', 
           './vistas/listar.html',
           'contacto', function(){
                   _.getCtrl().listar();
           })
           .ruta('/actualizar-contactos', './vistas/actualizar.html', 'contacto', function(){
                   _.getID('frmActualiza').noSubmit();
                   _.getCtrl().preparaActualizacion();
           })
   
   })(window,document);