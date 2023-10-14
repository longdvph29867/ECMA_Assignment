import axios from "axios";
import { required, useEffect, valiFiles } from "../../lib"

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

  const uploadFile = async (files) => {
    const CLOUD_NAME = "dji6cj8xp";
    const PRESET_NAME = "ECMA-Assignment";
    const FOLDER_NAME = "ECMA-Assignment";
    const urls = [];
    const api = `https://api-ap.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for(const file of files) {
      formData.append("file", file);
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      urls.push(response.data.secure_url)
    }
    return urls
  }

  useEffect(() => {
    const formCreate = document.getElementById('form-create');
    formCreate.onsubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData(formCreate);
      const name = formData.get('name');
      const list_price = formData.get('list_price');
      const short_description = formData.get('short_description');
      const description = formData.get('description');
      const files_input = formData.get('files_input');
      const image_files = document.querySelector('#files_input');
      
      // bitwise AND-assignment
      let isVali = required(name, 'name_error');
      isVali &= required(list_price, 'price_error');
      isVali &= required(short_description, 'short_description_error');
      isVali &= required(description, 'description_error');
      isVali &= valiFiles(image_files.files, 'files_input_error');

      const images = await uploadFile(image_files.files)
      const newBook = {
        name,
        list_price,
        short_description,
        description,
        images,
        original_price: list_price,
        rating_average: 0
      }
      postBook(newBook)
    }
  }, [])
  

  return /*html*/`
    <div class="flex items-center justify-center h-screen">
    <form id="form-create" class="max-w-lg w-1/2 mx-auto">
      <h1 class="text-3xl text-[#1cc88a] text-center mb-4 font-semibold">Thêm mới</h1>
        <div class="mb-2">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Tên sách</label>
          <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nhập tên sách">
          <span id="name_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="list_price" class="block mb-2 text-sm font-medium text-gray-900">Giá</label>
          <input type="number" name="list_price" id="list_price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nhập giá sách">
          <span id="price_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="short_description" class="block mb-2 text-sm font-medium text-gray-900">Mô tả ngắn</label>
          <textarea 
          rows="1" 
          type="number" 
          name="short_description"
          id="short_description" 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nhập mô tả ngắn"></textarea>
          <span id="short_description_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Mô tả dài</label>
          <textarea 
          rows="3" 
          type="number" 
          name="description"
          id="description" 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nhập mô tả dài"></textarea>
          <span id="description_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="files_input" class="block mb-2 text-sm font-medium text-gray-900">Hình ảnh</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="files_input" name="files_input" type="file" multiple>
          <span id="files_input_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <button type="submit" class="text-white bg-[#1cc88a] hover:bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Thêm mới</button>
      </form>
    </div>
  `
}
