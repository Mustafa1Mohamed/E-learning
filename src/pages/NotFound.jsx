import { useTranslation } from "react-i18next";


function NotFound() {
    const { t, i18n } = useTranslation();
    const direction = i18n.dir();
    return (
        <div dir={direction} className='text-3xl text-indigo-500'>{t("Not Found")}</div>
    )
}

export default NotFound   