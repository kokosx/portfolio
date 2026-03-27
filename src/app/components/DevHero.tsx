import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const DevHero = () => {
  const t = useTranslations("DevHero");

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 w-full border-b-[6px] border-off-white">
      <div className="lg:col-span-7 p-6 md:p-12 flex flex-col justify-center border-b-[6px] lg:border-b-0 lg:border-r-[6px] border-off-white">
        <span className="text-primary font-bold text-xl mb-4 tracking-[0.3em] uppercase underline decoration-4 underline-offset-8">
          {t("status")}
        </span>
        <h2 className="text-huge font-black tracking-tighter uppercase mb-8">
          {t("heading_1")} <br />
          {t("heading_2")} <br />
          <span className="text-primary italic">{t("heading_3")}</span>
        </h2>
        <p className="max-w-xl text-xl md:text-2xl font-medium leading-relaxed opacity-80">
          {t("description")}
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="#work"
            className="bg-off-white text-black px-10 py-5 text-xl font-black uppercase hover:bg-primary transition-colors text-center"
          >
            {t("btn_projects")}
          </Link>
          <Link
            href="#contact"
            className="border-4 border-off-white text-off-white px-10 py-5 text-xl font-black uppercase hover:bg-off-white hover:text-black transition-colors text-center"
          >
            {t("btn_contact")}
          </Link>
        </div>
      </div>
      <div className="lg:col-span-5 relative min-h-[400px] lg:h-auto bg-neutral-900 group">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
        <Image
          loading="eager"
          alt="Portrait"
          className="w-full h-full object-cover grayscale brightness-75 contrast-125"
          data-alt="High contrast monochrome portrait of a developer"
          fill
          src="/image_dev.webp"
        />
        <div className="absolute bottom-6 right-6 border-2 border-primary p-4 bg-black/80 backdrop-blur-sm">
          <p className="text-primary font-mono text-sm uppercase tracking-tighter">
            {t("loc")}
          </p>
          <p className="text-primary font-mono text-sm uppercase tracking-tighter">
            {t("role")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DevHero;
