import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const t = useTranslations("Header");
  const locale = useLocale();

  const headerItems = [
    {
      href: localizedPath(locale, "/blog"),
      text: t("blog"),
    },
    {
      href: localizedPath(locale, "/#work"),
      text: t("work"),
    },
    {
      href: localizedPath(locale, "/#toolbox"),
      text: t("toolbox"),
    },
    {
      href: localizedPath(locale, "/#contact"),
      text: t("contact"),
    },
  ];

  return (
    <header className="w-full border-b-[6px] border-off-white bg-background-dark sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-4">
          <Link
            href={localizedPath(locale, "/")}
            className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic transition-colors hover:text-primary"
          >
            B.KOKOSZEWSKI
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          {headerItems.map((item) => (
            <HeaderItem key={item.href} {...item} />
          ))}
        </div>
        <div className="flex items-center gap-6">
          <LanguageSwitcher />
          <button className="bg-primary text-black px-6 py-2 text-lg font-black uppercase rounded-sm border-2 border-primary hover:bg-black hover:text-primary transition-all">
            {t("resume")}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

type ItemProps = {
  href: string;
  text: string;
};

const HeaderItem = ({ href, text }: ItemProps) => {
  return (
    <Link
      className="text-xl font-bold tracking-widest hover:text-primary transition-colors flex items-center justify-center w-40 lg:w-44 whitespace-nowrap"
      href={href}
    >
      {text}
    </Link>
  );
};
