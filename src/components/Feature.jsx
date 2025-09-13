import { FaUserTie, FaFolder, FaBookOpen, FaGlobe } from "react-icons/fa";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="px-4 sm:px-9 lg:px-12 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <FeatureCard
          icon={<FaUserTie />}
          title="Learn From The Experts"
          description="Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour."
          link="#"
        />
        <FeatureCard
          icon={<FaFolder />}
          title="Book Library & Store"
          description="Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour."
          link="#"
        />
        <FeatureCard
          icon={<FaBookOpen />}
          title="Best Course Online"
          description="Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour."
          link="#"
        />
        <FeatureCard
          icon={<FaGlobe />}
          title="Best Industry Leaders"
          description="Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour."
          link="#"
        />
      </div>
    </section>
  );
}
