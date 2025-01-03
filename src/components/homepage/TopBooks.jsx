import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import TopBook from "./TopBook";
import SectionHeader from "../common/SectionHeader";
import baseUrl from "../../routes/sites";

const TopBooks = ()=>{
    const [topBooks, setTopBooks] = useState([]);
    const getTopBooks = async ()=>{
        const topBooksJson = await fetch(`${baseUrl}/featured`);
        const topBooks = await topBooksJson.json();
        setTopBooks(topBooks);
    }

    useEffect(()=>{
        getTopBooks();
    }, []);

    return (
        <>
            <div>
                <SectionHeader headerText='Our Latest Collections'></SectionHeader>
                <div className="border rounded-lg shadow-md p-4">
                    <Marquee autoFill="true" speed={50}>
                        {
                            topBooks?.map((topBook, index)=><TopBook key={index+1} {...topBook}></TopBook>)
                        }
                    </Marquee>
                </div>
            </div>
        </>
    )
}

export default TopBooks