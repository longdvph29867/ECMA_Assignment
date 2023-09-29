import './style.css'
import Navigo from 'navigo'
import { render } from './lib';
import HomePage from './page/HomePage';
import DetailPage from './page/DetailPage';


const router = new Navigo('/', {linksSelector: 'a', hash: false});

router.on('/', function () {
    render('#app', HomePage())
});
router.on('/detail/:id', function ({data}) {
    window.scrollTo({ top: 0});
    render('#app', DetailPage(data.id))
});

router.resolve();
//, behavior: 'smooth' 
