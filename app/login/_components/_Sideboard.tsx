import { Separator, Typography } from "@heroui/react"
import Image from "next/image"
import CatchySlogan from "../../../public/CatchyPhrase.svg"


export default function Sideboard ()  {
  return (
     <div className="p-5 relative flex flex-col w-90 h-full max-sm:hidden max-md:hidden max-md:w-70 md:w-80 lg:w-96 xl:w-120 3xl:w-150 bg-(--color-primary-purple) justify-center items-center ">
            <Image className="lg:w-9/12" src={CatchySlogan} width={300} height={300} alt="The newest children are pets" />
            <Separator orientation="horizontal" className="w-10/12 mt-10" />
            <Typography className="pt-4 text-white text-sm w-10/12 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.
            </Typography>
        </div>
  )
}
