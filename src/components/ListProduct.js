import { listProducts } from "../data";
import ProductItem from "./ProductItem";
import { books } from '../db.json' assert { typeof: 'json'} 
export default function ListProducts() {
    return /*html*/`
      <div class="grid grid-cols-4 gap-8 mt-14">
        ${books.map(item => ProductItem(item)).join('')}
      </div>
    `
}