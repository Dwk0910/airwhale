import { GetPid, LocalStorage, Redirect } from '../utils/Util';

import {Box, IconButton, styled, Tab, Toolbar, Button, ButtonGroup} from "@mui/material";
import {Menu} from "@mui/icons-material";

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
                <img src={"https://cdn.discordapp.com/attachments/882101878249361468/1204671139151085598/image-removebg-preview_3.png?ex=65d5946d&is=65c31f6d&hm=9daa68347a8f341d9e376157c10068c4282fb2686a631be80dec2ee0813090ca&"} alt={"logo"} width={"150px"} height={"3%"} style={{marginLeft: "1%", cursor: "pointer"}} onClick={() => {Redirect(".", false);}}/>
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
                            <Button variant={"contained"} onClick={() => {
                                Redirect(".?pid=logout", false);
                            }}>로그아웃</Button>
                            <Button>마이페이지</Button>
                        </ButtonGroup>
                    }
                </Box>
            </Toolbar>
        </Box>
    );
}

export default TopBar;