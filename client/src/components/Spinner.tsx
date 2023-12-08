import React from "react";

export const Spinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        </div>
    );
}