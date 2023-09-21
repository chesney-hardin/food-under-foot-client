import { CurrentEdiblesList } from "../WildEdibles/CurrentEdiblesList"


export const UserHome = () => {
    return (
        <>
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-6 rounded-md bg-fuf-teal text-center py-5 px-20">Check out what's ready to harvest!!</h1>
            <CurrentEdiblesList />
        </div>
        </>)
}