import Button from "react-bootstrap/Button";
import './header.scss'

export default function Header({setLogin}){

    let logout = () => {
        localStorage.removeItem('token');
        setLogin(false)
    }

    return(
        <header>
            <Button variant="danger" onClick={logout}>
                Log out
            </Button>
        </header>
    )
}