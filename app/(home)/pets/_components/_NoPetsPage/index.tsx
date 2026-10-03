
import { Button, Typography } from "@heroui/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import Features from "./_Features";
import GettingStarted from "./_GettingStarted";

export default function NoPetsPage () {
  return (
     <div className="flex flex-col gap-1 items-center justify-items-center h-full w-full">

        <Typography type="h2" className="font-bold">Your pets, all in one place</Typography>
        <Typography className="text-base text-(--color-secondary-text)">Keep their health and important records organized</Typography>
        <Button className="rounded-2xl w-36 mt-1 bg-(--color-primary-purple) hover:bg-accent">
            <Plus fill="white"/><span className="text-sm">Add a Pet</span>
        </Button>
        <Image
            width={400}
            height={200}
            src="/BackgroundLoadingImage.png"
            alt="Background"
            priority
            className="md:w-96"
            style={{ objectFit: 'contain' }}
        />
        <Typography type="h5" className="pt-2 font-bold">Everything you need for their care</Typography>
        <Features />
        <GettingStarted />
    </div>
  )
}
