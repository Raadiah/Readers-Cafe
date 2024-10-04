import AboutUs from "../components/homepage/AboutUs"
import Banner from "../components/homepage/Banner"
import ContactUs from "../components/homepage/ContactUs"
import HowItWorks from "../components/homepage/HowItWorks"
import TopBooks from "../components/homepage/TopBooks"

function HomePage() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Banner></Banner>
            <div className="space-y-12 m-2 md:w-2/3 md:m-auto">
                <HowItWorks></HowItWorks>
                <TopBooks></TopBooks>
                <ContactUs></ContactUs>
                <AboutUs></AboutUs>
            </div>
        </div>
    )
}

export default HomePage