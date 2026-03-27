import Link from "next/link";
import { useTranslations } from "next-intl";

const LetsBuild = () => {
  const t = useTranslations("LetsBuild");
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-huge font-black uppercase tracking-tighter leading-none">
        {t("line1")}
        <br />
        {t("line2")}
      </h2>
      <div className="flex gap-8 mt-4 font-black text-2xl underline decoration-4 underline-offset-8">
        {contactItems.map((item) => (
          <ContactElement key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
};

export default LetsBuild;

const contactItems = [
  {
    href: "https://github.com/kokosx",
    text: "GITHUB",
  },
  {
    href: "https://www.linkedin.com/in/bartosz-kokoszewski-pl",
    text: "LINKEDIN",
  },
];

type ContactProps = {
  href: string;
  text: string;
};

const ContactElement = ({ href, text }: ContactProps) => {
  return (
    <Link
      target="_blank"
      rel="noreferrer"
      className="hover:text-primary transition-colors"
      href={href}
    >
      {text}
    </Link>
  );
};
