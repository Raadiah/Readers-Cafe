const FAQ = ({question, answer})=>{
    return (
        <>
            <details className="collapse border">
                <summary className="collapse-title font-semibold">{question}</summary>
                <div className="collapse-content">
                    <p>{answer}</p>
                </div>
            </details>
        </>
    )
}

export default FAQ