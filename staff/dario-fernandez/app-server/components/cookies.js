function Cookies(props = {}) {
    return `<section class="cookies">
    <div class="cookies__container">
        
    </div>
    <h5 class="cookies__title">We use cookies<h5>
        <form action="/accept-cookies" method="POST" class="cookies__form">
            <button class="cookies__accept">Accept cookies</button>
    </form>
</section>`
}

module.exports = Cookies