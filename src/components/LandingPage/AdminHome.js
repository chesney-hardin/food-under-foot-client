import { CurrentEdiblesList } from "../WildEdibles/CurrentEdiblesList";

export const AdminHome = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 bg-fuf-teal text-center p-5">Check out what's ready to harvest!!</h1>
            <CurrentEdiblesList />
        </div>
    );
};
