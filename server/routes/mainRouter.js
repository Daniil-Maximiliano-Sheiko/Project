const router = require("express").Router();
const fs = require("fs");

let data = "";
const readFile = (path) => {
    return fs.readFileSync(path, "utf-8");
}

data = readFile("./data/items.csv");
data = data.split("\r\n");

console.log(data);

const Product = function(prArr) {
    let names = data[0].split(";");
    names.forEach(function (name, i) {
        console.log(this);
        this[name] = prArr[i];
    }.bind(this));
}

const products = [];

for (let i = 1; i < data.length; i++) {
    products.push(new Product(data[i].split(";")));
}



router.get("/", (req, res) => {
    res.render("index", {
        title: "Товары",
        products: products,
        tableCaptions: data[0]
    });
});
router.get("/laptop", (req, res) => {
    res.render("category", {
        title: "ноутбук"
    });
});

module.exports = router;