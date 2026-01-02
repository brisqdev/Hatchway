import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Link as RouterLink } from 'react-router-dom'
import { ShieldCheck, FileText, Link as LinkIcon, AlertTriangle, CalendarClock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function TryIt() {
	return (
		<div className="mx-auto max-w-6xl px-4 pb-12 pt-10 lg:pt-12">
			<div className="flex flex-col gap-10 lg:flex-row">
				<div className="flex-1 space-y-6">
					<div className="space-y-2">
						<h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
							Try Hatchway
						</h1>
						<p className="max-w-xl text-sm text-slate-300 md:text-base">
							Sketch how your app shows up in the world. Fill in a few details and preview how a
								future Gemini-powered scout could surface venues, meetups, and pitch moments.
						</p>
					</div>

					<Card className="border-slate-800/80 bg-slate-950/80">
						<CardHeader>
							<CardTitle className="text-sm font-semibold text-slate-50">
								Your app
							</CardTitle>
							<CardDescription className="text-xs text-slate-400">
								No data is sent anywhere in this prototype. The fields below exist purely to show the
									intended flow.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-1.5 text-sm">
								<label htmlFor="app-name" className="text-slate-200">
									App name
								</label>
								<Input
									id="app-name"
									placeholder="e.g. Hatchline, Signalboard"
								/>
							</div>
							<div className="space-y-1.5 text-sm">
								<label htmlFor="app-description" className="text-slate-200">
									Short description
								</label>
								<textarea
									id="app-description"
									rows={4}
									placeholder="Describe what you are building and who it serves."
									className="min-h-[120px] w-full resize-none rounded-xl border border-slate-800/80 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/60 placeholder:text-slate-500"
								/>
							</div>
							<div className="space-y-1.5 text-sm">
								<label htmlFor="city" className="text-slate-200">
									City
								</label>
								<Input id="city" placeholder="e.g. Toronto, New York, Nairobi" />
							</div>
						</CardContent>
						<CardFooter className="flex items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
							<p className="text-[11px] text-slate-400">
								In a full build, this section would call Gemini 2.5 Flash via the Google Gemini API
									to suggest opportunities.
							</p>
							<Button variant="primary" size="md">
								Generate matches
							</Button>
						</CardFooter>
					</Card>
				</div>

				<div className="mt-4 flex-1 lg:mt-0 lg:max-w-sm">
					<div className="relative">
						<div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/40 via-slate-900 to-transparent opacity-80 blur-xl" />
						<div className="rounded-3xl border border-sky-500/50 bg-slate-950/95 p-5 shadow-xl shadow-sky-900/70">
							<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">
								<ShieldCheck className="h-4 w-4" />
								<span>Privacy & terms</span>
							</div>
							<p className="mt-2 text-[11px] text-slate-300">
								Before any AI response is shown, you will be asked to confirm both our Privacy
									Policy and Terms of Service.
							</p>

							<div className="mt-4 space-y-3 text-xs text-slate-200">
								<div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/70 px-3 py-2.5">
									<FileText className="mt-0.5 h-4 w-4 text-sky-300" />
									<div className="space-y-1">
										<div className="flex items-center justify-between gap-2">
											<p className="font-medium text-slate-50">Privacy Policy</p>
											<span className="text-[10px] text-slate-400">Last updated: Jan 2, 2026</span>
										</div>
										<p className="text-[11px] text-slate-300">
											In production, data collection would be minimized and used only to provide the
												service, with no resale of prompts or outputs.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/70 px-3 py-2.5">
									<ShieldCheck className="mt-0.5 h-4 w-4 text-sky-300" />
									<div className="space-y-1">
										<div className="flex items-center justify-between gap-2">
											<p className="font-medium text-slate-50">Terms of Service</p>
											<span className="text-[10px] text-slate-400">Last updated: Jan 2, 2026</span>
										</div>
										<p className="text-[11px] text-slate-300">
											This prototype UI is provided "as is" without warranty. Users remain responsible for
												how they act on any suggested venues or materials.
										</p>
									</div>
								</div>
							</div>

							<div className="mt-4 space-y-2 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-3 text-[11px] text-slate-300">
								<div className="flex items-start gap-2">
									<AlertTriangle className="mt-0.5 h-3.5 w-3.5 text-amber-300" />
									<p>
										This interface is designed around <span className="font-semibold">Gemini 2.5 Flash</span> accessed via the <span className="font-semibold">Google Gemini API</span>. Any eventual
											deployment would need to comply with Google's usage policies and terms.
									</p>
								</div>
								<div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-sky-200">
									<a
										href="https://ai.google.dev/gemini-api/docs"
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center gap-1 hover:text-sky-100"
									>
										<LinkIcon className="h-3.5 w-3.5" />
										<span>Gemini API docs</span>
									</a>
									<a
										href="https://ai.google.dev/gemini-api/docs/usage-policies"
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center gap-1 hover:text-sky-100"
									>
										<LinkIcon className="h-3.5 w-3.5" />
										<span>Gemini usage policies</span>
									</a>
									<a
										href="https://ai.google.dev/gemini-api/terms"
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center gap-1 hover:text-sky-100"
									>
										<LinkIcon className="h-3.5 w-3.5" />
										<span>Gemini API terms</span>
									</a>
								</div>
							</div>

							<div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3 text-[11px] text-slate-200">
								<p className="font-semibold text-slate-100">
									Before viewing AI-style results
								</p>
								<div className="space-y-2">
									<label className="flex items-center gap-2">
										<Checkbox.Root className="flex h-4 w-4 items-center justify-center rounded border border-slate-600 bg-slate-950 data-[state=checked]:border-sky-400 data-[state=checked]:bg-sky-500">
											<Checkbox.Indicator className="text-slate-950">
												<ShieldCheck className="h-3 w-3" />
											</Checkbox.Indicator>
										</Checkbox.Root>
										<span>I confirm I have read and agree to the Privacy Policy.</span>
									</label>
									<label className="flex items-center gap-2">
										<Checkbox.Root className="flex h-4 w-4 items-center justify-center rounded border border-slate-600 bg-slate-950 data-[state=checked]:border-sky-400 data-[state=checked]:bg-sky-500">
											<Checkbox.Indicator className="text-slate-950">
												<ShieldCheck className="h-3 w-3" />
											</Checkbox.Indicator>
										</Checkbox.Root>
										<span>I confirm I have read and agree to the Terms of Service.</span>
									</label>
								</div>
								<p className="mt-1 text-[10px] text-slate-500">
									In this prototype the checkboxes are visual only and do not gate any behaviour.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<section className="mt-10 space-y-4">
				<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
					<div>
						<h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
							Prototype results
						</h2>
						<p className="mt-1 text-sm text-slate-300">
							Static mock results for conferences, meeting places, and pitch decks. Content is
								illustrative only.
						</p>
					</div>
					<RouterLink
						to="/"
						className="text-xs font-medium text-sky-200 hover:text-sky-100"
					>
						Back to home
					</RouterLink>
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
					<ResultCard
						typeLabel="Meetup"
						title="Indie Builders Espresso Club"
						city="New York, USA"
						matchScore="8.4 / 10 match"
						imageUrl="https://images.pexels.com/photos/1181567/pexels-photo-1181567.jpeg?auto=compress&cs=tinysrgb&w=1200"
						dateRange="First Thursday of every month"
						slotDetails="Small roundtable in a downtown cafe with founders trading product demos and intros."
					/>
					<ResultCard
						typeLabel="Pitch deck session"
						title="Seed-stage remote pitch review"
						city="Virtual"
						matchScore="8.9 / 10 match"
						imageUrl="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200"
						dateRange="Rolling office hours, next window in November 2026"
						slotDetails="Partner office hours focusing on storytelling, traction slides, and realistic roadmaps."
					/>
				</div>
			</section>
		</div>
	)
}

type ResultCardProps = {
	typeLabel: string
	title: string
	city: string
	matchScore: string
	imageUrl: string
	dateRange: string
	slotDetails: string
}

function ResultCard({ typeLabel, title, city, matchScore, imageUrl, dateRange, slotDetails }: ResultCardProps) {
	return (
		<Card className="flex h-full flex-col overflow-hidden border-slate-800/80 bg-slate-950/80">
			<div className="relative h-32 w-full overflow-hidden">
				<img src={imageUrl} alt={title} className="h-full w-full object-cover" />
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
					<p className="text-[11px] font-semibold text-emerald-300">{matchScore}</p>
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
									<p className="pt-1 text-slate-400">
										In a full implementation, this modal would include calendar integration and precise
											time slots. Here it is static copy only.
									</p>
								</div>
							</Dialog.Content>
						</Dialog.Portal>
						</Dialog.Root>
					</div>
				</CardContent>
			</Card>
	)
}
