import TopBar from './../../templates/TopBar.js';
import { LocalStorage, Redirect } from "../../utils/Util";

import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Checkbox, Link, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

import $ from 'jquery';

function Signupform() {
    const [btnDisable, setBtnDisable] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [idError, setIdError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [checkPwdError, setCheckPwdError] = useState(false);

    const [nameText, setNameText] = useState('');
    const [idText, setIdText] = useState('');
    const [emailText, setEmailText] = useState('');
    const [pwdText, setPwdText] = useState('');
    const [checkPwdText, setCheckPwdText] = useState('');

    if (LocalStorage().get("id") !== null) {
        alert("잘못된 접근입니다.");
        window.history.back();
    }

    const matches = useMediaQuery('(min-width: 800px)');
    if (matches) {
        const submit = () => {
            setBtnLoading(true);

            setNameError(false);
            setIdError(false);
            setEmailError(false);
            setPwdError(false);
            setCheckPwdError(false);

            setNameText("");
            setIdText("");
            setEmailText("");
            setPwdText("");
            setCheckPwdText("");

            const name = document.getElementById('name').value;
            const id = document.getElementById('id').value;
            const email = document.getElementById('email').value;
            const pwd = document.getElementById('pwd').value;
            const checkpwd = document.getElementById('checkpwd').value;

            let isInvalid_st1 = false;
            if (name === "") { setNameError(true); setNameText("필수 입력란입니다."); isInvalid_st1 = true; }
            if (id === "") { setIdError(true); setIdText("필수 입력란입니다."); isInvalid_st1 = true; }
            if (email === "") { setEmailError(true); setEmailText("필수 입력란입니다."); isInvalid_st1 = true; }
            if (pwd === "") { setPwdError(true); setPwdText("필수 입력란입니다."); isInvalid_st1 = true; }
            if (checkpwd === "") { setCheckPwdError(true); setCheckPwdText("필수 입력란입니다."); isInvalid_st1 = true }

            if (isInvalid_st1) {
                setBtnLoading(false);
                return;
            }

            let isInvalid_st2 = false;
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,20}$/;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (name.length <= 1) { setNameError(true); setNameText("이름이 잘못되었습니다."); isInvalid_st2 = true; }
            if (id.length < 3) { setIdError(true); setIdText("아이디는 3글자 이상이여야 합니다."); isInvalid_st2 = true; }
            if (!emailRegex.test(email)) { setEmailError(true); setEmailText("잘못된 이메일입니다."); isInvalid_st2 = true; }
            if (!passwordRegex.test(pwd)) { setPwdError(true); setPwdText("비밀번호는 5자 이상 20자 이하여야 하며, 대문자, 숫자, 특수문자를 사용하여야 합니다."); isInvalid_st2 = true; }
            if (pwd !== checkpwd) { setCheckPwdError(true); setCheckPwdText("입력한 비밀번호가 잘못되었습니다."); isInvalid_st2 = true; }

            if (isInvalid_st2) {
                setBtnLoading(false);
                return;
            }

            $.ajax({
                type: "post",
                url: "https://airwhalespring.onrender.com/signup",
                data: {
                    ctpd: process.env.REACT_APP_CTPD,
                    id: id,
                    pwd: pwd,
                    email: email,
                    name: name
                }
            }).then((response) => {
                if (response.status === "idexist") {
                    setIdError(true);
                    setBtnLoading(false);
                    setIdText("해당 아이디는 이미 사용중입니다.");
                } else if (response.status === "success") {
                    setBtnLoading(false);
                    console.log("success");
                }
            });
        };

        return (
            <div className={"content"}>
                <TopBar/>
                <Box sx={{
                    width: "400px",
                    borderRadius: 1,
                    p: "29px",
                    ml: "auto",
                    mr: "auto",
                    mb: "50px",
                    mt: "50px",
                    boxShadow: 10,
                    bgcolor: "rgba(85,86,173,0.26)"
                }} style={{textAlign: "center"}}>
                    <Typography sx={{ml: "22px"}}
                                style={{fontSize: "1.7rem", fontFamily: "SeoulNamsan", textAlign: "left"}}>가입을 위해서<br/>다음
                        정보를 입력해 주세요</Typography>
                    <Typography sx={{ml: "22px"}} style={{textAlign: "left", fontFamily: "SeoulNamsan"}}>이미 계정이
                        있으신가요? <Link onClick={() => {
                            Redirect(".?pid=login", false);
                        }} style={{cursor: "pointer", color: "#63168d"}} underline={"none"}>지금 로그인하기</Link></Typography>
                    <iframe name="dummyframe" title={"dummyframe"} id="dummyframe" style={{display: "none"}}></iframe>
                    <form target={"dummyframe"} onSubmit={() => submit()} onKeyDown={(e) => {
                        if (e.key === "Enter") submit();
                    }}>
                        <TextField sx={{mt: "20px", width: "350px"}} variant={"standard"} label={"이름"} id={"name"}
                                   type={"name"} error={nameError} helperText={nameText} autoComplete={"cc-name"}/>
                        <TextField sx={{mt: "20px", width: "350px"}} variant={"standard"} label={"아이디"} id={"id"}
                                   type={"id"} error={idError} helperText={idText}/>
                        <TextField sx={{mt: "20px", width: "350px"}} variant={"standard"} label={"이메일"} id={"email"}
                                   error={emailError} helperText={emailText} autoComplete={"email"}/>
                        <TextField sx={{mt: "20px", width: "350px"}} variant={"standard"} label={"비밀번호"} id={"pwd"}
                                   type={"password"} error={pwdError} helperText={pwdText} autoComplete={"new-password"}/>
                        <TextField sx={{mt: "20px", width: "350px"}} variant={"standard"} label={"비밀번호 확인"}
                                   id={"checkpwd"} type={"password"} error={checkPwdError} helperText={checkPwdText} autoComplete={"new-password"}/>
                        <Box sx={{display: "flex", mt: 2, mb: -2, ml: 1.6}} style={{textAlign: "left"}}>
                            <Checkbox id={"checkbx"} onChange={() => {
                                if (document.getElementById("checkbx").checked) setBtnDisable(false);
                                else setBtnDisable(true);
                            }}/>
                            <Typography sx={{mt: 1.24, fontFamily: "SeoulNamsan"}}>개인정보 수집 및 이용에 동의합니다.</Typography>
                        </Box>
                        <LoadingButton variant={"contained"} sx={{width: "350px", height: "50px", mt: "30px"}}
                                style={{fontSize: "1.2rem", fontFamily: "SeoulNamsan"}} type={"submit"} disabled={btnDisable} loading={btnLoading}>가입하기</LoadingButton>
                    </form>
                </Box>
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

export default Signupform;