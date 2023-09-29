import Cart from "./Cart";
import Search from "./Search";
import User from "./User";

export default function Header() {
    return /*html */`
        <header class="bg-[#1A94FF] py-4">
            <div class='container mx-auto flex items-center justify-between'>
                <a href="/">
                    <img src="/logo.svg" alt="" />
                </a>
                ${Search()}
                <div class="flex items-center gap-6">
                    ${User()}
                    ${Cart()}
                </div>
            </div>
        </header>
    `
  }