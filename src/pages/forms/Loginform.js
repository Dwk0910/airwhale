import { LocalStorage, Redirect } from '../../utils/Util';
import { Box, Typography, TextField, Button } from '@mui/material';

import TopBar from './../../templates/TopBar.js';
import $ from 'jquery';
import useMediaQuery from "@mui/material/useMediaQuery";

function Loginform() {
    const ls = LocalStorage();
    if (ls.get("id") !== null) {
        alert("잘못된 접근입니다.");
        window.history.back();
    }

    const submit = () => {
        const id = document.getElementById("id").value;
        const pwd = document.getElementById("pwd").value;
        if (id === '' || pwd === '') return;

        $.ajax({
            type: "post",
            url: "https://airwhalespring.onrender.com/login",
            data: {
                id: id,
                pwd: pwd
            },
            error: () => { console.log("Error"); }
        }).then((r) => {
            console.log(r);
        });
    }

    document.title = "에어웨일 - 로그인"
    const matches = useMediaQuery('(min-width: 800px)');
    if (matches) {
        return (
            <div className={"content"}>
                <iframe name="dummyframe" title={"dummyframe"} id="dummyframe" style={{display: "none"}}></iframe>
                <form target={"dummyframe"} onSubmit={() => submit()} onKeyDown={(e) => {
                    if (document.getElementById("id").value === "" || document.getElementById("pwd").value === "") return;
                    if (e.key === "Enter") submit();
                }}>
                    <TopBar/>
                    <Box sx={{
                        width: "390px",
                        borderRadius: 1,
                        p: "29px",
                        ml: "auto",
                        mr: "auto",
                        mb: "auto",
                        mt: "5%",
                        boxShadow: 10,
                        bgcolor: "rgba(100,182,200,0.26)"
                    }} style={{textAlign: "left"}}>
                        <Typography style={{fontSize: "1.7rem", fontFamily: "SeoulNamsan"}}
                                    sx={{ml: "8.8%", mb: "-3%"}}>로그인</Typography>
                        <Typography style={{fontSize: "1.1rem", fontFamily: "SeoulNamsan", color: "gray"}}
                                    sx={{ml: "10.5%"}}>LOG IN</Typography>
                        <TextField style={{alignItems: "left"}} sx={{mt: "5%", ml: "8.6%", width: "80%"}}
                                   label={"에어웨일 아이디"} type={"id"} variant={"outlined"} id={"id"}/>
                        <TextField style={{alignItems: "left"}} sx={{mt: "5%", mb: "5%", ml: "8.6%", width: "80%"}}
                                   label={"비밀번호"} type={"password"} variant={"outlined"} id={"pwd"}/>
                        <Button variant={"contained"} style={{fontFamily: "SeoulNamsan"}}
                                sx={{width: "80%", fontSize: "1.2rem", ml: "8.6%", mb: "2%"}}
                                type={"submit"}>로그인</Button>
                    </Box>
                    <Typography sx={{mt: "2%", mb: "0.5%", fontFamily: "SeoulNamsan", fontSize: "1.1rem"}}>에어웨일에 처음
                        오셨나요?</Typography>
                    <Button variant={"contained"} style={{
                        width: "450px",
                        fontFamily: "SeoulNamsan",
                        height: "50px",
                        fontSize: "1rem",
                        backgroundColor: "#345f8f"
                    }} onClick={() => {
                        Redirect(".?pid=signup", false)
                    }}>에어웨일 회원가입</Button>
                </form>
            </div>
        );
    } else {
        return (
            <div className={"content"}>
                <h1>Sorry!</h1>
                We don't support mobile UI yet.
            </div>
        );
    }
}

export default Loginform;