import Style from './navbar.module.css'
export default function Navbar() {
    return (
        <nav className={Style.nav}>
            <h1 className={Style.logo}>Quotes</h1>
        </nav>
    )
}