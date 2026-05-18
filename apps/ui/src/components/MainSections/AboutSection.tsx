import Image from "next/image"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full px-6 py-32 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-[1352px] grid-cols-1 items-center gap-12 lg:grid-cols-[644px_1fr] lg:gap-16">
        {/* Team image with red blur halo */}
        <div className="relative w-full">
          <div
            className="absolute -inset-4 rounded-full opacity-20 blur-[64px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(246,40,40,1) 0%, rgba(255,77,77,1) 100%)",
            }}
          />
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <Image
              src="/landing-new/team.png"
              alt="The Seraj Media team"
              fill
              sizes="(min-width: 1024px) 644px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="max-w-[640px]">
          <p className="text-[12px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
            About Us
          </p>
          <h2 className="mt-5 text-[clamp(32px,5vw,48px)] leading-[1.05] font-[700] tracking-[-0.01em] text-[#FAFAFA]">
            We don&apos;t just show ads.{" "}
            <span className="bg-[linear-gradient(169deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
              We make them impossible to miss.
            </span>
          </h2>
          <p className="mt-6 max-w-[640px] text-[16px] leading-[1.625] text-[#A6A6A6] lg:text-[18px]">
            Seraj by ONEIC Media is the Sultanate&apos;s most ambitious
            out-of-home advertising company. We hold exclusive contracts across
            six key Regional Governorates — turning streets, rooftops and
            highways into the largest brand stage in Oman.
          </p>
        </div>
      </div>
    </section>
  )
}
