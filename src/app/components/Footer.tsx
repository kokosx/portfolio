import Link from "next/link";
import LetsBuild from "./LetsBuild";

const Footer = () => {
  return (
    <footer className="w-full bg-off-white text-black p-6 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <LetsBuild />
        <div
          id="contact"
          className="flex flex-col items-end gap-8 w-full md:w-auto"
        >
          <div className="p-8 border-4 border-black w-full text-center hover:bg-primary transition-all cursor-pointer">
            <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              <Link href="mailto:bartosz.kks5@gmail.com">
                BARTOSZ.KKS5@GMAIL.COM
              </Link>
            </span>
          </div>
          <p className="font-bold text-lg uppercase tracking-[0.2em] opacity-60">
            © 2026 DESIGNED_FOR_PERFORMANCE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
