import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect, useState } from "../../lib";

export default function Dasboard() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => setBooks(data))
  }

  useEffect(() => {
    fetchBooks();
  }, [])

  useEffect(() => {
    const btnDeletes = document.querySelectorAll('.btn-delete')
    btnDeletes.forEach(btnDelete => {
      btnDelete.addEventListener('click', function (e) {
        const id = btnDelete.dataset.id;
        if(confirm('Bạn có chắc chắn muốn xoá không!')) {
          fetch(`http://localhost:3000/books/${id}`, {
            method: "DELETE"
          })
          .then(() => {
            alert('Xoá sản phẩm thành công!');
            fetchBooks();
          })
        }
      })
    })
  })


  return /*html*/ `
  ${Header()}
  <div class="container mx-auto">
    <h1 class="text-center text-3xl py-5 text-[#4e73df]">Quản lý sách</h1>
    <div>
      <a href="/admin/create" class="inline-block py-2 px-5 mb-2 text-base bg-[#1cc88a] hover:bg-green-500 duration-300 text-white rounded">Add new book</a>
    </div>
    <div class="relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-base text-white uppercase bg-[#4e73df]">
          <tr>
            <th class="w-[20%] px-6 py-3">
              Name
            </th>
            <th class="w-[17%] px-6 py-3">
              Image
            </th>
            <th class="w-[10%] px-6 py-3">
              Price
            </th>
            <th class="w-[32%] px-6 py-3">
              Short description
            </th>
            <th class="w-[120%] px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>

          ${books.map(book => {
            return /*html*/`
            <tr class="bg-white border-b">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                ${book.name}
              </th>
              <td class="px-6 py-4">
                <img src="${book.images?.[0]}"/>
              </td>
              <td class="px-6 py-4">
                ${book.list_price?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
              </td>
              <td class="px-6 py-4">
                ${book.short_description}
              </td>
              <td class="px-6 py-4 space-x-2">
                <a href="#" class="py-2 px-5 text-base inline-block bg-[#f6c23e] hover:bg-yellow-400 duration-300 text-white rounded">Edit</a>
                <button data-id="${book.id}" class="btn-delete py-2 px-5 text-base bg-[#e74a3b] hover:bg-red-600 duration-300 text-white rounded">Delete</button>
              </td>
          </tr>
            `
          }).join('')}
          
        </tbody>
      </table>
    </div>
  </div>
  ${Footer()}

  `;
}
