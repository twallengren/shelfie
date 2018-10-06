module.exports = {

    getAll: (req, res, next) => {

        const dbInstance = req.app.get('db');

        dbInstance.get_inventory().then(products => res.status(200).send(products)).catch(err => {
            res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!" });
            console.log(err)
        });

    },

    addProduct: (req, res, next) => {

        const dbInstance = req.app.get('db');

        const { product_name, descript, price, image_url } = req.body;

        console.log(product_name, descript, price, image_url)

        dbInstance.create_product([product_name, descript, price, image_url]).then(() => res.sendStatus(200)).catch(err => {
            res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!" });
            console.log(err)
        });

    }

}