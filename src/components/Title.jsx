import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Title() {
    const { t, i18n } = useTranslation();
    const direction = i18n.dir();
    return (
        <h2 dir={direction} className="text-4xl font-extrabold text-indigo-500 text-center mb-8">
            {t("Courses")}
        </h2>
    )
}