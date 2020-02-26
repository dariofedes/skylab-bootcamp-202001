function Register(props = {}) {
    const { feedback } = props

    return `<section class="register"> 
    <div class="register__container">
        <h1 class="register__title">Sign up</h1>
        <form class="register__form" action="/register" method="POST">
            <input type="text" name="name" class="register__input" placeholder="Name" />
            <input type="text" name="surname" class="register__input" placeholder="Surname" />
            <input type="text" name="username" class="register__input" placeholder="Username" />
            <input type="password" name="password" class="register__input" placeholder="Password" />
            <button class="register__submit" type="submit">Sign up</button>
            ${feedback ? `<p>${feedback.message}</p>` : ''}
        </form>
        <p class="register__cta">
            Do you have an account yet?
            <br />
            <a href="/login" class="register__cta-link">Login</a>
        </p>
    </div>
</section>`
}

module.exports = Register