import TopBar from './../templates/TopBar.js'
import useMediaQuery from "@mui/material/useMediaQuery";

import { LocalStorage } from '../utils/Util';
import { Alert, Snackbar, Typography } from "@mui/material";
import {useState} from "react";

function Main() {
    document.title = "에어웨일 - 홈";

    const [open, setOpen] = useState(false);
    if (LocalStorage().get("login")) {
        setOpen(true);
        LocalStorage().remove("login");
    }

    const closeEvent = (e, r) => {
        if (r === "clickaway") return;
        setOpen(false);
    }

    const matches = useMediaQuery('(min-width: 800px)');
    if (matches) {
        return (
            <div className={"content"}>
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                          autoHideDuration={3500}
                          open={open}
                          onClose={closeEvent}
                >
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        <Typography sx={{fontFamily: "SeoulNamsan"}}>로그인이 완료되었습니다.</Typography>
                    </Alert>
                </Snackbar>
                <TopBar/>
            </div>
        );
    } else {
        return (
            <div className={"content"}>
                <h1>Sorry!</h1>
                We don't support mobile UI yet.
            </div>
        )
    }
}

export default Main;