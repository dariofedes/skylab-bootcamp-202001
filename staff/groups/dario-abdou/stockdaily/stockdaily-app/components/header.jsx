function Header({title, onToInvestments, onToAccount, onLogout, logged, onToLogin, onToRegister }) {
    return <header className="header">
            <a href="" className="header__home"><h1 className="header__logo">{title}</h1></a>
            <nav className="header__menu menu">
                <i className="fas fa-bars menu__burger" onClick={() => {
                    document.querySelector('.menu__list').classList.toggle('menu__list--show')
                }}></i>
                    {logged && <ul className="menu__list">
                            <li className="menu__link" onClick={() => {
                                document.querySelector('.menu__list').classList.toggle('menu__list--show')
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
                                document.querySelector('.menu__list').classList.toggle('menu__list--show')
                                onLogout()
                            }}>
                                Logout
                            </li>
                        </ul>}
                    {!logged && <ul className="menu__list">
                            <li className="menu__link" onClick={() => {
                                document.querySelector('.menu__list').classList.toggle('menu__list--show')
                                onToLogin()
                            }}>
                                Login
                            </li>
                            <li className="menu__link" onClick={() => {
                                document.querySelector('.menu__list').classList.toggle('menu__list--show')
                                onToRegister()
                            }}>
                                Register
                            </li>
                        </ul>}
            </nav>
        </header>
}