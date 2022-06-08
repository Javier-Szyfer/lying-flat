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
            Welcome. This is a collection of 20 NFTs built around the concept of
            &apos;Lying Flat&apos;. You can mint and use the on-site marketplace
            for trading purposes. There are no plans, no roadmap, each NFT has
            no utility at all and the artist will remain anonymous.
            <br />
            <br />
            Have you ever laid on the floor of your apartment and stared at the
            ceiling for hours? Have you ever wondered how many things you really
            need to grow up and die on this planet? Have you ever tried lying
            down and not trying harder than the absolute essentials? <br />
          </p>
          <p className="mt-4">
            Some of us choose to lie down rather than be an exemplary member of
            society. We don&apos;t own a car, have a house or support a family,
            we reject it all by lying down. This is not a trend. It is a
            statement. <br />
            <br />
            The term &apos;Lying Flat&apos;, or -tang ping-, was first coined in
            China as a movement that antagonizes the hegemonic worldview that
            says you have to work incessantly to achieve an ideal of success
            that is measured by accumulation and status.
          </p>
          <p className="mt-4 md:p-0">
            A viral post on the Internet in April 2021 brought it to the
            forefront of many minds, especially the younger generation, and it
            has since gained immense traction in China and is spreading.
            <br />
            <br />
            On the social media platform Baidu Tieba, a man in his twenties
            wrote about how he had embraced this minimalist lifestyle for two
            years: <br />
            <br />
            “Life is just lying down, lying down and lying down,” he said in the
            post, titled “Lying flat is justice”.
          </p>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
