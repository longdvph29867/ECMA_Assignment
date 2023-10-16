import { listProducts } from "../data";
import { hiddenSpinner, showSpinner, useEffect, useState } from "../lib";
import ProductItem from "./ProductItem";
// import { books } from '../db.json' assert { typeof: 'json'} 
export default function ListProducts() {
  const [books, setBooks] = useState([]);
    useEffect(() => {
        showSpinner();
        fetch(`http://localhost:3000/books`)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          hiddenSpinner();
          setBooks(data)
        })
        .catch((err) => {
          hiddenSpinner()
          console.log(err);
        });
    }, [])
    return /*html*/`
      <div class="grid grid-cols-4 gap-8 mt-14">
        ${books.map(item => ProductItem(item)).join('')}
      </div>
    `
}