import { useEffect, useState } from "../lib";

export default function QuantityCart() {
    const [quantity, setQuantity] = useState(1)
    const handleQuantity = (num) => {

        setQuantity(quantity + num);
    }
    useEffect(() => {
        document.querySelector('.down').addEventListener('click', () => handleQuantity(-1))
        document.querySelector('.up').addEventListener('click', () => handleQuantity(1))
    })
  return /*html*/`<div>
  <p>Số Lượng</p>
  <div class="flex items-center gap-[2px] mt-2">
      <button class="down w-8 h-8 text-[#787878] text-2xl flex items-center justify-center border border-[#ECECEC] border-r-0">-</button>
      <span class="w-10 h-7 flex items-center justify-center border border-[#ECECEC]">${quantity}</span>
      <button class="up w-8 h-8 text-[#787878] text-2xl flex items-center justify-center border border-[#ECECEC] border-l-0">+</button>
  </div>
</div>`
}
