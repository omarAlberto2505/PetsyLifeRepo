

import { Card } from '@heroui/react'
import { Carrot, FileText, ScanHeart } from 'lucide-react'

export default function Features() {
  return (
    <div className="w-full pt-2 flex flex-row flex-wrap gap-5 justify-center">
        <Card className="flex-row rounded-xl gap-3 p-5 pr-7 sm:col-span-6 bg-blue-50 border-1 border-blue-300">
            <Card.Header>
                <span className="w-fit rounded-4xl p-2 bg-blue-300">
                    <ScanHeart size={25} className="text-blue-500" />
                </span>
            </Card.Header>
            <Card.Content className="mt-1">
                <p className="text-sm leading-4 font-medium">Health</p>
                <p className="text-xs text-muted w-30">Track exams and conditions</p>
            </Card.Content>
        </Card>

        <Card className="flex-row rounded-xl gap-3 p-5 pr-7 sm:col-span-6 bg-purple-50 border-1 border-purple-300">
            <Card.Header>
                <span className="w-fit rounded-4xl p-2 bg-purple-300">
                    <Carrot size={25} className="text-purple-500" />
                </span>
            </Card.Header>
            <Card.Content className="mt-1">
                <p className="text-sm leading-4 font-medium">Vaccines</p>
                <p className="text-xs text-muted w-30">Never miss vaccinations</p>
            </Card.Content>
        </Card>

        <Card className="flex-row rounded-xl gap-3 p-5 pr-7 sm:col-span-6 bg-green-50 border-1 border-green-300">
            <Card.Header>
                <span className="w-fit rounded-4xl p-2 bg-green-300">
                    <FileText size={25} className="text-green-600" />
                </span>
            </Card.Header>
            <Card.Content className="mt-1">
                <p className="text-sm leading-4 font-medium">Records</p>
                <p className="text-xs text-muted w-30">Keep their medical history</p>
            </Card.Content>
        </Card>
    </div>
  )
}
