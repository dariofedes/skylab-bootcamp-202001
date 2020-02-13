function Feedback({ error }) {
    return <section className="feedback__container">
            <div className="feedback">
                <h3 className="feedback__title">Error</h3>
                <p className="feedback__message">{error}</p>
            </div>
        </section>
}