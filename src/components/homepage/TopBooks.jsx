import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import TopBook from "./TopBook";
import SectionHeader from "../common/SectionHeader";

const TopBooks = ()=>{
    const [topBooks, setTopBooks] = useState([]);
    const getTopBooks = async ()=>{
        const topBooksJson = await fetch('json/featured.json');
        const topBooks = await topBooksJson.json();
        setTopBooks(topBooks);
    }

    useEffect(()=>{
        getTopBooks();
    }, []);

    return (
        <>
            <SectionHeader headerText='Our Latest Collections'></SectionHeader>
            <div className="border p-4">
                <Marquee autoFill="true" pauseOnHover="true" speed={50}>
                    {
                        topBooks?.map((topBook)=><TopBook {...topBook}></TopBook>)
                    }
                </Marquee>
            </div>
        </>
    )
}

export default TopBooks