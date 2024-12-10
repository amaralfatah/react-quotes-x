import {useEffect, useState} from "react"
import PuffLoader from "react-spinners/PuffLoader"
import Button from "../Button"
import Style from "./quote.module.css"

export default function Quote() {
    const [quote, setQuote] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    async function getQuote(controller) {
        setIsLoading(true)
        const signal = controller.signal
        const res = await fetch("https://api.quotable.io/random", {signal})
        const data = await res.json()

        setQuote(data)
        setIsLoading(false)
    }

    useEffect(() => {
        const controller = new AbortController()

        getQuote(controller)

        return () => {
            controller.abort()
        }
    }, [])

    function randomQuote() {
        const controller = new AbortController()
        getQuote(controller)
    }

    return (
        <div className={Style.container}>
            <h2 className={Style.title}>Quote History</h2>
            {isLoading ? (
                <PuffLoader size={40} cssOverride={{marginBlock: "1rem"}}/>
            ) : (
                <>
                    <h4 className={Style.quote}>{`"${quote.content}"`}</h4>
                    <p className={Style.author}>{quote.author}</p>
                </>
            )}
            <Button onClick={randomQuote} disabled={isLoading}>
                Generate
            </Button>
        </div>
    )
}
