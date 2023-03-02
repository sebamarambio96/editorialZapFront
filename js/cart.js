fetch("http://18.223.117.204/products")
    .then((resp) => resp.json())
    .then(data => {
        const productos = data
        let carritoGuardado = JSON.parse(localStorage.getItem('compras'))

        function pintarCarro() {
            const templateCarritoContenido = document.getElementById('templateCarritoContenido').content
            const templateCarritoTotal = document.getElementById('templateCarritoTotal').content
            const contenedorCarro = document.getElementById('contenedorCarro')
            const fragmentCarro = document.createDocumentFragment()

            while (contenedorCarro.firstChild) {
                contenedorCarro.removeChild(contenedorCarro.firstChild);
            }


            carritoGuardado.forEach(producto => {
                let idProducto = templateCarritoContenido.getElementById('idProducto')
                let cantidadProducto = templateCarritoContenido.getElementById('cantidadProducto')
                let nombreProducto = templateCarritoContenido.getElementById('nombreProducto')
                let precioProducto = templateCarritoContenido.getElementById('precioProducto')
                let botonPlus = templateCarritoContenido.getElementById('botonPlus')
                let botonMinus = templateCarritoContenido.getElementById('botonMinus')
                botonPlus.dataset.id = producto.id
                botonMinus.dataset.id = producto.id
                cantidadProducto.dataset.id = producto.id
                idProducto.textContent = producto.id
                cantidadProducto.textContent = producto.cantidad
                nombreProducto.textContent = producto.name
                precioProducto.textContent = `$ ${producto.price * producto.cantidad}`

                const clone = templateCarritoContenido.cloneNode(true)
                fragmentCarro.appendChild(clone)
            })

            contenedorCarro.appendChild(fragmentCarro)

        }

        function pintarTotal() {
            const templateCarritoContenido = document.getElementById('templateCarritoTotal').content
            const totalCarro = document.getElementById('totalCarro')
            const fragmentCarro = document.createDocumentFragment()
            let contador = JSON.parse(localStorage.getItem('contador'))
            while (totalCarro.firstChild) {
                totalCarro.removeChild(totalCarro.firstChild);
            }

            let cantidadTotal = templateCarritoContenido.getElementById('cantidadTotal')
            let totalPrecio = templateCarritoContenido.getElementById('totalPrecio')
            cantidadTotal.textContent = contador
            let total = 0
            carritoGuardado.map((producto) => {
                let sumaProducto = producto.price * producto.cantidad
                total += sumaProducto
            })
            totalPrecio.textContent = `$ ${total}`

            const clone = templateCarritoContenido.cloneNode(true)
            fragmentCarro.appendChild(clone)
            totalCarro.appendChild(fragmentCarro)
            sendOrder()
        }
        function vaciarCarro() {
            const botonVaciar = document.getElementById('botonVaciar')
            botonVaciar.addEventListener('click', () => {
                localStorage.clear()
                location.reload()
            })
        }



        pintarTotal()
        pintarCarro()

        //Modificar Carrito

        let carrito = {}
        if (carritoGuardado == null) {
            carrito = {}
        } else {
            carritoGuardado.map(producto => {
                carrito[producto.id] = { ...producto }
            })
        }

        let arrayCompras = []
        const detectarBotonesPlus = (productos) => {
            let botones = document.querySelectorAll('#botonPlus')
            botones.forEach(btn => {
                btn.addEventListener('click', () => {
                    let producto = {}
                    producto = productos.find(item => item.id == btn.dataset.id)
                    producto.cantidad = 1
                    if (carrito.hasOwnProperty(producto.id)) {
                        producto.cantidad = carrito[producto.id].cantidad + 1
                    }
                    carrito[producto.id] = { ...producto }
                    arrayCompras = Object.values(carrito)
                    let contadorInterno = 0
                    arrayCompras.map(producto => {
                        contadorInterno += producto.cantidad
                    })
                    localStorage.setItem('compras', JSON.stringify(arrayCompras))
                    localStorage.setItem('contador', JSON.stringify(contadorInterno))
                    localStorage.setItem('carrito', JSON.stringify(carrito))
                    carritoGuardado = JSON.parse(localStorage.getItem('compras'))
                    pintarCarro()
                    detectarBotonesPlus(productos)
                    detectarBotonesMinus(productos)
                    pintarTotal()
                    vaciarCarro()
                })
            })
        }

        const detectarBotonesMinus = (productos) => {
            let botones = document.querySelectorAll('#botonMinus')
            botones.forEach(btn => {
                btn.addEventListener('click', () => {
                    let producto = {}
                    producto = productos.find(item => item.id == btn.dataset.id)
                    producto.cantidad = 1
                    if (carrito.hasOwnProperty(producto.id)) {
                        producto.cantidad = carrito[producto.id].cantidad - 1
                    }
                    if (producto.cantidad <= 0) {
                        producto.cantidad = 0
                    }
                    carrito[producto.id] = { ...producto }
                    arrayCompras = Object.values(carrito)


                    let contadorInterno = 0
                    arrayCompras.map(producto => {
                        contadorInterno += producto.cantidad
                    })
                    localStorage.setItem('compras', JSON.stringify(arrayCompras))
                    localStorage.setItem('contador', JSON.stringify(contadorInterno))
                    localStorage.setItem('carrito', JSON.stringify(carrito))
                    carritoGuardado = JSON.parse(localStorage.getItem('compras'))
                    pintarCarro()
                    detectarBotonesPlus(productos)
                    detectarBotonesMinus(productos)
                    pintarTotal()
                    vaciarCarro()
                })
            })
        }


        detectarBotonesPlus(productos)
        detectarBotonesMinus(productos)
        vaciarCarro()

    })

    .catch()

/* SEND order */
const containerFormCard = document.getElementById('containerFormCard')
const templateOrder = document.getElementById('templateOrder').content;
const fragmentForm = document.createDocumentFragment()

function sendOrder() {
    const btn = document.getElementById('btnSendOrder')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        //GET data
        let carritoGuardado = JSON.parse(localStorage.getItem('compras'))
        let items = carritoGuardado.map(item => {
            return {
                idProduct: item.id,
                amount: item.cantidad
            }
        })
        let inputNameCart = document.getElementById('inputNameCart').value
        let inputTRutCart = document.getElementById('inputTRutCart').value
        let inputEmailCart = document.getElementById('inputEmailCart').value
        let inputAddressCart = document.getElementById('inputAddressCart').value
        let total = 0
        carritoGuardado.map((producto) => {
            let sumaProducto = producto.price * producto.cantidad
            total += sumaProducto
        })
        let totalPrice = total
        // Clear dots
        let newRut = inputTRutCart.replace('.', '');
        newRut = newRut.replace('.', '');
        // Clear script
        newRut = newRut.replace('-', '');

        const data = {
            name: inputNameCart,
            rut: newRut,
            email: inputEmailCart,
            address: inputAddressCart,
            totalPrice,
            items
        }
        console.log(data)
        if (!Object.values(data).every(value => value != '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes rellenar todos los campos!'
            })
        } else if (data.rut.length >= 10) {
            console.log(data.rut)
            console.log(data.rut.length)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El rut ingresado no es valido'
            })
        } else {
            fetch(`http://18.223.117.204/addOrder/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(res => {
                    console.log(res)
                    //PINTAR ORDEN
                    const templateOrder = document.getElementById('templateOrder').content
                    const responseOrderContainer = document.getElementById('responseOrderContainer')
                    const fragmentOrder = document.createDocumentFragment()
                    while (responseOrderContainer.firstChild) {
                        responseOrderContainer.removeChild(responseOrderContainer.firstChild);
                    }
                    let idInvoiceOrder = templateOrder.getElementById('idInvoiceOrder')
                    let clientName = templateOrder.getElementById('clientName')
                    let clientRUT = templateOrder.getElementById('clientRUT')
                    let clientEmail = templateOrder.getElementById('clientEmail')
                    let clientAddress = templateOrder.getElementById('clientAddress')
                    let invoiceDate = templateOrder.getElementById('invoiceDate')
                    let totalInvoice = templateOrder.getElementById('totalInvoice')
                    clientName.textContent = res.newClient.name
                    idInvoiceOrder.textContent = `${res.newInvoice.id}`
                    clientRUT.textContent = res.newClient.rut
                    clientEmail.textContent = res.newClient.email
                    clientAddress.textContent = res.newClient.address
                    invoiceDate.textContent = res.newInvoice.createdAt.slice(0, 10)
                    totalInvoice.textContent = res.newInvoice.totalPrice
                    const clone = templateOrder.cloneNode(true)
                    fragmentOrder.appendChild(clone)
                    responseOrderContainer.appendChild(fragmentOrder)
                })
                .catch(err => console.log(err))
        }
    })
}

