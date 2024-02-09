import TopBar from './../templates/TopBar.js';

function Nofication() {
    document.title = "에어웨일 - 공지";

    return (
        <div className={"content"}>
            <TopBar/>
        </div>
    );
}

export default Nofication;