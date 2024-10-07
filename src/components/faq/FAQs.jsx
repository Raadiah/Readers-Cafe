import FAQ from "./FAQ";
import { useLoaderData } from "react-router-dom";

const FAQs = ()=>{
    const faqs = useLoaderData()

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