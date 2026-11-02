import React from 'react';
import promoYear1Image from "../../assets/promoyear1.png";
import promoImage2 from "../../assets/promoimage2.png";

// --- TABLE VISUAL COMPONENT ---
export const FullTableVisual = ({ isModal }) => (
    <div
        className={`bg-white ${isModal ? "p-6" : "p-2"} flex flex-col items-center select-none w-full`}
    >
        <img
            src={promoImage2}
            alt="Promotional Pricing Matrix"
            className="w-full h-auto object-contain"
        />
    </div>
);

// Simplified visual for non-modal view using the imported asset
export const SimpleTableVisual = ({ isModal }) => (
    <div
        className={`bg-white ${isModal ? "p-8" : "p-4"} flex flex-col items-center select-none w-full`}
    >
        <img
            src={promoYear1Image}
            alt="1-Year & 2-Year Promotional Pricing"
            className="w-full h-auto object-contain"
        />
    </div>
);
