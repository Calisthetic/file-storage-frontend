import { motion } from "framer-motion"
import PricingDescription from '../../components/pricing-description';

export default function DiskUpgrade() {
  let currentTariff: number = 0
  let firstPriceId: number = 0
  let secondPriceId: number = 1
  let thirdPriceId: number = 2

  let isDarkMode:boolean = false;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode = true
  }

  return (
    <div className="min-h-fullWithHeader bg-backgroundSecondLight w-full flex justify-center items-center dark:bg-backgroundSecondDark">
      <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark w-full max-w-7xl grid gap-6 mx-6 lg:grid-cols-3 justify-center items-center">
        <motion.div initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0, stiffness: 300, damping: 24}} 
        className="w-full h-full max-w-sm p-4 xl:p-8 bg-backgroundLight dark:bg-backgroundThirdDark rounded-xl
        dark:border-backgroundThirdDark border-backgroundThirdLight border-2 flex flex-col justify-between" 
        style={{boxShadow: currentTariff === 0 ? "0px 0px 8px 0px " + getComputedStyle(document.body).getPropertyValue("--shadow" + (
          isDarkMode === true ? "Dark" : "Light"
        )) : "none"}}>
          <div>
            <h5 className="mb-4 text-xl font-medium text-textLight dark:text-textDark opacity-60">Standard</h5>
            <div className="flex items-baseline text-textLight dark:text-textDark">
              <span className="text-5xl font-bold tracking-tight mr-2">{10}</span>
              <span className="text-5xl font-semibold">GB</span>
            </div>
            <ul role="list" className="space-y-5 my-7">
              <PricingDescription active={true} text="Uploading large files - up to 500 MB"></PricingDescription>
              <PricingDescription active={true} text="Documentation access"></PricingDescription>
              <PricingDescription active={true} text="Email support"></PricingDescription>
              <PricingDescription active={false} text="Customization with memory"></PricingDescription>
              <PricingDescription active={false} text="Without advertising"></PricingDescription>
              <PricingDescription active={false} text="API access"></PricingDescription>
              <PricingDescription active={false} text="Integration help"></PricingDescription>
            </ul>
          </div>
          <button type="button" className="text-textLight dark:text-textDark bg-buttonLight dark:bg-buttonDark 
          hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark font-medium rounded-lg text-sm px-5 py-2.5 
          inline-flex justify-center w-full text-center h-min transition-colors" 
          style={{cursor: currentTariff === firstPriceId ? "default" : "pointer"}} 
          onClick={() => {if (currentTariff !== firstPriceId) {console.log("change")}}}>
            {currentTariff === firstPriceId ? (
              <div className="flex items-baseline text-textLight dark:text-textDark">
                <span className="text-2xl font-semibold tracking-tight">Selected</span>
              </div>
            ) : (
              <div className="flex items-baseline text-textLight dark:text-textDark">
                <span className="text-2xl font-semibold tracking-tight">FREE</span>
                <span className="ml-1 text-lg font-normal text-textLight dark:text-textDark opacity-90">/month</span>
              </div>
            )}
          </button>
        </motion.div>
        <motion.div initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.1, stiffness: 300, damping: 24}}
        // from-[#3575db] via-[#9333EA] to-[#e22a3c]
        className="rounded-xl h-full w-full max-w-sm p-1 bg-gradient-to-tr from-[#3575db] via-[#9333EA] to-[#e22a3c]"
        style={{boxShadow: currentTariff === 1 ? "0px 0px 8px 0px " + getComputedStyle(document.body).getPropertyValue("--shadow" + (
          isDarkMode === true ? "Dark" : "Light"
        )) : "none"}}>
          <div className="py-3 xl:py-7 pr-3 xl:pr-7 h-full pl-4 xl:pl-8 bg-backgroundLight dark:bg-backgroundThirdDark rounded-lg
          dark:border-backgroundThirdDark border-backgroundThirdLight transition-all flex flex-col justify-between">
            <div>
              <h5 className="mb-4 text-xl font-medium text-textLight dark:text-textDark opacity-60">VIP</h5>
              <div className="flex items-baseline text-textLight dark:text-textDark">
                <span className="text-5xl font-bold tracking-tight mr-2">{256}</span>
                <span className="text-5xl font-semibold">GB</span>
              </div>
              <ul role="list" className="space-y-5 my-7">
              <PricingDescription active={true} text="Uploading large files - up to 1 GB"></PricingDescription>
              <PricingDescription active={true} text="Documentation access"></PricingDescription>
              <PricingDescription active={true} text="Email support 24/7"></PricingDescription>
              <PricingDescription active={true} text="Customization with memory"></PricingDescription>
              <PricingDescription active={true} text="Without advertising"></PricingDescription>
              <PricingDescription active={true} text="API access - 10k req/month"></PricingDescription>
              <PricingDescription active={false} text="Integration help"></PricingDescription>
              </ul>
            </div>
            <button type="button" className="text-textLight dark:text-textDark bg-buttonLight dark:bg-buttonDark 
            hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark font-medium rounded-lg text-sm px-5 py-2.5 
            inline-flex justify-center w-full text-center h-min transition-colors"
            style={{cursor: currentTariff === secondPriceId ? "default" : "pointer"}} 
            onClick={() => {if (currentTariff !== secondPriceId) {console.log("change")}}}>
                {currentTariff === secondPriceId ? (
                  <div className="flex items-baseline text-textLight dark:text-textDark">
                    <span className="text-2xl font-semibold tracking-tight">Selected</span>
                  </div>
                ) : (
                  <div className="flex items-baseline text-textLight dark:text-textDark">
                    <span className="text-xl font-semibold">$</span>
                    <span className="text-2xl font-extrabold tracking-tight">{5}</span>
                    <span className="ml-1 text-lg font-normal text-textLight dark:text-textDark opacity-90">/month</span>
                  </div>
                )}
            </button>
          </div>
        </motion.div>
        <motion.div initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.05, stiffness: 300, damping: 24}}
        className="w-full h-full max-w-sm p-4 xl:p-8 bg-backgroundLight dark:bg-backgroundThirdDark rounded-xl
        dark:border-backgroundThirdDark border-backgroundThirdLight border-2 flex flex-col justify-between"
        style={{boxShadow: currentTariff === 2 ? "0px 0px 8px 0px " + getComputedStyle(document.body).getPropertyValue("--shadow" + (
          isDarkMode === true ? "Dark" : "Light"
        )) : "none"}}>
          <div>
            <h5 className="mb-4 text-xl font-medium text-textLight dark:text-textDark opacity-60">Premium</h5>
            <div className="flex items-baseline text-textLight dark:text-textDark">
              <span className="text-5xl font-bold tracking-tight mr-2">{1}</span>
              <span className="text-5xl font-semibold">TB</span>
            </div>
            <ul role="list" className="space-y-5 my-7">
              <PricingDescription active={true} text="Uploading large files - from 1 GB"></PricingDescription>
              <PricingDescription active={true} text="Documentation access"></PricingDescription>
              <PricingDescription active={true} text="Email support 24/7"></PricingDescription>
              <PricingDescription active={true} text="Customization with memory"></PricingDescription>
              <PricingDescription active={true} text="Without advertising"></PricingDescription>
              <PricingDescription active={true} text="API access - unlimited"></PricingDescription>
              <PricingDescription active={true} text="Integration help"></PricingDescription>
            </ul>
          </div>
          <button type="button" className="text-textLight dark:text-textDark bg-buttonLight dark:bg-buttonDark 
          hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark font-medium rounded-lg text-sm px-5 py-2.5 
          inline-flex justify-center w-full text-center h-min transition-colors"
          style={{cursor: currentTariff === thirdPriceId ? "default" : "pointer"}} 
          onClick={() => {if (currentTariff !== thirdPriceId) {console.log("change")}}}>
            {currentTariff === thirdPriceId ? (
              <div className="flex items-baseline text-textLight dark:text-textDark">
                <span className="text-2xl font-semibold tracking-tight">Selected</span>
              </div>
            ) : (
              <div className="flex items-baseline text-textLight dark:text-textDark">
                <span className="text-xl font-semibold">$</span>
                <span className="text-2xl font-extrabold tracking-tight">{18}</span>
                <span className="ml-1 text-lg font-normal text-textLight dark:text-textDark opacity-90">/month</span>
              </div>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  )
}