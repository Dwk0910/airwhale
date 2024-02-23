import { GetPid, LocalStorage, Redirect } from '../utils/Util';

import {Box, IconButton, styled, Tab, Toolbar, Button, ButtonGroup} from "@mui/material";
import {Menu} from "@mui/icons-material";

import Swal from 'sweetalert2';
import Tabs from '@mui/material/Tabs';

function TopBar() {
    const ls = LocalStorage();
    const id = ls.get("id");

    // noinspection JSValidateTypes
    const StyledTabs = styled((props) => (
        <Tabs
            {...props}
            TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" style={{marginTop: "-11%", marginBottom: "11%"}}/> }}
        />
    ))({
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#097df9',
        }
    });

    //noinspection JSValidateTypes
    const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
        ({ theme }) => ({
            textTransform: 'none',
            marginRight: theme.spacing(-3),
            color: 'gray',
            '&.Mui-selected': {
                color: '#000000',
            }
        }),
    );

    return (
        <Box sx={{
            width: 'auto',
            height: 60,
            paddingBottom: 1
        }} style={{borderBottom: '1px solid #c6c6c6'}}>
            <Toolbar>
                <IconButton size={"large"} style={{marginLeft: "-0.5%", marginTop: "0.5%"}}>
                    <Menu fontSize={"inherit"}/>
                </IconButton>
                <img src={"https://cdn.discordapp.com/attachments/753612337461854302/1210671220199137473/airwhalelogo.png?ex=65eb6870&is=65d8f370&hm=53b08126416de4f2be97ea2932b6a29bf4fd7230f6bb515b151b3fe79dc49653&"} alt={"logo"} width={"150px"} height={"3%"} style={{marginLeft: "1%", cursor: "pointer"}} onClick={() => {Redirect(".", false);}}/>
                <Box sx={{marginLeft: "2%", marginTop: "1%", width: "40%"}}>
                    <StyledTabs value={(isNaN(Number(GetPid()))) ? false : Number(GetPid())} onChange={(event, newValue) => {
                        Redirect((newValue !== 1) ? ".?pid=" + newValue : ".", false);
                    }}>
                        <StyledTab label={"홈"} value={1} style={{fontSize: "1.1rem", fontFamily: "SeoulNamsan"}}/>
                        <StyledTab label={"공지"} value={2} style={{fontSize: "1.1rem", fontFamily: "SeoulNamsan"}}/>
                        <StyledTab label={"안내"} value={3} style={{fontSize: "1.1rem", fontFamily: "SeoulNamsan"}}/>
                        <StyledTab label={"규정"} value={4} style={{fontSize: "1.1rem", fontFamily: "SeoulNamsan"}}/>
                    </StyledTabs>
                </Box>
                <Box sx={{marginTop: "1%", ml: "auto", mr: "5%", mb: "0.5%"}}>
                    {
                        (id === null) ? <Button variant={"outlined"} style={{fontFamily: "SeoulNamsan"}} onClick={() => {
                            Redirect(".?pid=login", false);
                            }}>로그인</Button> :
                            <ButtonGroup variant={"outlined"}>
                                <Button variant={"contained"} style={{fontFamily: "SeoulNamsan"}} onClick={() => {
                                    Swal.fire({
                                        toast: true,
                                        text: "정말 로그아웃 하시겠습니까?",
                                        confirmButtonText: "<span style=\"font-family: 'SeoulNamsan', sans-serif;\">네</span>",
                                        cancelButtonText: "<span style=\"font-family: 'SeoulNamsan', sans-serif;\">아니요</span>",
                                        showCancelButton: true,
                                        showDenyButton: false,
                                        icon: "question"
                                    }).then((response) => {
                                        if (response.isConfirmed) {
                                            Redirect(".?pid=logout", false);
                                        }
                                    });
                                }}>로그아웃</Button>
                                <Button style={{fontFamily: "SeoulNamsan"}}>마이페이지</Button>
                            </ButtonGroup>
                    }
                </Box>
            </Toolbar>
        </Box>
    );
}

export default TopBar;