import { Helmet } from "react-helmet-async"

const PageNotFound = ()=>{
    return (
        <>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <div className="flex flex-col gap-4 items-center justify-center text-gray-800">
                <img className="mt-24 w-56 h-56" src="/404.jpg" alt="Page Not Found" />
                <span>Page Not Found</span>
            </div>
        </>
    )
}

export default PageNotFound