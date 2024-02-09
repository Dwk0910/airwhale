import TopBar from './../templates/TopBar.js'

function Main() {
    document.title = "에어웨일 - 홈";

    return (
        <div className={"content"}>
            <TopBar/>
        </div>
    );
}

export default Main;