

import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

export default function Pricing() {
    const { t, i18n } = useTranslation();
    const direction = i18n.dir();

    const theme = useSelector((state) => state.combineTheme.theme);
    const themeBg = theme === 'Dark' ? 'bg-gray-800' : 'bg-gray-50';
    const themeText = theme === 'Dark' ? 'text-white' : 'text-gray-900';

    return (
        <div
            className={`relative isolate py-16 px-5 sm:px-12 lg:px-16 ${theme === 'Dark' ? 'bg-gray-800' : 'bg-white'} ${themeText}`}
            dir={direction}
        >
            {/* background shape */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="mx-auto aspect-[1155/678] w-[289px] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
                ></div>
            </div>

            {/* Title & Subtitle */}
            <div className="mx-auto max-w-4xl text-center ">
                <h2 className="text-base sm:text-lg font-semibold text-indigo-400">
                    {t("pricing_title")}
                </h2>
                <p className="mt-2 text-3xl sm:text-4xl font-semibold">
                    {t("pricing_subtitle")}
                </p>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-sm sm:text-base font-medium">
                {t("pricing_description")}
            </p>

            {/* plans */}
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2">
                {/* Hobby Plan */}
                <div className="rounded-3xl p-8 ring-1 ring-white/10 sm:p-10 shadow-lg bg-white/5 dark:bg-white/5">
                    <h3
                        id="tier-hobby"
                        className="text-base font-semibold text-indigo-400"
                    >
                        {t("hobby_title")}
                    </h3>
                    <p className="mt-4 flex items-baseline gap-x-2">
                        <span className="text-5xl font-semibold tracking-tight">
                            {t("hobby_price")}
                        </span>
                        <span className="text-base">{t("hobby_per_month")}</span>
                    </p>
                    <p className="mt-6 text-base">
                        {t("hobby_description")}
                    </p>
                    <ul className="mt-8 space-y-3 text-sm sm:mt-10">
                        <li className="flex gap-x-3">✔ {t("hobby_feature_1")}</li>
                        <li className="flex gap-x-3">✔ {t("hobby_feature_2")}</li>
                        <li className="flex gap-x-3">✔ {t("hobby_feature_3")}</li>
                        <li className="flex gap-x-3">✔ {t("hobby_feature_4")}</li>
                    </ul>
                    <a
                        href="#"
                        className="mt-8 block rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
                    >
                        {t("hobby_cta")}
                    </a>
                </div>

                {/* Enterprise Plan */}
                <div className={`relative rounded-3xl p-8 ring-1 ring-white/10 sm:p-10 shadow-lg ${theme === 'Dark' ? 'bg-gray-800' : 'bg-white'} ${themeText}`}>
                    <h3
                        id="tier-enterprise"
                        className="text-base font-semibold text-indigo-400"
                    >
                        {t("enterprise_title")}
                    </h3>
                    <p className="mt-4 flex items-baseline gap-x-2">
                        <span className="text-5xl font-semibold tracking-tight">
                            {t("enterprise_price")}
                        </span>
                        <span className="text-base">{t("enterprise_per_month")}</span>
                    </p>
                    <p className="mt-6 text-base">
                        {t("enterprise_description")}
                    </p>
                    <ul className="mt-8 space-y-3 text-sm sm:mt-10">
                        <li className="flex gap-x-3">✔ {t("enterprise_feature_1")}</li>
                        <li className="flex gap-x-3">✔ {t("enterprise_feature_2")}</li>
                        <li className="flex gap-x-3">✔ {t("enterprise_feature_3")}</li>
                        <li className="flex gap-x-3">✔ {t("enterprise_feature_4")}</li>
                        <li className="flex gap-x-3">✔ {t("enterprise_feature_5")}</li>
                        <li className="flex gap-x-3">✔ {t("enterprise_feature_6")}</li>
                    </ul>
                    <a
                        href="#"
                        className="mt-8 block rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
                    >
                        {t("enterprise_cta")}
                    </a>
                </div>
            </div>
        </div>
    );
}
