import AboutUs from "../components/homepage/AboutUs"
import Banner from "../components/homepage/Banner"
import Categories from "../components/homepage/categories/Categories"
import ContactUs from "../components/homepage/ContactUs"
import HowItWorks from "../components/homepage/HowItWorks"
import TopBooks from "../components/homepage/TopBooks"

function HomePage() {
    window.scrollTo(0,0);
    return (
        <div className="min-h-screen flex flex-col">
            <Banner></Banner>
            <div className="space-y-12 md:mx-32 md:my-14">
                <Categories></Categories>
                <HowItWorks></HowItWorks>
                <TopBooks></TopBooks>
                <AboutUs></AboutUs>
                <ContactUs></ContactUs>
            </div>
        </div>
    )
}

export default HomePage