
import { MoveRight } from "lucide-react";


export const WorkFlowNode =({ order, title, subtitle, color }: {order: string, color: string, title: string, subtitle: string}) =>{
    return (
        <div className="flex gap-3 content-center ">
            <div className={` w-9 h-9 content-center bg-(${color}) text-center text-white rounded-4xl`}>
                <span className="text-sm">{order}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold">{title}</span>
                <span className="text-xs text-(--color-muted-text)">{subtitle}</span>

            </div>
        </div>
    )
}
 
export default function GettingStarted() {
  return (
     <div className="mt-2 md:mt-6 flex flex-col">
        <span className="text-sm font-bold text-(--color-secondary-text) pb-3">GET STARTED</span>
        <div className="w-full pb-8 flex flex-row gap-7 justify-center items-center">
            <WorkFlowNode 
                order="1" title="Add your Pet" subtitle="Create their profile" 
                color="--color-secondary-purple"   
            />
            <MoveRight className="text-(--color-muted-text)" />
            <WorkFlowNode 
                order="2" title="Add their Information" subtitle="Health, Vaccines, and more" 
                color="--color-muted-text"   
            />
            <MoveRight className="text-(--color-muted-text)" />
            <WorkFlowNode 
                order="3" title="Start Tracking" subtitle="Keep Everything up to date"
                color="--color-muted-text" 
            />
        </div> 
    </div>
  )
}
