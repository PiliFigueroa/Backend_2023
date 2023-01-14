const fs = require('fs')
const data = fs.readFileSync('data/products.txt')
const { idGenerator } = require('../helpers/idGenerator')

let products = JSON.parse(data)

class Product {
    constructor(id, title, price, url, description, stock) {
        this.id = id
        this.title = title
        this.price = price
        this.url = url
        this.description = description
        this.stock = stock
    }

    save = (object) => {
        const { title, price, url } = object
        const newProduct = new Product
        newProduct.id = idGenerator(products)
        newProduct.title = title
        newProduct.price = price  
        newProduct.url = url
        newProduct.description = description
        newProduct.stock = stock

        products.push(newProduct)
        const json_products = JSON.stringify(products)
        fs.writeFileSync('data/products.txt', json_products, 'utf-8')
        return newProduct
    }

    findById =  (id) => {
        const product = products.filter(product => product.id == id)
        if (product != '') {
            return product
        } else {
            throw 'This ID does not exist'
        }
    }

    deleteById = (id) => {
        const findId = this.findById(id)
        if (findId != '') {
            products = products.filter(product => product.id !== id)
            const json_products = JSON.stringify(products)
            fs.writeFileSync('data/products.txt', json_products, 'utf-8')     
        } else {
            throw 'This ID does not exist'
        }
    }

    getAll = () => {
        return products
    }

    deleteAll = () => {
        products = []
        const json_products = JSON.stringify(products)
        fs.writeFileSync('data/products.txt', json_products, 'utf-8')
    }

}

module.exports = {
    Product
}
