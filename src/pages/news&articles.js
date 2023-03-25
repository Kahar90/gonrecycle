import NavigationBar from "@/components/NavigationBar";
import Image from 'next/image';
import Link from 'next/link';

const NewsArticles = () => {
    return (
        <div>
            <NavigationBar />
            <div className="min-h-screen overflow-hidden p-10">
                <br></br>
                <br></br>
                <h1 className="text-2xl font-bold">News and articles</h1>
                <br></br>
                <p>
                    View latest news articles here: 
                </p>   
            </div> 
        </div>
    );
  }
  
  export default NewsArticles;