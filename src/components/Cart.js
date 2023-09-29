export default function Cart() {
  return /*html */ `
    <div class="flex items-end gap-2">
      <div class="relative">
        <img src="/cart.svg" alt="" />
        <div class="absolute w-5 h-5 -top-1 -right-2 text-sm bg-[#FDD835] text-center rounded-full">0</div>
      </div>
      <span class="text-xs text-white">Giỏ Hàng</span>
    </div>
  `;
}
