import { LocalStorage, Redirect } from '../../utils/Util';

function Logout() {
    const ls = LocalStorage();
    ls.remove("id");
    Redirect(".", true);
}

export default Logout;