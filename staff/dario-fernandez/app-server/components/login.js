function Login(props = {}) {
    const { feedback, acceptCookies} = props

    return `<section class="login">
    <div class="login__container">
        <h3 class="login__title">
            Login
        </h3>
        <form class="login__form" action="/login" method="POST">
            <input type="text" class="login__input" name="username" placeholder="Username" />
            <input type="password" class="login__input" name="password" placeholder="Password" />
            <button type="submit" class="login__submit">
                Login
            </button>
            ${feedback ? `<p>${feedback.message}</p>` : ''}
        </form>
        <p class="login__register-cta">
            Don't have an account yet?
            <br />
            <a href="/register" class="login__cta-link">Sign up</a>
        </p>
    </div>
</section>`
}

module.exports = Login


