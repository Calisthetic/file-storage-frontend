import { Component } from 'react';
import PricingDescription from '../../components/pricing-description';

export default function DiskUpgrade() {
  // <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
  //                       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
  //                   </svg>

  return (
    <div className="min-h-fullWithHeader bg-backgroundSecondLight w-full flex justify-center items-center dark:bg-backgroundSecondDark">
      <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark w-full max-w-7xl grid gap-6 mx-6 lg:grid-cols-3 justify-center items-center">
        <div className="w-full max-w-sm p-8 lg:p-4 xl:p-8 bg-backgroundLight dark:bg-backgroundThirdDark rounded-xl
        dark:border-backgroundThirdDark border-backgroundThirdLight border-2">
          <h5 className="mb-4 text-xl font-medium text-textLight dark:text-textDark opacity-60">Standard</h5>
          <div className="flex items-baseline text-textLight dark:text-textDark">
            <span className="text-5xl font-bold tracking-tight mr-2">{10}</span>
            <span className="text-5xl font-semibold">GB</span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            <PricingDescription active={true} text="10GB storage"></PricingDescription>
            <PricingDescription active={true} text="Documentation access"></PricingDescription>
            <PricingDescription active={true} text=""></PricingDescription>
            <PricingDescription active={false} text="API access"></PricingDescription>
            <PricingDescription active={false} text="Customization with memory"></PricingDescription>
            <PricingDescription active={false} text="Integration help"></PricingDescription>
            <PricingDescription active={false} text="Email support"></PricingDescription>
            <PricingDescription active={false} text=""></PricingDescription>
          </ul>
          <button type="button" className="text-textLight dark:text-textDark bg-buttonLight dark:bg-buttonDark 
          hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark font-medium rounded-lg text-sm px-5 py-2.5 
          inline-flex justify-center w-full text-center">
            <div className="flex items-baseline text-textLight dark:text-textDark">
              <span className="text-2xl font-semibold tracking-tight">FREE</span>
              <span className="ml-1 text-lg font-normal text-textLight dark:text-textDark opacity-90">/month</span>
            </div>
          </button>
        </div>
        <div className="rounded-xl w-full max-w-sm bg-gradient-to-r p-1 from-[#3575db] via-[#9333EA] to-[#e22a3c]">
          <div className="py-7 lg:py-3 xl:py-7 pr-7 lg:pr-3 xl:pr-7 pl-8 lg:pl-4 xl:pl-8 bg-backgroundLight dark:bg-backgroundThirdDark rounded-lg
          dark:border-backgroundThirdDark border-backgroundThirdLight">
            <h5 className="mb-4 text-xl font-medium text-textLight dark:text-textDark opacity-60">VIP</h5>
            <div className="flex items-baseline text-textLight dark:text-textDark">
              <span className="text-5xl font-bold tracking-tight mr-2">{256}</span>
              <span className="text-5xl font-semibold">GB</span>
            </div>
            <ul role="list" className="space-y-5 my-7">
              <PricingDescription active={true} text="1B storage"></PricingDescription>
              <PricingDescription active={true} text="Documentation access"></PricingDescription>
              <PricingDescription active={true} text=""></PricingDescription>
              <PricingDescription active={false} text="API access"></PricingDescription>
              <PricingDescription active={false} text="Customization with memory"></PricingDescription>
              <PricingDescription active={false} text="Integration help"></PricingDescription>
              <PricingDescription active={false} text="Email support"></PricingDescription>
              <PricingDescription active={false} text=""></PricingDescription>
            </ul>
            <button type="button" className="text-textLight dark:text-textDark bg-buttonLight dark:bg-buttonDark 
            hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark font-medium rounded-lg text-sm px-5 py-2.5 
            inline-flex justify-center w-full text-center">
              <div className="flex items-baseline text-textLight dark:text-textDark">
                <span className="text-xl font-semibold">$</span>
                <span className="text-2xl font-extrabold tracking-tight">49</span>
                <span className="ml-1 text-lg font-normal text-textLight dark:text-textDark opacity-90">/month</span>
              </div>
            </button>
          </div>
        </div>
        <div className="w-full max-w-sm p-8 lg:p-4 xl:p-8 bg-backgroundLight dark:bg-backgroundThirdDark rounded-xl
        dark:border-backgroundThirdDark border-backgroundThirdLight border-2">
          <h5 className="mb-4 text-xl font-medium text-textLight dark:text-textDark opacity-60">Premium</h5>
          <div className="flex items-baseline text-textLight dark:text-textDark">
            <span className="text-5xl font-bold tracking-tight mr-2">{1}</span>
            <span className="text-5xl font-semibold">TB</span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            <PricingDescription active={true} text="10GB storage"></PricingDescription>
            <PricingDescription active={true} text="Documentation access"></PricingDescription>
            <PricingDescription active={true} text=""></PricingDescription>
            <PricingDescription active={false} text="API access"></PricingDescription>
            <PricingDescription active={false} text="Customization with memory"></PricingDescription>
            <PricingDescription active={false} text="Integration help"></PricingDescription>
            <PricingDescription active={false} text="Email support"></PricingDescription>
            <PricingDescription active={false} text=""></PricingDescription>
          </ul>
          <button type="button" className="text-textLight dark:text-textDark bg-buttonLight dark:bg-buttonDark 
          hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark font-medium rounded-lg text-sm px-5 py-2.5 
          inline-flex justify-center w-full text-center">
            <div className="flex items-baseline text-textLight dark:text-textDark">
              <span className="text-xl font-semibold">$</span>
              <span className="text-2xl font-extrabold tracking-tight">49</span>
              <span className="ml-1 text-lg font-normal text-textLight dark:text-textDark opacity-90">/month</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}