import { useEffect, useState } from "react";
import FAQ from "./FAQ";
import { useLoaderData } from "react-router-dom";
import baseUrl from "../../routes/sites";

const FAQs = ()=>{
    const [faqs, setFaqs] = useState([])

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch(`${baseUrl}/faq`);
                const data = await res.json();
                setFaqs(data);
            } catch (error) {
                console.error('Error fetching faqs:', error);
            }
        };

        fetchFaqs();
    }, [])

    return (
        <>
            <div className="mt-20 mb-16 pb-4 w-3/4 m-auto">
                <h3 className="font-semibold text-center my-6">Frequently Asked Questions</h3>
                { faqs.map((faq)=>(<FAQ {...faq}></FAQ>)) }
            </div>
        </>
    )
}

export default FAQs