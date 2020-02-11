function Header({title, onToInvestments, onToAccount, onLogout, logged, onToLogin, onToRegister }) {
    return <header className="header">
            <a href="" className="header__home"><h1 className="header__logo">{title}</h1></a>
            <nav className="header__menu menu">
                    {logged && <ul className="menu__list">
                            <li className="menu__link" onClick={() => {
                                onToInvestments()
                            }}>
                                My investments
                            </li>
                            <li className="menu__link" onClick={() => {
                                onToAccount()
                            }}>
                                Account
                            </li>
                            <li className="menu__link" onClick={() => {
                                onLogout()
                            }}>
                                Logout
                            </li>
                        </ul>}
                    {!logged && <ul className="menu__list">
                            <li className="menu__link" onClick={() => {
                                onToLogin()
                            }}>
                                Login
                            </li>
                            <li className="menu__link" onClick={() => {
                                onToRegister()
                            }}>
                                Register
                            </li>
                        </ul>}
            </nav>
        </header>
}