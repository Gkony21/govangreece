import Clip from "@/components/Clip";
import Photo from "@/components/Photo";
import PickButton from "@/components/PickButton";
import type { Dictionary, ServiceId } from "@/content/types";

type PhotoId = Parameters<typeof Photo>[0]["id"];
type ClipId = Parameters<typeof Clip>[0]["id"];

// Each service shows a photo and, where there is one, a short vertical clip of it in action.
const serviceMedia: Record<ServiceId, { photo: PhotoId; clip?: ClipId }> = {
  mirror: { photo: "service-mirror", clip: "clip-mirror" },
  "360": { photo: "service-360", clip: "clip-360" },
  guestbook: { photo: "service-guestbook", clip: "clip-guestbook" },
  van: { photo: "service-van", clip: "clip-van" },
  bar: { photo: "service-bar" },
};

type Props = {
  dict: Dictionary;
};

// The services, read like a bar menu: name, what you get, and an "I want it" button that adds it to the package.
export default function Services({ dict }: Props) {
  const { services } = dict;

  return (
    <section id="services" aria-labelledby="services-title" className="border-b border-line py-20 lg:py-24">
      <div className="wrap">
        <div className="mb-12 grid max-w-[46rem] gap-4">
          <h2 id="services-title" data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            {dict.sections.services.title}
          </h2>
          <p data-reveal className="text-step-1 text-haze">
            {services.lead}
          </p>
        </div>

        <ul className="border-t border-line">
          {services.items.map((service, i) => {
            const { photo, clip } = serviceMedia[service.id];
            return (
              <li
                key={service.id}
                data-reveal={i % 2 ? "right" : "left"}
                className="grid gap-6 border-b border-line py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-14"
              >
                <h3 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[0.95] font-extrabold lg:col-start-1 lg:row-start-1">
                  {service.name}
                  <span className="mt-2 block font-sans text-step--1 leading-snug font-normal text-violet">{service.alias}</span>
                </h3>

                <div className={`grid gap-3 lg:col-start-3 lg:row-start-1 ${clip ? "grid-cols-[minmax(0,1fr)_minmax(0,0.703fr)]" : "max-w-[24rem]"}`}>
                  <Photo
                    id={photo}
                    locale={dict.locale}
                    sizes="(min-width: 1024px) 240px, 60vw"
                    className="aspect-[4/5] w-full rounded-md bg-night-2 object-cover"
                  />
                  {clip && <Clip id={clip} locale={dict.locale} className="aspect-[9/16] w-full rounded-md bg-night-2 object-cover" />}
                </div>

                <div className="grid content-start gap-5 lg:col-start-2 lg:row-start-1">
                  <p className="text-haze">{service.text}</p>

                  {service.options && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {service.options.map((option) => (
                        <div key={option.title} className="rounded-lg border border-line px-4 py-3 text-step--1 text-haze">
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
