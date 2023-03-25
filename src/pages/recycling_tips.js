import NavigationBar from "@/components/NavigationBar";
import Image from 'next/image';

const RecyclingTips = () => {
    return (
        <div>
            <NavigationBar />
            <div className="min-h-screen overflow-hidden p-10">
                <br></br>
                <br></br>
                <h1 className="text-2xl font-bold">Recycling tips</h1>
                <br></br>
                <h2><b>Tip #1: Sort Your Waste</b></h2> <br></br>
                <p>One of the most important things you can do to recycle effectively is to sort your waste properly. Make sure you separate your recyclables from your non-recyclables, and sort your recyclables by material type. This will make it easier for recycling centers to process your waste and ensure that your recyclables are recycled.</p>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src="/img/article/recycle.jpg" alt="Sorting waste" width={500} height={333}/>
                </div>
                <br></br>
                <h2><b>Tip #2: Recycle Electronic Waste</b></h2> <br></br>
                <p>Electronic waste, or e-waste, can be recycled to recover valuable materials and prevent them from ending up in landfills. If you have old electronics such as phones, computers, or TVs, make sure to recycle them at a proper e-waste recycling center. Many electronic stores and manufacturers also offer e-waste recycling programs.</p>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src="/img/article/phone.jpg" alt="E-waste recycling" width={500} height={333}/>
                </div>
                <br></br>
                <h2><b>Tip #3: Compost Food Scraps</b></h2><br></br>
                <p>Food scraps can be composted to create nutrient-rich soil for gardening. If you have a garden, consider composting your food scraps instead of throwing them in the trash. You can also find community composting programs in some areas. Composting not only reduces waste, but it also helps to promote sustainable agriculture.</p>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src="/img/article/compost.jpg" alt="Composting" width={500} height={333}/>
                </div>
                <br></br>
                <h2><b>Tip #4: Reduce Plastic Waste</b></h2><br></br>
                <p>Plastic waste is a major environmental issue. To reduce your plastic waste, try using reusable bags, water bottles, and food containers. When you do use plastic, make sure to recycle it properly. Plastic bags, for example, can be recycled at some grocery stores.</p>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src="/img/article/plastic_waste.jpg" alt="Reducing plastic waste" width={500} height={333}/>
                </div>
                <br></br>
                <h2><b>Tip #5: Donate Old Clothing and Household Items</b></h2><br></br>
                <p>Donating old clothing and household items is a great way to reduce waste and help those in need. Many charities and non-profit organizations accept donations of clothing, furniture, and other household items. By donating, you're not only helping the environment, but you're also helping those in need.</p>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src="/img/article/clothes.jpg" alt="Donating clothing" width={500} height={333}/>  
                </div>
                <br></br>
            </div> 
        </div>
    );
  }
  
  export default RecyclingTips;