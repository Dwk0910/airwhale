import { GetPid } from './utils/Util';

import Main from './pages/Main.js';
import Information from './pages/Information.js';
import Nofication from './pages/Nofication.js';
import Rule from './pages/Rule.js';

import LoginForm from './pages/forms/Loginform.js';
import SignupForm from './pages/forms/Signupform.js';

function App() {
    let pid = GetPid();
    if (pid === null) pid = "1";

    switch (pid) {
        case "1": return Main();
        case "2": return Nofication();
        case "3": return Information();
        case "4": return Rule();

        case "login": return LoginForm();
        case "signup": return SignupForm();

        default : return (
            <h1>404</h1>
        );
    }
}

export default App;