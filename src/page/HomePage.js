import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListProducts from "../components/ListProduct";
import Menu from "../components/Menu";
import Tabs from "../components/Tabs";

export default function HomePage() {
  return /* html*/`
    ${Header()}
    <div class="bg-[#F5F5FA] h-10"></div>
    <div class="container mx-auto flex mt-4">
      <div class="w-1/5">
        ${Menu()}
      </div>
      <div class="w-4/5">
        ${Banner()}
        ${Tabs()}
        ${ListProducts()}
      </div>
    </div>
    ${Footer()}
  `
}
