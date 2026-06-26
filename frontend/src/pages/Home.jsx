import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Questions from "../components/Questions";
import Reasons from "../components/Reasons";
import Subscription from "../components/Subscription";
import Trends from "../components/Trends";

const Home = () => {
  return (
    <div className="bg-black px-30 text-white">
      <Nav />
      <Trends />
      <Reasons />
      <Questions />
      <Subscription />
      <Footer />
    </div>
  );
};

export default Home;
