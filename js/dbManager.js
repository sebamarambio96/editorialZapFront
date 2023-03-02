const containerForm = document.getElementById('containerForm')
const templateAdd = document.getElementById('templateAddProduct').content;
const templateModify = document.getElementById('templateModifyProduct').content;
const templateDelete = document.getElementById('templatDeleteProduct').content;
const fragmentForm = document.createDocumentFragment()
const categories = [0, 'Horror cósmico', 'Fantasía', 'Mangas']

//listen buttons to RENDER selected form
renderFormAdd()
renderFormModify()
renderFormDelete()

//Functions

function modifySearch() {
    const btn = document.getElementById('btnModifySearch')
    console.log(btn)
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const id = document.getElementById('idModify').value
        while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        }

        fetch(`http://18.223.117.204/products/${id}`)
            .then((resp) => resp.json())
            .then(data => {
                const product = data
                let nameModify = templateModify.getElementById('nameModify')
                let categoryModify = templateModify.getElementById('categoryModify')
                let priceModify = templateModify.getElementById('priceModify')
                let stockModify = templateModify.getElementById('stockModify')
                let urlModify = templateModify.getElementById('urlModify')
                id.value = product.id
                nameModify.value = product.name

                categoryModify.options[categoryModify.selectedIndex].text = categories[`${product.id_category}`]
                priceModify.value = product.price
                stockModify.value = product.stock
                urlModify.value = product.img
                const clone = templateModify.cloneNode(true)
                fragmentForm.appendChild(clone)
                containerForm.appendChild(fragmentForm)
                modifySearch()
                modifySend(product.id)
            })
    })
}

function modifySend(id) {
    const btn = document.getElementById('btnModifySend')
    console.log(btn)
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        //GET data
        let nameModify = document.getElementById('nameModify').value
        let categoryModify = document.getElementById('categoryModify')
        let categoryModifyData = categoryModify.options[categoryModify.selectedIndex].text
        let priceModify = document.getElementById('priceModify').value
        let stockModify = document.getElementById('stockModify').value
        let urlModify = document.getElementById('urlModify').value
        const data = {
            name: nameModify,
            id_category: categories.indexOf(categoryModifyData),
            price: parseInt(priceModify),
            stock: parseInt(stockModify),
            img: urlModify
        }
        console.log(data)
        fetch(`http://18.223.117.204/products/${id}`, {
            method: 'PUT',
            header: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    })
}

function addSend() {
    const btn = document.getElementById('btnModifySend')
    console.log(btn)
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        //GET data
        let nameModify = document.getElementById('nameModify').value
        let categoryModify = document.getElementById('categoryModify')
        let categoryModifyData = categoryModify.options[categoryModify.selectedIndex].text
        let priceModify = document.getElementById('priceModify').value
        let stockModify = document.getElementById('stockModify').value
        let urlModify = document.getElementById('urlModify').value
        const data = {
            name: nameModify,
            id_category: categories.indexOf(categoryModifyData),
            price: parseInt(priceModify),
            stock: parseInt(stockModify),
            img: urlModify
        }
        console.log(data)
        fetch(`http://18.223.117.204/products/`, {
            method: 'POST',
            header: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    })
}

function deleteSend() {
    const btn = document.getElementById('btnModifySend')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const id = document.getElementById('idModify').value
        /* while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        } */

        fetch(`http://18.223.117.204/products/${id}`, { method: 'DELETE' })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    })
}


function renderFormAdd() {
    const btn = document.getElementById('btnRenderAdd')
    btn.addEventListener('click', () => {
        while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        }
        const clone = templateAdd.cloneNode(true)
        fragmentForm.appendChild(clone)
        containerForm.appendChild(fragmentForm)
        addSend()
    })
}

function renderFormModify() {
    const btn = document.getElementById('btnRenderModify')
    btn.addEventListener('click', () => {
        while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        }
        const clone = templateModify.cloneNode(true)
        fragmentForm.appendChild(clone)
        containerForm.appendChild(fragmentForm)
        modifySearch()
    })
}

function renderFormDelete() {
    const btn = document.getElementById('btnRenderDelete')
    btn.addEventListener('click', () => {
        while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        }
        const clone = templateDelete.cloneNode(true)
        fragmentForm.appendChild(clone)
        containerForm.appendChild(fragmentForm)
        deleteSend()
    })
}


//CARDS
function renderCards() {
    const btn = document.getElementById('btnRenderAll')
    btn.addEventListener('click', () => {

        fetch(`http://18.223.117.204/products`)
            .then((resp) => resp.json())
            .then(data => {
                const containerCard = document.getElementById('containerCard')
                while (containerCard.firstChild) {
                    containerCard.removeChild(containerCard.firstChild);
                }
                const fragmentCard = document.createDocumentFragment()
                const template = document.getElementById('templateProduct').content;
                data.forEach(producto => {
                    let imgProducto = template.getElementById('imgProductDB')
                    let tituloProducto = template.getElementById('nombreProducto')
                    let botonDetalles = template.getElementById('detallesProducto')
                    botonDetalles.dataset.id = producto.id
                    imgProducto.src = producto.img
                    imgProducto.alt = producto.nanme
                    tituloProducto.textContent = producto.name
                    const clone = template.cloneNode(true)
                    fragmentCard.appendChild(clone)
                })
                containerCard.appendChild(fragmentCard)
                detectBtnDetail()
            })
    })
}
renderCards()

//Sales
function renderSales() {
    const btn = document.getElementById('btnSalesAll')
    btn.addEventListener('click', () => {

        fetch(`http://18.223.117.204/sales`)
            .then((resp) => resp.json())
            .then(data => {
                const containerCard = document.getElementById('containerCard')
                while (containerCard.firstChild) {
                    containerCard.removeChild(containerCard.firstChild);
                }
                const fragmentTable = document.createDocumentFragment()
                const templateTable = document.getElementById('templateTable').content;
                const clone = templateTable.cloneNode(true)
                fragmentTable.appendChild(clone)
                containerCard.appendChild(fragmentTable)

                const containerSales = document.getElementById('salesData')
                const fragmentRows = document.createDocumentFragment()

                const templateRows = document.getElementById('templateRows').content;
                data.map(item => {
                    let t1 = templateRows.getElementById('1')
                    let t2 = templateRows.getElementById('2')
                    let t3 = templateRows.getElementById('3')
                    let t4 = templateRows.getElementById('4')
                    let t5 = templateRows.getElementById('5')
                    t1.textContent = item.id
                    t3.textContent = item.id_client
                    t4.textContent = `$ ${item.totalPrice}`
                    t5.textContent = item.createdAt
    
                    const clone = templateRows.cloneNode(true)
                    fragmentRows.appendChild(clone)
                })
                containerSales.appendChild(fragmentRows)
            })
    })
}
renderSales()

//ITEM DETAIL
const priceItemDetail = document.getElementById('priceItemDetail');
const tittleItemDetail = document.getElementById('tittleItemDetail');
const sku = document.getElementById('exampleModalLabel')
const imgItemDetail = document.getElementById('imgItemDetail')
const autorItemDetail = document.getElementById('autorItemDetail')
const btnAddItemDetail = document.getElementById('btnAddItemDetail')
const detectBtnDetail = () => {
    const btn = document.querySelectorAll('#detallesProducto')
    btn.forEach(btn => {
        btn.addEventListener('click', () => {
            let producto = {}
            fetch(`http://18.223.117.204/products/${btn.dataset.id}`)
                .then((resp) => resp.json())
                .then(data => {
                    const product = data
                    sku.textContent = `SKU: ${product.id}`
                    imgItemDetail.src = product.img
                    imgItemDetail.alt = product.name
                    autorItemDetail.textContent = product.author
                    tittleItemDetail.textContent = product.name
                    priceItemDetail.textContent = `$ ${product.price}`
                    detectBtnDetail()
                })
        }
        )
    })
}
detectBtnDetail()

