import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<div className="relative">
			<div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-sky-500/20 via-slate-900/0 to-transparent" />
			<section className="mx-auto flex max-w-6xl flex-col items-start gap-12 px-4 pb-12 pt-10 lg:flex-row lg:items-center lg:pt-14">
				<div className="flex-1 space-y-6">
					<p className="inline-flex items-center rounded-full border border-sky-500/40 bg-slate-900/80 px-3 py-1 text-xs font-medium text-sky-200 shadow-sm shadow-sky-700/40">
						For the `Hacks for Hackers` Hackathon
					</p>
					<div className="space-y-3">
						<h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
							Hatchway
						</h1>
						<p className="text-lg font-medium text-sky-200">Hatch a founder.</p>
						<p className="max-w-xl text-sm text-slate-300 md:text-base">
							A Copilot that helps early-stage founders discover the right rooms, runways, and stages to share their ideas with the world.
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-4">
						<Button asChild variant="primary" size="lg">
							<Link to="/try">Try it now</Link>
						</Button>
						<p className="text-sm font-medium text-sky-200">
							Find a place for YOUR product!
						</p>
					</div>
				</div>

				<div className="flex-1">
					<div className="relative mx-auto max-w-sm rounded-3xl border border-sky-500/40 bg-slate-950/60 p-6 shadow-xl shadow-sky-900/60">
						<div className="absolute -left-6 -top-6 h-16 w-16 rounded-3xl bg-sky-500/20 blur-xl" />
						<div className="relative flex items-center gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-600 shadow-lg shadow-sky-800/60">
								<img
									className="h-10 w-10 rounded-xl"
									src="/favicon.png"
									alt="Hatchway logo"
								/>
							</div>
							<div className="space-y-1">
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
									Founder pipeline
								</p>
								<p className="text-sm font-medium text-slate-50">
									Map your path from idea to stage-ready pitch.
								</p>
								<p className="text-xs text-slate-400">
									Uses Google Gemini to supercharge your product with AI.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto mt-2 max-w-6xl px-4 pb-12">
				<div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
					<div className="rounded-2xl border border-slate-600/80 bg-slate-950/70 p-6 shadow-sm shadow-slate-950/60">
						<h2 className="text-lg font-semibold text-slate-50">About the project</h2>
						<p className="mt-3 text-sm text-slate-300">
							Hatchway is a founder-facing dashboard: describe your product and where you are based, and viola - our AI-powered interface provides you with a tailored set of conferences, meetups, and pitch moments that align with your story.
						</p>
					</div>
					<div className="rounded-2xl border border-sky-700/40 bg-sky-500/10 p-6 shadow-sm shadow-sky-900/60">
						<h3 className="text-lg font-semibold text-sky-100">`Hacks for Hackers` hackathon</h3>
						<p className="mt-3 text-sm text-slate-100">
							Hatchway is a submission to the `Hacks for Hackers` hackathon. Deeply inspired with the challenges that many founders face when trying to find an audience for their product, we decided to build a tool that leverages AI features to provide founders with the perfect interface to discover events and pitch opportunities that align with their product vision.
						</p>
					</div>
				</div>
			</section>

			<section className="mx-auto mb-12 max-w-xl px-4">
				<div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 px-6 py-5 shadow-sm shadow-slate-950/60 md:flex-row md:items-center">
					<div>
						<h3 className="text-sm font-semibold text-slate-50">Ready to enhance your product's pitch?</h3>
					</div>
					<Button asChild variant="outline" size="md">
						<Link to="/try">Try Hatchway Now</Link>
					</Button>
				</div>
			</section>
		</div>
	)
}
