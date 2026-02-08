import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full border-b-[6px] border-off-white bg-background-dark sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
            B.KOKOSZEWSKI
          </h1>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          {headerItems.map((item) => (
            <HeaderItem key={item.href} {...item} />
          ))}
        </div>
        <button className="bg-primary text-black px-6 py-2 text-lg font-black uppercase rounded-sm border-2 border-primary hover:bg-black hover:text-primary transition-all">
          RESUME
        </button>
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
      className="text-xl font-bold tracking-widest hover:text-primary transition-colors"
      href={href}
    >
      {text}
    </Link>
  );
};

const headerItems = [
  {
    href: "#work",
    text: "WORK",
  },
  {
    href: "#toolbox",
    text: "TOOLBOX",
  },
  {
    href: "#contact",
    text: "CONTACT",
  },
];
