import express, { Router } from "express";
const app = express();

const appRouter = Router();
app.use("/", appRouter);
appRouter.get("/categories/:categoryname/products", async (req, res) => {
   const categoryname = req.params["categoryname"];

   const { n, price, rating, discount } = req.query;
   const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTc2MDkzLCJpYXQiOjE3MjE5NzU3OTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQxOGYzNWJjLTdiNDItNDNlOS04YjBjLTRhMzdkY2M2NjgwNyIsInN1YiI6InJpdGh2aWt0aG9udWt1bnVyaUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjQxOGYzNWJjLTdiNDItNDNlOS04YjBjLTRhMzdkY2M2NjgwNyIsImNsaWVudFNlY3JldCI6InV5VEFvVWZzUnl5UEZNVFAiLCJvd25lck5hbWUiOiJSaXRodmlrIiwib3duZXJFbWFpbCI6InJpdGh2aWt0aG9udWt1bnVyaUBnbWFpbC5jb20iLCJyb2xsTm8iOiIxNjAxMjE3MzcwNTUifQ.UT7ODH5bnxwzCxKE83Wgya_KfAc3SYuNz8Nb7sh5X4g";

   const data = await fetch(
      `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=100000`,
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );
   const products = await data.json();

   if (price) {
      if (price === "desc") {
         products.sort((p1: any, p2: any) => p1.price > p2.price);
      } else if (price == "asc") {
         products.sort((p1: any, p2: any) => p1.price < p2.price);
      }
   } else if (rating) {
      if (rating === "desc") {
         products.sort((p1: any, p2: any) => p1.rating > p2.rating);
      } else if (rating == "asc") {
         products.sort((p1: any, p2: any) => p1.rating < p2.rating);
      }
   } else if (discount) {
      if (discount === "desc") {
         products.sort((p1: any, p2: any) => p1.discount > p2.discount);
      } else if (discount == "asc") {
         products.sort((p1: any, p2: any) => p1.discount < p2.discount);
      }
   }
   return res.json(products);
});

app.listen(3000, () => {
   console.log("App running on port 3000");
});
