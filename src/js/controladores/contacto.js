(function(window,document){

    var consecutivo= 0;

    _.controlador('contacto', {
        contacto : {},
        contactos : [],
        crear: function(formulario){
            this.contacto.nombre = formulario.nombre.value;
            consecutivo= consecutivo + 1 ;
            this.contacto.identificador = consecutivo;
            this.contactos.push(this.contacto);
            this.contacto = {} ;
            alert("Contato creado con el id: " + consecutivo)
            formulario.reset();            
            
        },
        eliminar: function(id){
            var i = 0,max = this.contactos.length;
            if(confirm("Desea eliminar contacto?")){
                for(;i < max; i++){
                    if(parseInt(id,10) === this.contactos[i].identificador){
                        this.contactos.splice(i,1);
                        break;
                    }
                }
                this.listar();
            }
        },
        confirmaActualizar : function(id){
            var i = 0,max = this.contactos.length;
            if(confirm("Desea actualizar contacto?")){
                for(;i < max; i++){
                    if(parseInt(id,10) === this.contactos[i].identificador){
                        this.contacto = this.contactos[i];
                        break;
                    }
                }
                window.location.hash = '#/actualizar-contactos';
            }
        },

        preparaActualizacion : function(){
            var formulario = _.get('frmActualiza');
            formulario.identificador.value = this.contacto.identificador;
            formulario.nombre.value = this.contacto.nombre;
            formulario.correo.value = this.contacto.correo;

        },

        actualizar: function(formulario){
            var i = 0,max = this.contactos.length;

            this.contacto.nombre = formulario.nombre.value;
            this.contacto.correo = formulario.correo.value;
                for(;i < max; i++){
                    if(this.contacto.identificador === this.contactos[i].identificador){
                    this.contactos.splice(i,1);
                        break;
                    
                }
            }

            this.contactos.push(this.contacto);
            this.contacto = {};
            formulario.reset();
            alert("El contacto ha sido actualizado");
            window.location.hash = '#/listar-contactos' ;
        },
        listar:function(){
            var cuerpo = _.get('cuerpoTabla'),
                template = _.get('fila'),
                fragmento = document.createDocumentFragment(),
                i = 0,
                max = this.contactos.length,
                 nombre, correo,  acciones, eliminar, actualizar,
                 self = this;

            cuerpo.innerHTML = '';
            for(; i < max; i++){
                registro = self.contactos[i];

                clon = template.content.cloneNode(true);
                id = clon.querySelector('.identificador');
                nombre = clon.querySelector('.nombre');
                correo= clon.querySelector('.correo');

                acciones = clon.querySelector('.acciones');
                eliminar= acciones.querySelector('.eliminar');
                actualizar= acciones.querySelector('.actualizar');

                eliminar.dataset.id = registro.identificador;
                eliminar.addEventListener('click', function(e){
                    e.preventDefault();
                    self.eliminar(e.target.dataset.id);
                },false);

                actualizar.dataset.id = registro.identificador;
                actualizar.addEventListener('click',function(e){
                    e.preventDefault();
                    self.confirmaActualizar(e.target.dataset.id);
                },false);

                id.textContent = registro.identificador;
                nombre.textContent = registro.nombre;
                correo.textContent = registro.correo;
                // edad.textContent = registro.edad;
                // nacimiento.textContent = registro.nacimiento;

                fragmento.appendChild(clon);
            }
            cuerpo.appendChild(fragmento);
        }
    })
})(window, document);