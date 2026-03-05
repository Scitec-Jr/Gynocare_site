"use client";

import { useState } from "react";
import Testimonial from "./Testimonial";
import TestimonialForm from "./TestimonialForm";
import Carousel from "./Carousel";

export default function TestimonialFormWrapper() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const handleSuccess = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<>
			<Carousel>
				<Testimonial refreshKey={refreshKey} />
			</Carousel>

			<button
				onClick={() => setIsFormOpen(true)}
				className="block w-fit mx-auto py-2 px-4 md:py-4 bg-(--main-color) md:text-xl text-white title rounded-full md:rounded-xl hover:opacity-90 transition cursor-pointer"
			>
				Avaliar
			</button>

			<TestimonialForm
				isOpen={isFormOpen}
				onClose={() => setIsFormOpen(false)}
				onSuccess={handleSuccess}
			/>
		</>
	);
}
