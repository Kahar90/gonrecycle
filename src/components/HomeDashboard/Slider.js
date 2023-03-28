import React from "react";
import Link from 'next/link';
import Image from "next/image";

const SliderComponent = () => {
  return (
    <div>
    <br></br>
    <h1 className="tracking-tight text-2xl font-extrabold text-left ml-5">News & articles</h1>
    <br></br>
    <br></br>
        <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
                <Link href="/greenradar_launch">
                    <Image src="/img/GRbanner1.png" width={1500} height={180} />
                </Link>
                <div className="absolute flex justify-between transform -translate-y-1/2 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle btn-sm" style={{ fontSize: '0.7rem', border: 'none'}}>❯</a>
                </div>
            </div> 
            <div id="slide2" className="carousel-item relative w-full">
                <Link href="/recycling_tips">
                    <Image src="/img/GRbanner2.png" width={1500} height={180} />
                </Link>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle btn-sm" style={{ fontSize: '0.7rem', border: 'none'}}>❮</a> 
                </div>
            </div>
        </div>
    <br></br>
    <br></br>
    </div>
  );
};

export default SliderComponent;
