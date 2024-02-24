import { LocalStorage, Redirect } from '../../utils/Util';

function Logout() {
    const ls = LocalStorage();
    ls.remove("id");
    ls.remove("pwd");
    Redirect(".", true);
}

export default Logout;