import { useTranslation } from "react-i18next";

export default function FeatureCard({ icon, title, description, link }) {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  return (
    <div dir={direction} className=" text-center py-6 px-8 mt-8  rounded-lg shadow-md hover:shadow-md transition">
      <div className="flex justify-center items-center h-16 w-16 mx-auto text-4xl text-indigo-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {link && (
        <a
          href={link}
          className="text-indigo-600 font-medium hover:underline"
        >
          {t("Learn More")} →
        </a>
      )}
    </div>
  );
}

