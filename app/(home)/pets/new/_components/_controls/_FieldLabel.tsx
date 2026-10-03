export default function FieldLabel({
	children,
	required = false,
}: {
	children: React.ReactNode
	required?: boolean
}) {
	return (
		<span className="mb-1.5 block text-xs font-semibold text-(--color-primary-text)">
			{children}
			{required && (
				<span className="ml-0.5 text-(--color-primary-blue)">*</span>
			)}
		</span>
	)
}