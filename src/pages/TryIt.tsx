"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CalendarClock } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function TryIt() {
	// Gemini Call Function
	async function geminiCall(name: string, description: string, city: string) {
		try {
			setButtonDisabled(true);
			setButtonSpinner(true);

			const res = await fetch(
				"https://hatchway-b55ns56k4f2c.brisqdev.deno.net/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						appName: name,
						appDescription: description,
						city,
					}),
				}
			);

			if (!res.ok) throw new Error(`HTTP ${res.status}`);

			const data = await res.json();
			console.log("Success:", data);
		} catch (err) {
			console.error("Error:", err);
		} finally {
			setButtonVariantPrimary(true);
			setButtonDisabled(false);
			setButtonSpinner(false);
		}
	}


	// Placeholder state for fields
	const [appName, setAppName] = useState("");
	const [appDescription, setAppDescription] = useState("");
	const [largeCity, setLargeCity] = useState("");

	// Check for fields... filled
	const responseClick: boolean =
		appName.trim().length > 0 &&
		appDescription.trim().length > 0 &&
		largeCity.trim().length > 0;

	// Button UI fields
	const [buttonVariantPrimary, setButtonVariantPrimary] = useState(true);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [buttonSpinner, setButtonSpinner] = useState(false);

	return (
		<div className="mx-auto max-w-6xl px-4 pb-12 pt-10 lg:pt-12">
			<div className="flex flex-col gap-10 lg:flex-row">
				<div className="flex-1 space-y-6">
					<div className="space-y-2">
						<h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
							Hatchway Interface
						</h1>
					</div>

					<Card className="border-slate-800/80 bg-slate-950/80 pd-100 shadow-sm shadow-slate-950/60">
						<CardHeader>
							<CardTitle className="text-sm font-semibold text-slate-50">
								Tell Us About Your Product
							</CardTitle>
							<CardDescription className="text-xs text-slate-400">
								This will better tailor AI results to your product.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4.5">
							<div className="space-y-1.5 text-sm">
								<label htmlFor="app-name" className="text-slate-200 ml-1">
									App name
								</label>
								<Input
									className="mt-2"
									id="app-name"
									placeholder="e.g. Hatchline, Signalboard"
									value={appName}
									onChange={(e) => setAppName(e.target.value)}
								/>
							</div>
							<div className="space-y-1.5 text-sm">
								<label
									htmlFor="app-description"
									className="text-slate-200 ml-1"
								>
									Short description
								</label>
								<textarea
									id="app-description"
									rows={4}
									placeholder="Describe what you are building and who it serves."
									value={appDescription}
									onChange={(e) => setAppDescription(e.target.value)}
									className="mt-2 min-h-[120px] w-full resize-none rounded-xl border border-slate-800/80 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/60 placeholder:text-slate-500"
								/>
							</div>
							<div className="space-y-1.5 text-sm">
								<label htmlFor="city" className="text-slate-200 ml-1">
									Closest Large City
								</label>
								<Input
									id="city"
									placeholder="e.g. Toronto, New York, San Francisco"
									className="mt-2"
									value={largeCity}
									onChange={(e) => setLargeCity(e.target.value)}
								/>
							</div>
						</CardContent>
						<CardFooter className="flex items-center justify-between gap-4 border-t border-slate-800/100 pt-4 -space-y-3.5">
							<p className="text-[12px] text-slate-400">
								By generating matches, you agree to our{" "}
								<a className="font-semibold" href="/privacy">
									Privacy Policy
								</a>{" "}
								and{" "}
								<a className="font-semibold" href="/terms">
									Terms of Service
								</a>
								.
							</p>
							<Button
								variant={buttonVariantPrimary ? (responseClick ? "primary" : "secondary") : "secondary"}
								disabled={buttonDisabled ? true : !responseClick}
								size="md"
								className="-mb-4"
								onClick={() => {
									setButtonVariantPrimary(false);
									setButtonDisabled(true);
									setButtonSpinner(true);

									geminiCall(
										appName.trim(),
										appDescription.trim(),
										largeCity.trim());
								}}
							>
								{buttonSpinner ? <Spinner /> : ""} Generate Matches
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>

			<section className="mt-10 space-y-4">
				<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
					<div>
						<h2 className="text-md font-semibold uppercase tracking-[0.18em] text-sky-200">
							Results
						</h2>
					</div>
				</div>

				<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					<ResultCard
						typeLabel="Conference"
						title="Founders in the North Summit"
						city="Toronto, Canada"
						matchScore="9.1 / 10 match"
						imageUrl="https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=1200"
						dateRange="October 17-19, 2026"
						slotDetails="Early-stage SaaS and devtools track, 15-minute lightning pitches plus office hours."
					/>
				</div>
			</section>
		</div>
	);
}

type ResultCardProps = {
	typeLabel: string;
	title: string;
	city: string;
	matchScore: string;
	imageUrl: string;
	dateRange: string;
	slotDetails: string;
};

function ResultCard({
	typeLabel,
	title,
	city,
	matchScore,
	imageUrl,
	dateRange,
	slotDetails,
}: ResultCardProps) {
	return (
		<Card className="flex h-full flex-col overflow-hidden border-slate-800/80 bg-slate-950/80">
			<div className="relative h-32 w-full overflow-hidden">
				<img
					src={imageUrl}
					alt={title}
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
				<div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-200">
					{typeLabel}
				</div>
			</div>
			<CardContent className="flex flex-1 flex-col justify-between gap-3 px-4 pb-4 pt-3">
				<div className="space-y-1.5">
					<p className="text-[11px] font-medium text-sky-200">{city}</p>
					<h3 className="text-sm font-semibold text-slate-50">{title}</h3>
					<p className="text-xs text-slate-400">{slotDetails}</p>
				</div>
				<div className="flex items-center justify-between pt-1">
					<p className="text-[11px] font-semibold text-emerald-300">
						{matchScore}
					</p>
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<button className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-slate-100 transition hover:border-sky-400 hover:text-sky-100">
								<CalendarClock className="h-3.5 w-3.5" />
								<span>View schedule</span>
							</button>
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Overlay className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" />
							<Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-700 bg-slate-950/95 p-5 shadow-xl shadow-slate-950/80">
								<div className="flex items-start justify-between gap-3">
									<div>
										<Dialog.Title className="text-sm font-semibold text-slate-50">
											{title}
										</Dialog.Title>
										<Dialog.Description className="mt-1 text-xs text-slate-300">
											{city}
										</Dialog.Description>
									</div>
									<Dialog.Close asChild>
										<button className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300 hover:border-sky-500 hover:text-sky-100">
											Close
										</button>
									</Dialog.Close>
								</div>
								<div className="mt-3 space-y-2 text-[11px] text-slate-300">
									<p className="font-semibold text-sky-200">Date & time</p>
									<p>{dateRange}</p>
								</div>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</div>
			</CardContent>
		</Card>
	);
}
