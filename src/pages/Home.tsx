import Blog from "../components/Blog";

function Home() {
    return (
        <div>
            <div>
                <h1>Finn's Portfolio</h1>
                <p>Welcome to my portfolio!</p>
            </div>
            <div>
                <Blog />
            </div>
        </div>
    );
}

export default Home;