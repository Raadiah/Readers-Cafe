import { Helmet } from "react-helmet-async"

const DevelopmentInProgress = ({pageName})=>{
    return (
        <>
            <Helmet>
                <title>{pageName}</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center text-gray-800">
                {pageName} page will be available soon
            </div>
        </>
    )
}

export default DevelopmentInProgress