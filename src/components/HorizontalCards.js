import Link from 'next/link';
import Image from 'next/image';

const HorizontalCards = () => {
  return (
    <div>
        <div className="w-640 h-55 card card-side bg-base-100 shadow-xl mt-5">
            <div className="card-body w-440 mt-5">
                <h2 className="card-title">GreenRadar launch</h2>
                <p> GreenRadar Launches to Help Malaysians Find Recycling Centers Nearby
                    Kuala Lumpur, Malaysia - GreenRadar, a new platform ... </p>
                <div className="card-actions justify-end">

                <Link href="/greenradar_launch">
                    <button className="bg-dark-green hover:bg-dark-green-hover text-white py-2 px-4 rounded mr-1">Read more</button>
                </Link>
                </div>
            </div>
        </div>

        <div className="w-640 h-55 card card-side bg-base-100 shadow-xl mt-5">
            <div className="card-body w-440 mt-5">
                <h2 className="card-title">Recycling tips</h2>
                <p> Recycling tips are super important because they can make a big difference in taking care of our planet! 
                    When we recycle, we help keep ... </p>
                <div className="card-actions justify-end">

                <Link href="/recycling_tips">
                    <button className="bg-dark-green hover:bg-dark-green-hover text-white py-2 px-4 rounded mr-1">Read more</button>
                </Link>
                </div>
            </div>
        </div>

    </div>

        

 );
};

export default HorizontalCards;

// sm:w-96 sm:h-96 lg:w-128 lg:h-128