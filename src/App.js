import { GetPid, LocalStorage } from './utils/Util';

import $ from 'jquery';

import Main from './pages/Main.js';
import Information from './pages/Information.js';
import Nofication from './pages/Nofication.js';
import Rule from './pages/Rule.js';

import LoginForm from './pages/forms/Loginform.js';
import SignupForm from './pages/forms/Signupform.js';
import Logout from "./pages/forms/Logout";

function App() {
    const ls = LocalStorage();
    if ((ls.get("id") === null && ls.get("pwd") !== null) || (ls.get("id") !== null && ls.get("pwd") === null)) return Logout();
    else if (ls.get("id") !== null && ls.get("pwd") !== null) {
        $.ajax({
            type: "post",
            url: "/Login.php",
            data: {
                ctpd: process.env.REACT_APP_CTPD,
                id: ls.get("id"),
                pwd: ls.get("pwd")
            }
        }).then((r) => {
            r = JSON.parse(r);
            if (!r.status) return Logout();
        });
    }

    let pid = GetPid();
    if (pid === null) pid = "1";

    switch (pid) {
        case "1": return Main();
        case "2": return Nofication();
        case "3": return Information();
        case "4": return Rule();

        case "login": return LoginForm();
        case "signup": return SignupForm();
        case "logout": return Logout();

        default : return (
            <h1>404</h1>
        );
    }
}

export default App;