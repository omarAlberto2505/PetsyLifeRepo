"use client"
import { ServerError } from "@/types/errors"
import {
  Button,
  Card,
  Checkbox,
  Form,
  InputGroup,
  Label,
  Link,
  Separator,
  TextField,
  toast,
  Typography,
} from "@heroui/react"
import { Eye, HardDrive, LockKeyhole, Mail, MoveRight } from "lucide-react"
import Image from "next/image"
import { useActionState, useEffect } from "react"
import AppsIcon from "../../../public/icon.png"
import { login } from "../../actions/login/actions"
import useReasonSession from "./hooks/_useReasonSession"

export default function Login() {
	const [state, formAction] = useActionState(
		async (_state: ServerError | undefined, formData: FormData) =>
			login(formData),
		undefined,
	)

  	useReasonSession()

	useEffect(() => {
		if (state) {
			toast.danger(state.title, {
				actionProps: {
					children: "Close",
					onPress: () => {},
					variant: "danger",
				},
				description: state.detail,
				indicator: <HardDrive />,
			})
		}
	}, [state])

	return (
		<div className="relative flex flex-col max-sm:w-full flex-1 md:mt-10 max-md:mt-6 xl:mt-5 items-center ">
			<div className="flex flex-col justify-items-center items-center pb-2">
				<Image
					className="flex-1"
					src={AppsIcon}
					loading="eager"
					width={150}
					height={100}
					alt="A dog and a cat cuddling together framed inside a paw"
				/>
				<Typography
					type="h1"
					className="flex-1 text-center text-(--color-primary-text) font-extrabold  3xl:text-6xl"
				>
					Petsy Life
				</Typography>
				<div className="w-40 max-md:w-full text-center text-sm 3xl:text-lg text-(--color-secondary-text) font-semibold">
					One place for every part of their life
				</div>
			</div>
			<Card className="w-100 max-sm:w-90 2xl:w-110 3xl:w-140 p-6 3xl:p-10 mt-4">
				<Card.Header className="mb-2">
					<Typography className="font-extrabold text-2xl 3xl:text-4xl">
						Welcome back!
					</Typography>
					<div className="text-(--color-secondary-text) mt-1 text-sm  3xl:text-lg font-medium">
						Sign in to continue managing your pets' lives
					</div>
				</Card.Header>
				<Form action={formAction}>
					<Card.Content>
						<div className="flex flex-col gap-4">
							<TextField name="email" type="email">
								<Label className="text-sm 3xl:text-lg font-bold">Email</Label>
								<InputGroup>
									<InputGroup.Prefix>
										<Mail className="size-4  3xl:size-6 text-muted" />
									</InputGroup.Prefix>
									<InputGroup.Input
										className="w-full max-w-[280px] 3xl:text-lg"
										placeholder="name@email.com"
									/>
								</InputGroup>
							</TextField>

							<TextField name="password" type="password">
								<Label className="text-sm 3xl:text-lg font-bold">
									Password
								</Label>
								<InputGroup className={""}>
									<InputGroup.Prefix>
										<LockKeyhole className="size-4  3xl:size-6 text-muted" />
									</InputGroup.Prefix>
									<InputGroup.Input
										type="password"
										className="w-full max-w-[380px] 3xl:text-lg"
										placeholder="Enter your password"
									/>
									<InputGroup.Suffix>
										<Eye className="size-4 text-muted 3xl:size-6" />
									</InputGroup.Suffix>
								</InputGroup>
							</TextField>
							<div className="flex mt-2 justify-between items-center">
								<Checkbox name="RememberMe" className={"!border-r-accent"}>
									<Checkbox.Content
										className={"text-xs 3xl:text-lg text-muted-text"}
									>
										<Checkbox.Control>
											<Checkbox.Indicator />
										</Checkbox.Control>
										Remember me
									</Checkbox.Content>
								</Checkbox>
								<Link
									href="/forget-password"
									className={
										"text-xs  3xl:text-lg font-bold text-(--color-primary-purple)"
									}
								>
									Forgot password?
								</Link>
							</div>
						</div>
					</Card.Content>
					<Card.Footer className="mt-2 flex flex-col gap-2 pt-4">
						<Button
							className="w-full text-base  3xl:text-2xl 3xl:p-6 text-center rounded-lg bg-(--color-primary-purple)"
							type="submit"
						>
							Log In{" "}
							<MoveRight className="size-6 text-2xl 3xl:text-4xl text-white" />
						</Button>
						<div className="w-full mt-2 grid grid-cols-5 grid-rows-1 justify-baseline items-baseline gap-0 ">
							<Separator variant="default" className="" />
							<span className="col-span-3 text-xs 3xl:text-lg text-(--color-secondary-text) font-semibold text-center">
								Don't have an account?
								<span className="font-extrabold text-(--color-primary-purple) text-xs  3xl:text-lg">
									{" "}
									Sign Up
								</span>{" "}
							</span>
							<Separator variant="default" className="col-start-5" />
						</div>
					</Card.Footer>
				</Form>
			</Card>
		</div>
	)
}
