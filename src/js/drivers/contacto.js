//Este archivo tiene como nombre el mismo que el del controlador
(function () {
    //Crea el controlador
    var num = 0; //Esta variable es para darle un numero a cada registro
    library.fnController ('contact', {
        contacto: {},
        contactos: [],

        create: function (page) {
            this.contacto.name = page.name.value;
            this.contacto.mail =  page.mail.value;
            this.contacto.birthday = page.birthday.value;
            num =  num + 1;
            this.contacto.identifier = num;
            //Agrega los contactos al arreglo contactos
            this.contactos.push(this.contacto);
            this.contacto = {};
            alert('Contacto creado con el id: '+num);
            //Limpia el formulario después de enviarlo
            page.reset();
        },


        delete: function () {},
        update: function () {},
        read: function () {
            var bodyC = library.get('table-body'),
                template = library.get('row'),
                fragment = document.createDocumentFragment(),
                i = 0,
                max = this.contactos.length,
                register;

        }

    }); 
})();