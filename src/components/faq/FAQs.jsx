import { useEffect, useState } from "react";
import apiCall from "../../utils/common/apiCall";
import FAQ from "./FAQ";

const FAQs = ()=>{
    const [faqs, setFAQs] = useState([]);
    const faqJsonUrl = '/faq.json'

    const getFAQs = async () => {
        const faqs = await apiCall(faqJsonUrl);
        setFAQs(faqs);
    };

    useEffect(()=>{
        getFAQs();
    }, [])

    return (
        <>
            <div className="mt-20 mb-16 w-3/4 m-auto">
                <h3 className="font-semibold text-center my-6">Frequently Asked Questions</h3>
                { faqs.map((faq)=>(<FAQ {...faq}></FAQ>)) }
            </div>
        </>
    )
}

export default FAQs