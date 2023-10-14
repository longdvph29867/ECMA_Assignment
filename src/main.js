import './style.css'
import { render, router } from './lib';
import HomePage from './page/HomePage';
import DetailPage from './page/DetailPage';
import Dasboard from './page/admin/Dasboard';
import Create from './page/admin/Create';

const container = document.querySelector('#app');

router.on('/', function () {
    render(HomePage, container)
});

router.on('/detail/:id', function ({data}) {
    window.scrollTo({ top: 0});
    render(() => DetailPage(data.id), container)
});

router.on('/admin', function () {
    render(Dasboard, container)
});
router.on('/admin/create', function () {
    render(Create, container)
});


router.resolve();
//, behavior: 'smooth' 
