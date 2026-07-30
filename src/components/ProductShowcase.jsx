import {useState} from "react";
import {assets} from "../assets/assets.js";

const ProductShowcase = () => {
    const [broken, setBroken] = useState(false);

    return (
        <section className="pb-20 md:pb-32">
            <div className="container mx-auto px-8 sm:px-16 md:px-24 lg:px-32">
                {!broken ? (
                    <img
                        src={assets.landing}
                        className="w-full h-auto object-cover rounded-lg shadow-xl"
                        alt="Money Manager App Dashboard"
                        onError={() => setBroken(true)}
                    />
                ) : (
                    <div className="w-full aspect-[2/1] rounded-lg shadow-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                        <div className="text-center px-6">
                            <p className="text-3xl font-bold text-purple-800">Money Manager</p>
                            <p className="text-purple-600 mt-2">Track income, expenses & goals in one place</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductShowcase;
