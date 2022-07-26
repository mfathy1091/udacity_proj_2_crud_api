"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
class ProductModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            try {
                const sql = `SELECT * FROM products`;
                const result = yield connection.query(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get products  ${err.message}`);
            }
            finally {
                connection.release();
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const result = yield connection.query(sql, [id]);
                return result.rows[0];
                connection.release();
            }
            catch (err) {
                throw new Error(`Could not get products. Error:  ${err.message}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
                const result = yield connection.query(sql, [product.name, product.price]);
                connection.release();
                const newProduct = result.rows[0];
                return newProduct;
            }
            catch (err) {
                throw new Error(`Could not create product. Error:  ${err.message}`);
            }
        });
    }
    update(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "UPDATE products SET name = $1, price = $2 WHERE id=$3 RETURNING *";
                const result = yield connection.query(sql, [product.name, product.price, productId]);
                connection.release();
                const updatedProduct = result.rows[0];
                return updatedProduct;
            }
            catch (err) {
                throw new Error(`Could not update product. Error:  ${err.message}`);
            }
        });
    }
    delete(productID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "DELETE FROM products WHERE id=$1 RETURNING *";
                const result = yield connection.query(sql, [productID]);
                connection.release();
                const product = result.rows[0];
                return product;
            }
            catch (err) {
                throw new Error(`Could not delete product ${productID}. Error:  ${err.message}`);
            }
        });
    }
}
exports.default = ProductModel;
