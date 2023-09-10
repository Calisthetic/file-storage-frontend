import { FunctionComponent, lazy } from "react";
import { motion } from "framer-motion";
import "../../../styles/focus-elems.css";
const FontAppearance = lazy(() => import("./font-appearance"));
const CustomThemeAppearance = lazy(() => import("./custom-theme-appearance"));
const ThemeAppearance = lazy(() => import("./theme-appearance"));

interface UserAppearanceProps {}

const UserAppearance: FunctionComponent<UserAppearanceProps> = () => {
  return (
    <div className="text-textLight dark:text-textDark min-h-fullWithHeader flex flex-col items-center">
      <div className="text-textLight dark:text-textDark font-normal overflow-y-hidden
      w-[calc(100dvw-24px)] sm:w-[calc(100dvw-256px-24px)] lg:w-[740px]">
        <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0, damping: 24, stiffness: 300}} 
        className="border-b border-borderLight dark:border-borderDark py-4">
          <p className="text-xl font-semibold">Appearance</p>
          <p className="opacity-80 dark:opacity-70 text-sm">Customize the appearance of the app. Automatically switch between day and night themes.</p>
        </motion.div>
        <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.05, damping: 24, stiffness: 300}} 
        className="pt-6">
          <ThemeAppearance></ThemeAppearance>
        </motion.div>
        <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.1, damping: 24, stiffness: 300}} 
        className="pt-6">
          <CustomThemeAppearance></CustomThemeAppearance>
        </motion.div>
        <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.15, damping: 24, stiffness: 300}} 
        className="pt-8">
          <FontAppearance></FontAppearance>
        </motion.div>
      </div>
    </div>
  );
};

export default UserAppearance;
