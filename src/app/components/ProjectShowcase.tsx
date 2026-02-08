import { ArrowRight } from "lucide-react";

const ProjectShowcase = () => {
  return (
    <section id="work" className="w-full bg-background-dark">
      {projectItems.map((project, i) => (
        <ProjectElement key={i} {...project} order={i + 1} />
      ))}
    </section>
  );
};

export default ProjectShowcase;

const projectItems = [
  {
    href: "#",
    text: "Financial Dashboard",
    tags: ["TYPESCRIPT", "RUST", "WEBSOCKETS"],
  },
  {
    href: "#",
    text: "Neural Interface",
    tags: ["PYTHON", "C++", "CUDA"],
  },
  {
    href: "#",
    text: "E-COMMERCE ENGINE",
    tags: ["NEXT.JS", "GO", "POSTGRES"],
  },
];

type ProjectProps = {
  href: string;
  text: string;
  tags: string[];
  order: number;
};

const ProjectElement = ({ href, tags, text, order }: ProjectProps) => {
  return (
    <div className="group border-b-[4px] border-off-white hover:bg-primary/5 transition-all">
      <a
        className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-12 gap-8"
        href={href}
      >
        <div className="flex flex-col gap-2">
          <span className="text-primary font-mono text-lg">
            0{order} / PROJECT
          </span>
          <h4 className="text-4xl md:text-8xl font-black uppercase hover-lime transition-all">
            {text}
          </h4>
        </div>
        <div className="flex flex-col md:items-end gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-off-white text-black px-3 py-1 font-bold text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="material-symbols-outlined text-6xl group-hover:translate-x-4 transition-transform text-primary">
            <ArrowRight />
          </span>
        </div>
      </a>
    </div>
  );
};
