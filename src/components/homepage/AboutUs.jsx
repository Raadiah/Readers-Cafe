import SectionHeader from "../common/SectionHeader"

const AboutUs = ()=>{
    return (
        <>  
            <div className="space-y-4">
                <SectionHeader headerText='About Developer'></SectionHeader>
                <div className="avatar flex justify-center">
                    <div className="mask mask-squircle w-24">
                        <img src="https://static.vecteezy.com/system/resources/previews/015/943/189/non_2x/illustration-of-beautiful-muslim-woman-wearing-hijab-free-vector.jpg" />
                    </div>
                </div>
                <div className="text-justify">Soomanib Kamruzzaman, the owner of the website, is a book-lover just like you. In her professional life, she is a government official specialized in Software Engineering. She mostly works with Vue, React and Laravel. She wants to pursue higher studies on advanced computer science technologies in future.</div>
            </div>
        </>
    )
}

export default AboutUs