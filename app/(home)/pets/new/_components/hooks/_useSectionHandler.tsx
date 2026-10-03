import { HeartPulse, Syringe, FileText, Check } from "lucide-react"
import React, { useState } from "react"

type Section = "Basic info" | "Vaccines" | "Conditions" | "Documents" | "Finish"

export const sections: Section[] = [
	"Basic info",
	"Vaccines",
	"Conditions",
	"Documents",
	"Finish",
]
export const sectionIcons = [HeartPulse, Syringe, HeartPulse, FileText, Check]

const useSectionHandler = () => {
	const [activeSection, setActiveSection] = useState(0)

	const goNext = () => {
		if (activeSection < sections.length - 1)
			setActiveSection((step) => step + 1)
	}

	const goBack = () => {
		if (activeSection > 0) setActiveSection((step) => step - 1)
	}

	return {
		activeSection,
		setActiveSection,
		goBack,
		goNext,
		sections,
	}
}

export default useSectionHandler
