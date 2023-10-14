import { listProducts } from "../data";
import { useEffect, useState } from "../lib";
import ProductItem from "./ProductItem";
// import { books } from '../db.json' assert { typeof: 'json'} 
export default function ListProducts() {
  const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/books`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setBooks(data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])
    return /*html*/`
      <div class="grid grid-cols-4 gap-8 mt-14">
        ${books.map(item => ProductItem(item)).join('')}
      </div>
    `
}