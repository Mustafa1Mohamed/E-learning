import { FaUserTie, FaFolder, FaBookOpen, FaGlobe } from "react-icons/fa";
import FeatureCard from "./FeatureCard";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t, i18n } = useTranslation()
  const direction = i18n.dir()
  return (
    <section dir={direction} className="px-4 sm:px-9 lg:px-12 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <FeatureCard
          icon={<FaUserTie />}
          title={t("Best Teachers")}
          description={t("Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.")}
          link="#"
        />
        <FeatureCard
          icon={<FaFolder />}
          title={t("Book Library & Store")}
          description={t("Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.")}
          link="#"
        />
        <FeatureCard
          icon={<FaBookOpen />}
          title={t("Best Course Online")}
          description={t("Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.")}
          link="#"
        />
        <FeatureCard
          icon={<FaGlobe />}
          title={t("Best Industry Leaders")}
          description={t("Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.")}
          link="#"
        />
      </div>
    </section>
  );
}
