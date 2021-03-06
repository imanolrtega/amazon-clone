import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Cart from "./components/cart/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { db, auth } from "./firebase";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = () => {
    db.collection("cartItems").onSnapshot((snapshot) => {
      const tempItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        product: doc.data(),
      }));
      setCartItems(tempItems);
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
      setUser(null);
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <Router>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className="App">
          <header className="App-header">
            <Header user={user} cartItems={cartItems} signOut={signOut} />
            <Switch>
              <Route path="/login">
                <Login setUser={setUser} />
              </Route>
              <Route path="/cart">
                <Cart cartItems={cartItems} />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </header>
        </div>
      )}
    </Router>
  );
}

export default App;
