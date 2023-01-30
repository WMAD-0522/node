import express from "express";
import db from "../config.js";

const router = express.Router();

// get all products
router.get("/", (req, res) => {
    
    let sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.render("pages/index", { title: "Home Page", products: result })
    })
})

// get single product by id
router.get("/product/:id", (req, res) => {
    let sql = "SELECT * FROM products WHERE id =" + req.params.id + "";
    db.query(sql, (err, result) => {
        if(err) console.log(err);

        let obj = JSON.stringify(result[0])

        res.render("pages/product", { title: JSON.parse(obj).title, product: JSON.parse(obj) })
    })
})

// render create product page
router.get("/add-product", (req, res) => {
    res.render("pages/addProduct", {title: "Add Product Page"})
})

// create a product
router.post("/add", (req, res) => {
    let sql = "INSERT INTO products SET ?";
    let data = {
        title: req.body.title,
        price: req.body.price,    
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }
    db.query(sql, data, (err) => {
        if(err) console.log(err);
        res.redirect("/")
    })
});

// delete a product by id
router.post("/delete/:id", (req, res) =>{
    let sql = "DELETE FROM products WHERE id = " + req.params.id + "";
    db.query(sql, (err) => {
        if(err) console.log(err);
        res.redirect("/");
    })
})

router.get("/edit/:id", (req, res) =>{

    let sql = "SELECT * FROM products WHERE id=" + req.params.id;

    db.query(sql, (err, result) => {
        if(err) console.log(err);

        let obj = JSON.stringify(result[0])

        res.render("pages/edit", { title: "Edit Page", product: JSON.parse(obj) })
    })

});

router.post("/edit/:id", (req, res) => {
    // let sql = "UPDATE products SET ?";
    let sql = "UPDATE products SET title='" 
    + req.body.title + "', price= '" 
    + req.body.price + "', description= '" 
    + req.body.description + "', imageUrl= '" 
    + req.body.imageUrl 
    + "' WHERE id=" + req.params.id;

    db.query(sql, (err) => {
        if(err) console.log(err);

        res.redirect("/");
    })
})





export default router;