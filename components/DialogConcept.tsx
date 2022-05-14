import { Dialog } from "@headlessui/react";

export default function DialogConcept({ isOpen, setIsOpen }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center  mb-16 md:mb-16 justify-center w-screen overflow-y-scroll ">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto p-8  bg-stone-900 text-slate-400 flex flex-col self-start lg:self-end justify-center items-center lg:block  lg:columns-2 xl:columns-3 gap-6  ">
          <p className="">
            “Lying flat” is a movement about doing nothing. And that makes it
            about everything. For months, the chatter surrounding lying flat, or
            tang ping, has permeated Chinese society, sowed discourse and become
            ubiquitous enough to finally warrant a public condemnation by
            President Xi Jinping.
            <br />
            <br />
            “It is necessary to prevent the stagnation of the social class,
            unblock the channels for upward social mobility, create
            opportunities for more people to become rich, and form an
            environment for improvement in which everyone participates, avoiding
            involution and lying flat,” Xi said in comments published on October
            15 by the Communist Party’s flagship journal on political theory,
            Qiushi{" "}
          </p>
          <p className="mt-4">
            “Lying flat” essentially means doing the bare minimum to get by, and
            striving for nothing more than what is absolutely essential for
            one’s survival.
            <br />
            <br />
            It represents the mindset of lying down instead of being a
            productive member of society. Rather than striving to study hard,
            buy a home, or even start a family, a subsection of society is
            rejecting it all to lie flat.
          </p>
          <p className="pb-16 md:p-0">
            Unlike many buzzwords that have come before it, “lying flat” does
            not represent a new fad. But a viral online post in April 2021
            brought it to the forefront of many minds, especially the younger
            generation, and it has since gained immense traction in China.
            <br />
            <br />
            On the Baidu Tieba social media platform, a man named Luo Huazhong,
            in his mid-twenties, wrote about how he had embraced this lifestyle
            of minimalism for two years.
            <br />
            <br />
            “Life is just lying down, lying down and lying down,” he said in the
            post, titled “Lying flat is justice”.
          </p>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
