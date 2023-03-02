
fetch("http://18.223.117.204:3000/products")
    .then((resp) => resp.json())
    .then(data => {

        const productos = data
        console.log(productos)

        const containerHorror = document.getElementById('containerHorror')
        const fragment = document.createDocumentFragment()
        const template = document.getElementById('templateProducto').content;
        /* console.log(template); */

        const horror = productos.filter(product => product.id_category == 1)
        horror.forEach(producto => {
            let imgProducto = template.getElementById('imgProducto')
            let autorProducto = template.getElementById('autorProducto')
            let tituloProducto = template.getElementById('nombreProducto')
            let precioProducto = template.getElementById('precioProducto')
            let botonAgregar = template.getElementById('agregarProducto')
            let botonDetalles = template.getElementById('detallesProducto')
            botonAgregar.dataset.id = producto.id
            botonDetalles.dataset.id = producto.id
            imgProducto.src = producto.img
            imgProducto.alt = producto.nanme
            autorProducto.textContent = producto.author
            tituloProducto.textContent = producto.name
            precioProducto.textContent = `$ ${producto.price}`
            const clone = template.cloneNode(true)

            fragment.appendChild(clone)
        })
        containerHorror.appendChild(fragment)

        const containerMangas = document.getElementById('containerMangas')
        const fragment2 = document.createDocumentFragment()
        const mangas = productos.filter(product => product.id_category == 3)
        mangas.forEach(producto => {
            let imgProducto = template.getElementById('imgProducto')
            let autorProducto = template.getElementById('autorProducto')
            let tituloProducto = template.getElementById('nombreProducto')
            let precioProducto = template.getElementById('precioProducto')
            let botonAgregar = template.getElementById('agregarProducto')
            let botonDetalles = template.getElementById('detallesProducto')
            botonAgregar.dataset.id = producto.id
            botonDetalles.dataset.id = producto.id
            imgProducto.src = producto.img
            imgProducto.alt = producto.nanme
            autorProducto.textContent = producto.author
            tituloProducto.textContent = producto.name
            precioProducto.textContent = `$ ${producto.price}`
            const clone = template.cloneNode(true)

            fragment2.appendChild(clone)
        })
        containerMangas.appendChild(fragment2)

        const containerJuvenil = document.getElementById('containerJuvenil')
        const fragment3 = document.createDocumentFragment()
        const juvenil = productos.filter(product => product.id_category == 2)
        juvenil.forEach(producto => {
            let imgProducto = template.getElementById('imgProducto')
            let autorProducto = template.getElementById('autorProducto')
            let tituloProducto = template.getElementById('nombreProducto')
            let precioProducto = template.getElementById('precioProducto')
            let botonAgregar = template.getElementById('agregarProducto')
            let botonDetalles = template.getElementById('detallesProducto')
            botonAgregar.dataset.id = producto.id
            botonDetalles.dataset.id = producto.id
            imgProducto.src = producto.img
            imgProducto.alt = producto.nanme
            autorProducto.textContent = producto.author
            tituloProducto.textContent = producto.name
            precioProducto.textContent = `$ ${producto.price}`
            const clone = template.cloneNode(true)

            fragment3.appendChild(clone)
        })
        containerJuvenil.appendChild(fragment3)

        //ITEM DETAIL
        const priceItemDetail = document.getElementById('priceItemDetail');
        const tittleItemDetail = document.getElementById('tittleItemDetail');
        const sku = document.getElementById('exampleModalLabel')
        const imgItemDetail = document.getElementById('imgItemDetail')
        const autorItemDetail = document.getElementById('autorItemDetail')
        const btnAddItemDetail = document.getElementById('btnAddItemDetail')
        const detectBtnDetail = (productos) => {
            const btn = document.querySelectorAll('#detallesProducto')
            btn.forEach(btn => {
                btn.addEventListener('click', () => {
                    let producto = {}
                    fetch(`http://18.223.117.204:3000/products/${btn.dataset.id}`)
                        .then((resp) => resp.json())
                        .then(data => {
                            const product = data
                            sku.textContent = `SKU: ${product.id}`
                            imgItemDetail.src = product.img
                            imgItemDetail.alt = product.name
                            autorItemDetail.textContent = product.author
                            tittleItemDetail.textContent = product.name
                            priceItemDetail.textContent = `$ ${product.price}`
                        })

                }
                )
            })

        }
        detectBtnDetail(productos)
        //CARRITO


        let carritoGuardado = JSON.parse(localStorage.getItem('compras'))
        let carrito = {}
        /* console.log(carrito) */
        if (carritoGuardado == null) {
            carrito = {}
        } else {
            carritoGuardado.map(producto => {
                carrito[producto.id] = { ...producto }
                /* console.log(carrito) */
            })
        }
        /* console.log(carrito) */


        let arrayCompras = []
        let contador = JSON.parse(localStorage.getItem('contador'))
        /* console.log(contador) */
        if (contador == null) {
            contador = 0
        } else if (contador !== null) {
            const contadorCompras = document.getElementById('contadorCompras')
            contadorCompras.textContent = contador
        }


        /* console.log(contador) */
        const detectarBotones = (productos) => {
            const botones = document.querySelectorAll('.card .agregar')
            botones.forEach(btn => {
                btn.addEventListener('click', () => {
                    let producto = {}
                    console.log(btn.dataset.id)
                    producto = productos.find(item => item.id == btn.dataset.id)
                    /* console.log(producto) */
                    producto.cantidad = 1
                    if (carrito.hasOwnProperty(producto.id)) {
                        producto.cantidad = carrito[producto.id].cantidad + 1
                        /* console.log(producto.cantidad) */
                    }

                    carrito[producto.id] = { ...producto }
                    /* console.log(carrito) */

                    arrayCompras = Object.values(carrito)
                    /* console.log(arrayCompras) */


                    /* console.log(carrito) */
                    let contadorInterno = 0
                    arrayCompras.map(producto => {
                        contadorInterno += producto.cantidad
                        /* console.log(producto.cantidad) */
                        /* console.log(contadorInterno) */
                    })
                    /* console.log(contador) */
                    /* console.log(contador + contadorInterno) */

                    const contadorCompras = document.getElementById('contadorCompras')
                    contadorCompras.textContent = `${contadorInterno}`

                    localStorage.setItem('contador', JSON.stringify(contadorInterno))
                    localStorage.setItem('compras', JSON.stringify(arrayCompras))
                    localStorage.setItem('carrito', JSON.stringify(carrito))
                })
            })

        }

        /*         let usuaria = JSON.parse(sessionStorage.getItem('user')) */
        detectarBotones(productos)

        const templateCompras = document.getElementById('templateCompras').content
        const containerCompras = document.getElementById('containerCompras')
        const fragmentCompras = document.createDocumentFragment()
        const btnCompras = document.getElementById('btnCompras');

        arrayCompras = JSON.parse(localStorage.getItem('compras'))
        /* console.log(arrayCompras) */
        if (arrayCompras !== null) {
            arrayCompras.map(producto => {
                /* console.log(producto) */
                let imgProducto = templateCompras.getElementById('imgProductoCompras')
                let cantidadProducto = templateCompras.getElementById('cantidadProductoCompras')
                let tituloProducto = templateCompras.getElementById('tituloProductoCompras')
                let precioProducto = templateCompras.getElementById('precioProductoCompras')
                imgProducto.src = producto.img
                imgProducto.alt = producto.name
                cantidadProducto.textContent = `Cantidad: ${producto.cantidad}`
                tituloProducto.textContent = producto.name
                precioProducto.textContent = `$ ${producto.price}`

                const clone = templateCompras.cloneNode(true)
                fragmentCompras.appendChild(clone)
            })
            containerCompras.appendChild(fragmentCompras)
        }

        btnCompras.addEventListener('click', () => {
            /* containerCompras.parentNode.removeChild(templateCompras) */
            while (containerCompras.firstChild) {
                containerCompras.removeChild(containerCompras.firstChild);
            }
            arrayCompras.map(producto => {
                /* console.log(producto) */
                let imgProducto = templateCompras.getElementById('imgProductoCompras')
                let cantidadProducto = templateCompras.getElementById('cantidadProductoCompras')
                let tituloProducto = templateCompras.getElementById('tituloProductoCompras')
                let precioProducto = templateCompras.getElementById('precioProductoCompras')
                imgProducto.src = producto.img
                imgProducto.alt = producto.name
                cantidadProducto.textContent = `Cantidad: ${producto.cantidad}`
                tituloProducto.textContent = producto.name
                precioProducto.textContent = `$ ${producto.price}`
                const clone = templateCompras.cloneNode(true)
                fragmentCompras.appendChild(clone)
            })
            containerCompras.appendChild(fragmentCompras)
        }
        )
    })
    .catch()