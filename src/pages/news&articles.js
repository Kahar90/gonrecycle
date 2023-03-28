import HorizontalCards from "@/components/HorizontalCards";
import NavigationBar from "@/components/NavigationBar";

const NewsArticles = () => {
    return (
        <div>
            <NavigationBar />
            <div className="min-h-screen overflow-hidden p-10" style={{ backgroundImage: "url('/img/background2.png')" }}>
                <br></br>
                <br></br>
                <h1 className="text-2xl font-bold">News and articles</h1>
                <br></br>
                <p>
                    View latest news articles here: 
                </p>   
                <HorizontalCards/>
            </div> 
        </div>
    );
  }
  
  export default NewsArticles;