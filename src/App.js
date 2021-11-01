import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import "./App.css";
import Review from "./components/Review";

function App() {
    return (
        <Router>
            <Header />
            <div className="container">
                <Route path="/video/:id">
                    <Review />
                </Route>
                <Route exact path="/">
                    <Content />
                </Route>
            </div>
        </Router>
    );
}

export default App;
