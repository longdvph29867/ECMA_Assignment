import { required, useEffect } from "../../lib"

export default function Create() {

  const postBook = (data) => {
    fetch('http://localhost:3000/books', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      alert('Thêm mới thành công!');
      window.location.href = '/admin'
    })
  }

  

  useEffect(() => {
    const formCreate = document.getElementById('form-create');
    formCreate.onsubmit = (e) => {
      e.preventDefault()
      const formData = new FormData(formCreate);
      const name = formData.get('name');
      const list_price = formData.get('list_price');
      const short_description = formData.get('short_description');
      
      let isVali = required(name, 'name_error');
      isVali &= required(list_price, 'price_error');
      isVali &= required(short_description, 'short_description_error');
      console.log("🚀 ~ file: Create.js:32 ~ useEffect ~ isVali:", isVali)

      const newBook = {
        name,
        list_price,
        short_description
      }
      // postBook(newBook)
    }
  }, [])
  

  return /*html*/`
    <div class="flex items-center justify-center h-screen">
      <form id="form-create" class="max-w-lg w-1/2 mx-auto">
        <div class="mb-2">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nhập tên sách">
          <span id="name_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="list_price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input type="number" name="list_price" id="list_price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nhập giá sách">
          <span id="price_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="short_description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short description</label>
          <textarea 
          rows="5" 
          type="number" 
          name="short_description"
          id="short_description" 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nhập mô tả ngắn"></textarea>
          <span id="short_description_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <button type="submit" class="text-white bg-[#1cc88a] hover:bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Thêm mới</button>
      </form>
    </div>
  `
}
