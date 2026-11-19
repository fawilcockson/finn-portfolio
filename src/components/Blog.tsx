const linkedinEmbedUrl = "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7488275612365651969?collapsed=1";

function Blog() {
    return (
        <section className="blog" >
            <h1>About Me</h1>
            <div>
                <p>Hi, I'm Finn Wilcockson, an MEng Computer Science student at Queen's University Belfast. This website hosts my personal works and other stuff I make :D</p>
            </div>
            <div className="social-embeds">
                <article className="social-embed" >
                    <h2>LinkedIn</h2>
                    <p>Spent a year of my life with Xperi</p>
                        <iframe
                            className="social-iframe"
                            src={linkedinEmbedUrl}
                            title="LinkedIn post preview"
                            loading="lazy"
                        />
                </article>
            </div>
        </section>
    );
} 

export default Blog;