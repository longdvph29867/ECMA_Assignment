import axios from "axios";
import Spinner from "../../components/Spinner";
import { hiddenSpinner, required, router, showSpinner, useEffect, useState, valiFiles } from "../../lib"

export default function Edit(id) {
  const [book, setbook] = useState({});

  const putBook = (data) => {
    showSpinner();
    fetch(`http://localhost:3000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      hiddenSpinner();
      alert('Cập nhật thành công!');
      router.navigate('/admin')
    })
  }

  const uploadFile = async (files) => {
    const CLOUD_NAME = "dji6cj8xp";
    const PRESET_NAME = "ECMA-Assignment";
    const FOLDER_NAME = "ECMA-Assignment";
    const urls = [];
    const api = `https://api-ap.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    showSpinner()
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for(const file of files) {
      formData.append("file", file);
      try {
        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        urls.push(response.data.secure_url)
      }
      catch (err) {
        console.log(err);
      }
    }
    hiddenSpinner()
    return urls
  }

  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
    .then(res => res.json())
    .then(data => {
      setbook(data)
    })
  }, [])

  useEffect(() => {
    const image_files = document.querySelector('#files_input');
    image_files.addEventListener('change', () => {
      const listNameImg = [];
      for(let { name, size } of image_files.files) {
        listNameImg.push({
          name,
          size: (size/1024).toFixed(1)
        })
      }
      document.querySelector('.list_images').innerHTML = listNameImg.map(({name, size}) => {
        return `
          <p>${name}, <span class="text-gray-900">${size}kb</span></p>
        `
      }).join('');
    })

    const formCreate = document.getElementById('form-edit');
    formCreate.onsubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData(formCreate);
      const name = formData.get('name');
      const list_price = formData.get('list_price');
      const short_description = formData.get('short_description');
      const description = formData.get('description');
      const image_files = document.querySelector('#files_input');
      console.log(image_files.files.length);
      // bitwise AND-assignment
      let isVali = required(name, 'name_error');
      isVali &= required(list_price, 'price_error');
      isVali &= required(short_description, 'short_description_error');
      isVali &= required(description, 'description_error');
      isVali &= image_files.files.length !== 0 ? valiFiles(image_files.files, 'files_input_error') : true;
      if(isVali) {
        let images = image_files.files.length !== 0 ?  await uploadFile(image_files.files) : book.images;
        const newBook = {
          name,
          list_price: Number(list_price),
          short_description,
          description,
          images,
          original_price: Number(list_price),
          rating_average: 0
        }
        putBook(newBook)
      }
    }
  })
  

  return /*html*/`
    <div class="flex items-center justify-center h-screen">
    <form id="form-edit" class="max-w-lg w-1/2 mx-auto">
      <h1 class="text-3xl text-[#f6c23e] text-center mb-4 font-semibold">Cập nhật</h1>
        <div class="mb-2">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Tên sách</label>
          <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value="${book.name}" placeholder="Nhập tên sách">
          <span id="name_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="list_price" class="block mb-2 text-sm font-medium text-gray-900">Giá</label>
          <input type="number" name="list_price" id="list_price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value="${book.list_price}" placeholder="Nhập giá sách">
          <span id="price_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="short_description" class="block mb-2 text-sm font-medium text-gray-900">Mô tả ngắn</label>
          <textarea 
          rows="1" 
          type="number" 
          name="short_description"
          id="short_description" 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nhập mô tả ngắn">${book.short_description}</textarea>
          <span id="short_description_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Mô tả dài</label>
          <textarea 
          rows="3" 
          type="number" 
          name="description"
          id="description" 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nhập mô tả dài">${book.description}</textarea>
          <span id="description_error" class="text-xs text-red-500 block h-[14px]"></span>
        </div>
        <div class="mb-2">
          <label for="files_input" class="block mb-2 text-sm font-medium text-gray-900">Hình ảnh</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="files_input" name="files_input" type="file" multiple>
          <span id="files_input_error" class="text-xs text-red-500 block"></span>
          <div class="list_images text-xs text-gray-500">
            <div class="flex gap-2 mt-2">
            ${book.images?.map(image => {
              return `
                <img src="${image}" alt="" width=80 class="object-cover" />
              `
            }).join('')}
            </div>
          </div>
        </div>
        <button type="submit" class="text-white bg-[#f6c23e] hover:bg-yellow-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cập nhật</button>
      </form>
    </div>
    ${Spinner()}
  `
}
