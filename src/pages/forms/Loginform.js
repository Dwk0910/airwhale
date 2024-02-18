import { useState } from 'react';

import { LocalStorage, Redirect } from '../../utils/Util';
import { Box, Typography, TextField, Alert, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import TopBar from './../../templates/TopBar.js';
import $ from 'jquery';
import useMediaQuery from "@mui/material/useMediaQuery";

function Loginform() {
    const [loginButtonLoading, setLoginButtonLoading] = useState(false);
    const [error, setError] = useState(false);
    const [text, setText] = useState("");

    const ls = LocalStorage();
    if (ls.get("id") !== null) {
        alert("잘못된 접근입니다.");
        Redirect(".", true);
    }

    let alertcol = null;
    if (ls.get("signup")) {
        alertcol = (
          <Alert severity={"success"}>회원가입에 성공했습니다.</Alert>
        );
        ls.remove("signup")
    }

    const submit = () => {
        setLoginButtonLoading(true);
        setError(false);
        setText("");
        const id = document.getElementById("id").value;
        const pwd = document.getElementById("pwd").value;
        if (id === '' || pwd === '') {
            setLoginButtonLoading(false);
            return;
        }

        $.ajax({
            type: "post",
            url: "http://dongwan0910.dothome.co.kr/airwhale/Login.php",
            data: {
                ctpd: process.env.REACT_APP_CTPD,
                id: id,
                pwd: pwd
            },
            error: () => { console.log("Error"); }
        }).then((response) => {
            response = JSON.parse(response);
            if (response.status) {
                ls.set("id", id);
                Redirect(".", true);
            } else {
                setLoginButtonLoading(false);
                setError(true);
                setText("입력하신 아이디 또는 비밀번호가 잘못되었습니다.");
            }
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
                    {alertcol}
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
                                   label={"에어웨일 아이디"} type={"id"} variant={"outlined"} id={"id"} error={error} helperText={text}/>
                        <TextField style={{alignItems: "left"}} sx={{mt: "5%", mb: "5%", ml: "8.6%", width: "80%"}}
                                   label={"비밀번호"} autoComplete={"password"} type={"password"} variant={"outlined"} id={"pwd"} error={error} helperText={text}/>
                        <LoadingButton variant={"contained"} style={{fontFamily: "SeoulNamsan"}}
                                sx={{width: "80%", fontSize: "1.2rem", ml: "8.6%", mb: "2%"}}
                                loading={loginButtonLoading}
                                type={"submit"}>로그인</LoadingButton>
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