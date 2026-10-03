import type { ReactNode } from "react"

type PageContainerProps = {
	title: string
	description?: string
	children?: ReactNode
}

export default function PageContainer({
	title,
	description,
	children,
}: PageContainerProps) {
	return (
		
		<div className=" w-full max-w-7xl space-y-6">
			<header className="space-y-1">
					<h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
				{description ? <p className="text-muted">{description}</p> : null}
			</header>
			{children}
		</div>
	)
}
