
function Header({removeToken, setOwner}){

    function logout(){
        fetch("http://localhost:8000/logout", {
            method: "POST",
        })
        .then(r => r.json())
        .then(data => {
            removeToken();
            setOwner(null)
        })
    }

    return(
        <div>
            <header>
                <button onClick={logout}>Logout</button>
            </header>
        </div>
    )
}

export default Header;