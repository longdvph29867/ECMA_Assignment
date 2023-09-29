export default function ProductItem(book) {
  let { images, list_price, original_price, name, rating_average, id,  quantity_sold = null} = book;
    return /*html*/`
      <a href="/detail/${id}" class="block hover:shadow-lg rounded-md duration-300">
        <div class="relative">
          <img src="${images[0]}" alt="" />
          <img src="/freeship.svg" alt="" class="absolute left-0 bottom-0 "/>
        </div>
        <div class="mt-2 px-2">
          <h4 class="name-porduct text-[#242424] text-sm mb-1.5">${name}</h4>
          <div class="flex items-center">
            <div class="min-w-[80px]">
            <div id="item-rating" class=" h-[24px]">
              <i data-star="${rating_average}"></i>
            </div>
            </div>
            <div class="w-[1px] h-2.5 bg-[#C7C7C7] mx-1.5"></div>
            <p class="text-xs text-[#787878]">
              <span>${quantity_sold?.text ?? 'Đã bán 0'}</span>
            </p>
          </div>
          <div class="text-[#FF424E] flex items-center">
            <p><span>${list_price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span></p>
            <div class="text-[11px] rounded-sm border-[1px] border-[#FF424E] bg-[#FFF0F1] leading-3 p-[1px] ml-1.5 ">-<span>${(original_price - list_price)/original_price * 100}</span>%</div>
          </div>
          <div class="min-h-[18px]">
            <img src="/hoantien.svg" alt="" class="mb-1"/>
          </div>
        </div>
      </a>
    `
}