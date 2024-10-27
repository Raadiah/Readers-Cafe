import { Helmet } from "react-helmet-async"
import FAQs from "../components/faq/FAQs"
import AboutUs from "../components/homepage/AboutUs"
import Banner from "../components/homepage/Banner"
import Categories from "../components/homepage/categories/Categories"
import ContactUs from "../components/homepage/ContactUs"
import HowItWorks from "../components/homepage/HowItWorks"
import TopBooks from "../components/homepage/TopBooks"

function HomePage() {
    const metaDescription = "Reader's Cafe has rare collection of original books from all over the world. You can borrow or lend books, add book reviews, request for books and write blogs for the world to know."
    window.scrollTo(0,0);
    return (
        <>
            <Helmet>
                <title>Reader's Cafe</title>
                <meta name="description" value={metaDescription} />
            </Helmet>
            <div className="min-h-screen flex flex-col">
                <Banner></Banner>
                <div className="space-y-12 md:mx-32 md:my-14 p-4">
                    <HowItWorks></HowItWorks>
                    <Categories></Categories>
                    <TopBooks></TopBooks>
                    <AboutUs></AboutUs>
                    <FAQs></FAQs>
                </div>
            </div>
        </>
    )
}

export default HomePage