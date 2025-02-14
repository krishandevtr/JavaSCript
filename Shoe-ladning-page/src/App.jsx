import "./App.css";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
const App = ()=>{
  return(
  <main className="relative">
    <Nav/>
    <section className="xl:padding-1 wide:padding-r padding-b">
      < Hero/>
    </section>
    
    <section className="padding">
        popular products
    </section>
    <section className="padding">
       Super Quality
    </section>
    <section className="padding">
       Services
    </section>
    <section className="padding">
       Special Offer
    </section>
    <section className="padding">
       Customer Reviews
    </section>

  </main>
  )
}

export default App;
