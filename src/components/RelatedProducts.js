import ProductItem from "./ProductItem";
import { useEffect, useState } from "../lib";

export default function RelatedProducts(isId) {
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
  