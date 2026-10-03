import Image from "next/image"
import Login from "./_components/_Login"
import Sideboard from "./_components/_Sideboard"
import { Suspense } from "react"

export default function LoginPage() {
	return (
		<div className="flex w-full h-full bg-background">
			<Image
				src={"/ApplicationBackground.png"}
				alt="Global background"
				className="object-cover"
				objectFit="cover"
				fill
			/>
			<Suspense>
				<Login />
			</Suspense>
			<Sideboard />
		</div>
	)
}
