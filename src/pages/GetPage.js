import Main from './Main.js';
import Nofication from './Nofication.js';
import Information from './Information.js';
import Rule from './Rule.js';

import LoginForm from './forms/Loginform.js';

function GetPage(prop) {
    if (prop.page === '1') return Main();
    if (prop.page === '2') return Nofication();
    if (prop.page === '3') return Information();
    if (prop.page === '4') return Rule();

    if (prop.page === 'login') return LoginForm();
}

export default GetPage;