"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const app = (0, express_1.default)();
const appRouter = (0, express_1.Router)();
app.use("/", appRouter);
appRouter.get("/categories/:categoryname/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryname = req.params["categoryname"];
    const { n, price, rating, discount } = req.query;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTc2MDkzLCJpYXQiOjE3MjE5NzU3OTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQxOGYzNWJjLTdiNDItNDNlOS04YjBjLTRhMzdkY2M2NjgwNyIsInN1YiI6InJpdGh2aWt0aG9udWt1bnVyaUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjQxOGYzNWJjLTdiNDItNDNlOS04YjBjLTRhMzdkY2M2NjgwNyIsImNsaWVudFNlY3JldCI6InV5VEFvVWZzUnl5UEZNVFAiLCJvd25lck5hbWUiOiJSaXRodmlrIiwib3duZXJFbWFpbCI6InJpdGh2aWt0aG9udWt1bnVyaUBnbWFpbC5jb20iLCJyb2xsTm8iOiIxNjAxMjE3MzcwNTUifQ.UT7ODH5bnxwzCxKE83Wgya_KfAc3SYuNz8Nb7sh5X4g";
    const data = yield fetch(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=100000`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const products = yield data.json();
    if (price) {
        if (price === "desc") {
            products.sort((p1, p2) => p1.price > p2.price);
        }
        else if (price == "asc") {
            products.sort((p1, p2) => p1.price < p2.price);
        }
    }
    else if (rating) {
        if (rating === "desc") {
            products.sort((p1, p2) => p1.rating > p2.rating);
        }
        else if (rating == "asc") {
            products.sort((p1, p2) => p1.rating < p2.rating);
        }
    }
    else if (discount) {
        if (discount === "desc") {
            products.sort((p1, p2) => p1.discount > p2.discount);
        }
        else if (discount == "asc") {
            products.sort((p1, p2) => p1.discount < p2.discount);
        }
    }
    return res.json(products);
}));
app.listen(3000, () => {
    console.log("App running on port 3000");
});
