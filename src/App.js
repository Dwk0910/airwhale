import GetPage from './pages/GetPage.js';
import GetPid from './utils/GetPid.js';

import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
    const matches = useMediaQuery('(min-width:800px)');
    if (matches) return (GetPage({"page":GetPid()}));
    else return (
        <div>
            <h1>Sorry!</h1>
            We don't support moblie UI yet.
        </div>
    );
}

export default App;