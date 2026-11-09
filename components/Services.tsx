import type { CSSProperties } from "react";
import Clip from "@/components/Clip";
import NeonTitle from "@/components/NeonTitle";
import OptionCycle from "@/components/OptionCycle";
import Photo from "@/components/Photo";
import PickButton from "@/components/PickButton";
import ServiceDetails from "@/components/ServiceDetails";
import type { Dictionary, ServiceId } from "@/content/types";

type PhotoId = Parameters<typeof Photo>[0]["id"];
type ClipId = Parameters<typeof Clip>[0]["id"];

// Each service shows a photo and, where there is one, a short vertical clip of it in action. A service with two versions
// has a photo of each: the first is `photo`, the second `alternate`, and they take turns in the same frame.
const serviceMedia: Record<ServiceId, { photo: PhotoId; clip?: ClipId; alternate?: PhotoId }> = {
  mirror: { photo: "service-mirror", clip: "clip-mirror" },
  "360": { photo: "service-360", clip: "clip-360", alternate: "service-360-overhead" },
  guestbook: { photo: "service-guestbook", clip: "clip-guestbook" },
  van: { photo: "service-van", clip: "clip-van" },
  bar: { photo: "service-bar", clip: "clip-bar" },
};

type Props = {
  dict: Dictionary;
};

// The services, one big scene each: photo and clip side by side, swapping sides down the page, then the name, what you
// get, and an "I want it" button that adds it to the package. On phones the visuals come first.
export default function Services({ dict }: Props) {
  const { services } = dict;

  return (
    <section id="services" aria-labelledby="services-title" style={{ "--halo": "213 140 255" } as CSSProperties} className="py-20 lg:py-24">
      <div className="wrap">
        <div className="mb-12 grid max-w-[46rem] gap-4">
          <h2 id="services-title" data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            <NeonTitle {...dict.sections.services} />
          </h2>
          <p data-reveal className="text-step-1 text-haze">
            {services.lead}
          </p>
        </div>

        <ul>
          {services.items.map((service, i) => {
            const { photo, clip, alternate } = serviceMedia[service.id];
            const photoSizes = "(min-width: 1440px) 380px, (min-width: 1024px) 32vw, 55vw";
            const flip = i % 2 === 1;
            return (
              <li
                key={service.id}
                id={`service-${service.id}`}
                data-reveal={i % 2 ? "right" : "left"}
                data-option={alternate ? "0" : undefined}
                className={`grid gap-4 py-8 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-18 lg:gap-y-6 lg:py-14 ${
                  flip ? "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" : "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
                }`}
              >
                <h3
                  className={`font-display text-[2.6rem] leading-[0.95] font-extrabold lg:row-start-1 lg:text-[clamp(3.4rem,5.4vw,5.2rem)] ${
                    flip ? "lg:col-start-1" : "lg:col-start-2"
                  }`}
                >
                  {service.name}
                  <span className="mt-2 block font-sans text-step--1 leading-snug font-normal text-violet">{service.alias}</span>
                </h3>

                <div
                  className={`-order-1 grid gap-3 lg:order-none lg:row-span-2 lg:row-start-1 ${flip ? "lg:col-start-2" : "lg:col-start-1"} ${
                    clip ? "grid-cols-[minmax(0,1fr)_minmax(0,0.703fr)]" : "max-w-[24rem]"
                  }`}
                >
                  <div className="relative">
                    <Photo id={photo} locale={dict.locale} sizes={photoSizes} className="aspect-[4/5] w-full rounded-md bg-night-2 object-cover" />
                    {alternate && (
                      <>
                        <Photo id={alternate} locale={dict.locale} sizes={photoSizes} className="option-over absolute inset-0 h-full w-full rounded-md object-cover" />
                        <OptionCycle />
                        {service.options?.map((option, index) => (
                          <span key={option.title} aria-hidden="true" data-for={index} className="option-tag">
                            <b>{option.title}</b> · {option.tag}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                  {clip && <Clip id={clip} locale={dict.locale} className="aspect-[9/16] w-full rounded-md bg-night-2 object-cover" />}
                </div>

                <div className={`grid content-start gap-5 lg:row-start-2 ${flip ? "lg:col-start-1" : "lg:col-start-2"}`}>
                  <p className="text-haze">{service.text}</p>

                  <ServiceDetails label={services.more}>
                    {service.options && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {service.options.map((option, index) => (
                          <div key={option.title} data-option-card={index} className="rounded-lg border border-line px-4 py-3 text-step--1 text-haze">
                            <b className="mb-1 block font-normal text-ink">{option.title}</b>
                            {option.text}
                          </div>
                        ))}
                      </div>
                    )}

                    <ul className="flex flex-wrap gap-2 text-step--1">
                      {service.facts.map((fact) => (
                        <li key={fact} className="rounded-full border border-line px-3 py-1">
                          {fact}
                        </li>
                      ))}
                      {service.gift && <li className="rounded-full border border-amber/45 px-3 py-1 text-amber">{service.gift}</li>}
                    </ul>
                  </ServiceDetails>

                  <PickButton id={service.id} label={services.pick} name={service.name} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
