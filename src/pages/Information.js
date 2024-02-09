import TopBar from './../templates/TopBar.js';

function Information() {
    document.title = "에어웨일 - 안내";

    return (
        <div className={"content"}>
            <TopBar/>
        </div>
    );
}

export default Information;