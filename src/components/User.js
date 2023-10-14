export default function User() {
  return /*html */ `
    <div class="flex items-center gap-2 text-white">
      <img src="/user.svg" alt="" />
      <div>
        <p class="text-xs">
          <a href="#">Đăng Nhập</a> / <a href="#">Đăng Ký</a>
        </p>
        <a href="/admin" class="flex items-center">
          <span class="text-sm">Tài khoản</span>
          <img src="/down.svg" alt="" />
        </a>
      </div>
    </div>
  `;
}
