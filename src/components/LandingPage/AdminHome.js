import { CurrentEdiblesList } from "../WildEdibles/CurrentEdiblesList"

export const AdminHome = () => {
    return (
        <div className="container mx-auto p-4 ">
            <div className="container mx-auto font-semibold mb-6 rounded-md bg-fuf-teal text-center py-5 px-20">
                <h1 className="text-3xl">Check out what's ready to harvest this month!!</h1>
                <h3 className="text-l mt-2">To search a complete list, go to "All Wild Edibles".</h3>
            </div>
            <CurrentEdiblesList />
        </div>
    )
}
