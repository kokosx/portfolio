import { AtomIcon, Database, TerminalSquareIcon, Text } from "lucide-react";
import { type ReactElement } from "react";
import { useTranslations } from "next-intl";

const Toolbox = () => {
  const t = useTranslations("Toolbox");

  const toolboxSections: ToolboxSectionProps[] = [
    {
      icon: <TerminalSquareIcon />,
      title: t("languages"),
      items: ["TypeScript", "PHP", "JSX", "Python", "SQL"],
    },
    {
      icon: <AtomIcon />,
      title: t("frameworks"),
      items: ["NEXT.JS", "REACT", "ASTRO", "LARAVEL", "DJANGO"],
    },
    {
      icon: <Database />,
      title: t("infra"),
      items: ["POSTGRESQL", "GITHUB", "MYSQL", "VERCEL", "PostgreSQL"],
    },
    {
      icon: <Text />,
      title: t("tools"),
      items: ["VSCODE", "Git", "TERMINAL", "Linux", "DOCKER"],
    },
  ];

  return (
    <section
      id="toolbox"
      className="w-full bg-background-dark px-6 py-20 md:px-12"
    >
      <div className="mb-12">
        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
          {t("heading")}
        </h3>
        <div className="w-32 h-4 bg-primary"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t-[4px] border-l-[4px] border-off-white">
        {toolboxSections.map((section) => (
          <ToolboxSection key={section.title} {...section} />
        ))}
      </div>
    </section>
  );
};

export default Toolbox;

type ToolboxSectionProps = {
  icon: ReactElement;
  title: string;
  items: string[];
};

const ToolboxSection = ({ icon, title, items }: ToolboxSectionProps) => {
  return (
    <div className="border-r-[4px] border-b-[4px] border-off-white p-8">
      <h5 className="text-primary font-black text-2xl uppercase mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined">{icon}</span>
        {title}
      </h5>
      <ul className="flex flex-col gap-4 text-xl font-bold uppercase tracking-widest">
        {items.map((item) => (
          <ToolboxItem key={item} label={item} />
        ))}
      </ul>
    </div>
  );
};

type ToolboxItemProps = {
  label: string;
};

const ToolboxItem = ({ label }: ToolboxItemProps) => {
  return (
    <li className="flex items-center gap-3">
      <div className="size-3 bg-primary"></div>
      {label}
    </li>
  );
};
