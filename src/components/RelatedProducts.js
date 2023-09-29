import ProductItem from "./ProductItem";
import { books } from '../db.json' assert { typeof: 'json'} 

export default function RelatedProducts(isId) {
    console.log("🚀 ~ file: RelatedProducts.js:5 ~ RelatedProducts ~ isId:", isId)
    return /*html */ `
        <div class="container mx-auto">
            <h2 class="mb-6 text-xl text-[#333]">Sản Phẩm Tương Tự</h2>
            <div class="grid grid-cols-6 gap-6">
                ${books
                    .filter(item => item.id != isId)
                    .map(item => ProductItem(item))
                    .slice(-6).join('')}
            </div>
        </div>
    `;
  }
  