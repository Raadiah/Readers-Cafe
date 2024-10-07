import AboutUs from "../components/homepage/AboutUs"
import Banner from "../components/homepage/Banner"
import ContactUs from "../components/homepage/ContactUs"
import HowItWorks from "../components/homepage/HowItWorks"
import TopBooks from "../components/homepage/TopBooks"

function HomePage() {
    return (
        <div className="min-h-screen flex flex-col justify-between gap-4">
            <Banner></Banner>
            <div className="space-y-12 px-8 py-4 m-2 md:mx-32 md:my-14 bg-white rounded-lg border ">
                <HowItWorks></HowItWorks>
                <TopBooks></TopBooks>
                <AboutUs></AboutUs>
                <ContactUs></ContactUs>
            </div>
        </div>
    )
}

export default HomePage