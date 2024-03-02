import TopBar from './../templates/TopBar.js'
import useMediaQuery from "@mui/material/useMediaQuery";

import { LocalStorage } from '../utils/Util';
import { Alert, Snackbar, Typography, Box } from "@mui/material";
import { useState } from "react";

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
                <Box
                    component={"div"}
                    sx={{
                        background: "no-repeat url(https://cdn.discordapp.com/attachments/1193382787168878592/1204976468107726900/20240208112550_1.jpg?ex=65f26049&is=65dfeb49&hm=fc443935ee2c6c8b67077c9994b7ba58303e2eae30645013efb4ec485c40376f&)",
                        backgroundSize: "cover",
                        backgroundPosition: 'center',
                        height: "600px",
                        filter: "blur(5px)"
                    }}
                >
                </Box>
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