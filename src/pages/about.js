import NavigationBar from "@/components/NavigationBar";
import Image from 'next/image';
import Link from 'next/link';

const AboutUsPage = () => {
    return (
        <div>
            <NavigationBar />
            <div className="min-h-screen overflow-hidden p-10">
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image src="/img/aboutus.png" width={1500} height={180} />
                </div>
                <br></br>
                <h1 className="text-2xl font-bold">About Us</h1>
                <br></br>
                <p>
                    <b>GreenRadar</b> is a revolutionary platform designed to help Malaysian users find nearby recycling centers easily. 
                    The platform aims to provide a one-stop solution for users to locate recycling centers, learn about their services and offerings, and make informed decisions about waste disposal.
                    The idea behind GreenRadar is to encourage recycling and promote sustainable living by making it easier for people to dispose of their waste responsibly. 
                </p>   
                <br></br>
                <p>
                    With GreenRadar platform, users no longer have to search for recycling centers manually or rely on traditional methods of waste disposal. Instead, they can access an up-to-date database of recycling centers that is constantly updated with new locations and information.
                    By providing this service, GreenRadar hopes to make recycling a more accessible and convenient option for everyone, while also contributing to the larger goal of creating a more sustainable future for Malaysia. 
                    Whether you're an individual looking to dispose of household waste or a business seeking to recycle. 
                </p> 
            </div>

            <br></br>
            <div className="text-right">
                    <Link href="/maps">
                        <button className="bg-dark-green hover:bg-dark-green-hover text-white py-2 px-4 rounded mr-12">Jom recycle!</button>
                    </Link>
            </div> 
            <br></br>
            <br></br>
        </div>
    );
  }
  
  export default AboutUsPage;