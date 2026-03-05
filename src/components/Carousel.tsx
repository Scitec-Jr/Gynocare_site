"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Carousel({ children, leftArrowSrc = "/assets/icons/left-arrow.png", rightArrowSrc = "/assets/icons/right-arrow.png", showDots = true, align = "center" }: any) {

	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align });

	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		if (!emblaApi) return;

		const onSelect = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		};

		emblaApi.on("select", onSelect);
		onSelect();

		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);

	const scrollSnaps = emblaApi?.scrollSnapList() ?? [];

	return (
		<div className="relative w-full my-8 px-12">
			<div ref={emblaRef} className="overflow-hidden">
				<div className="flex">{children}</div>
			</div>

			<button onClick={() => emblaApi?.scrollPrev()} className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer" aria-label="Previous slide">
				<Image src={leftArrowSrc} alt="Previous" width={25} height={25} />
			</button>

			<button onClick={() => emblaApi?.scrollNext()} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" aria-label="Next slide">
				<Image src={rightArrowSrc} alt="Next" width={25} height={25} />
			</button>

			{showDots && (
				<div className="mt-4 flex justify-center gap-2">
					{scrollSnaps.map((_, index) => (
						<button
							key={index}
							onClick={() => emblaApi?.scrollTo(index)}
							className={`
								h-2 w-2 rounded-full transition cursor-pointer
								${index === selectedIndex ? "bg-(--secondary-color)" : "bg-zinc-400"}
							`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}