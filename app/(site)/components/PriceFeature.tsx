import { CheckCircle2, XCircle } from "lucide-react";

interface props {
    text: string;
    status: "active" | "inactive";
}

const PriceFeature: React.FC<props> = ({ status, text }) => {
    return (
        <div className="mb-3 flex items-center">
            <span className="mr-3 flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full">
                {status === "active" ? <CheckCircle2 className="text-green-600" /> : <XCircle className="text-red-600" />}
            </span>

            <p className="m-0 text-base font-medium text-body-color">
                {text}
            </p>
        </div>
    );
};

export default PriceFeature;