import Footer from "../components/Footer";
import Header from "../components/Header";
import RelatedProducts from "../components/RelatedProducts";
import Spinner from "../components/Spinner";
import { hiddenSpinner, showSpinner, useEffect, useState } from "../lib";


export default function DetailPage(id) {
    // let [book] = books.filter( item => id==item.id);
    const [book, setBook] = useState({});
    const [showDescription, setShowDescription] = useState(false);
    const [quantity, setQuantity] = useState(1)
    const handleQuantity = (num) => {

        setQuantity(quantity + num);
    }
    const handleShowDescription = () => {
        setShowDescription(!showDescription)
    }

    useEffect(() => {
        showSpinner();
        fetch(`http://localhost:3000/books/${id}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            hiddenSpinner();
            setBook(data)
        })
        .catch((err) => {
            hiddenSpinner();
        console.log(err);
        });
    }, [])

    useEffect(() => {
        const listThumbnail = document.querySelectorAll(".thumbnail")
        listThumbnail.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                listThumbnail.forEach(thumbnail => {
                    thumbnail.classList.remove('border-[#0D5CB6]')
                })
                document.querySelector('.image-detail').src = thumbnail.dataset.src
                this.classList.add('border-[#0D5CB6]')
            })
        })

        document.querySelector('.btn-description').addEventListener('click', handleShowDescription)
        document.querySelector('.down').addEventListener('click', () => handleQuantity(-1))
        document.querySelector('.up').addEventListener('click', () => handleQuantity(1))
    })

  return /* html*/ `
    ${Header()}
    <div class="bg-[#F5F5FA] h-10"></div>
    <div class="container mx-auto flex">
        <div class="w-2/5 pr-4 pt-4">
            <div class="relative">
                <div class="max-w-[445px] min-h-[445px] mx-auto flex items-center">
                    <img class='image-detail' src="${book.images?.[0]}" alt="" />
                </div>
                <div class="absolute left-4 bottom-4 flex gap-1 text-sm text-white py-1.5 px-3 rounded-full bg-black/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M1 11.857V13H14V11.857M1 1L7.5 2.714L14 1V9.571L7.5 11.286L1 9.57V1ZM7.5 2.714V11.286V2.714Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Đọc Thử</span>
                </div>
            </div>
            <div class="flex gap-3 mb-10 mt-4">
                ${book.images?.map((image, i) => {
                    return `
                    <div data-src="${image}" class="thumbnail border ${i === 0 ? 'border-[#0D5CB6]' : ''} rounded overflow-hidden">
                        <img src="${image}" width=64 alt="" />
                    </div>
                    `
                }).join('')}
                
            </div>
        </div>
        <div class="w-3/5 border-l border-[#F2F2F2] pl-3 pt-10">
            <div class="max-w-lg">
                <h1 class="text-[#242424] text-[22px]">${book.name}</h1>
                <div class="flex items-center mt-1 mb-4">
                    <div class="min-w-[80px]">
                    <div id="item-rating" class=" h-[24px]">
                    <i data-star="${book.rating_average}"></i>
                    </div>
                    </div>
                    <p class="text-xs text-[#787878] ml-2">(Xem 2942 đánh giá)</p>
                    <div class="w-[1px] h-2.5 bg-[#C7C7C7] mx-1.5"></div>
                    <p class="text-xs text-[#787878]">
                        <span>${book.quantity_sold?.text ?? 'Đã bán 0'}</span>
                    </p>
                </div>
                <div class="py-3 px-4 rounded bg-[#FAFAFA] h-24">
                    <div class=" flex items-end gap-2">
                        <p class="text-[#FF424E] text-3xl leading-8">${book.list_price?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        <p class="text-[#808089] text-sm">${book.original_price?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        <div class="text-[14px] text-[#FF424E] rounded-sm border-[1px] border-[#FF424E] bg-[#FFF0F1] leading-3 p-[1px] ml-1.5">-<span>0</span>%</div>
                    </div>
                </div>
                <div class="h-[1px] bg-[#F2F2F2] mt-4 mb-8"></div>
                <div>
                    <p>Số Lượng</p>
                    <div class="flex items-center gap-[2px] mt-2">
                        <button class="down w-8 h-8 text-[#787878] text-2xl flex items-center justify-center border border-[#ECECEC] border-r-0">-</button>
                        <span class="w-10 h-7 flex items-center justify-center border border-[#ECECEC]">${quantity}</span>
                        <button class="up w-8 h-8 text-[#787878] text-2xl flex items-center justify-center border border-[#ECECEC] border-l-0">+</button>
                    </div>
                </div>
                <button class="w-80 h-12 bg-[#FF3945] rounded text-white text-sm mt-7">Chọn mua</button>
                <div class="h-[1px] bg-[#F2F2F2] mt-16"></div>

            </div>
        </div>
    </div>
    ${RelatedProducts(id)}

    <div class="container mx-auto mt-10">
        <h3 class="text-xl text-[#333] mb-3">Mô Tả Sản Phẩm</h3>
        <div class=" max-w-4xl text-sm text-[#242424]">
            <div class="short_description space-y-5">
                ${showDescription ? book.description : book.short_description}
            </div>
            
            <div class="flex justify-center mt-2">
                <button 
                
                    class="btn-description text-[#189EFF] text-sm w-72 h-10 border border-[#189EFF] rounded"><span class="show_description">${showDescription ? 'Rút gọn' : 'Xem Thêm Nội Dung'}</span></button>
            </div>
        </div>
    </div>

    ${Footer()}
    ${Spinner()}
  `;
}
