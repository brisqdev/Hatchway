import { FileText } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Privacy() {
	return (
		<div className="mx-auto max-w-4xl px-4 pb-12 pt-10 lg:pt-12">
			<Card className="border-slate-800/80 bg-slate-950/85">
				<CardHeader className="flex flex-row items-start gap-3">
					<div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
						<FileText className="h-4 w-4" />
					</div>
					<div>
						<CardTitle className="text-base font-semibold text-slate-50">Privacy Policy</CardTitle>
						<CardDescription className="text-xs text-slate-400">
							Last updated: Jan 2, 2026
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="space-y-4 text-sm text-slate-200">
					<p>
						This Privacy Policy describes how the Hatchway prototype experiences handle information in this
							interface. Because this is an early-stage hackathon prototype, it is designed to avoid
							collecting or storing personal data wherever possible.
					</p>

					<section className="space-y-2">
						<h2 className="text-sm font-semibold text-slate-50">What this prototype does</h2>
						<ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
							<li>Inputs on the Try It page are used only to render on-screen mock results.</li>
							<li>No production databases or external analytics are wired to this interface.</li>
							<li>No AI calls are made from the UI at this stage of development.</li>
						</ul>
					</section>

					<section className="space-y-2">
						<h2 className="text-sm font-semibold text-slate-50">Future Gemini usage</h2>
						<p className="text-xs text-slate-300">
							In a future implementation, Hatchway may call{' '}
							<span className="font-semibold">Gemini 2.5 Flash</span> via the{' '}
							<span className="font-semibold">Google Gemini API</span> to suggest conferences, meetups,
							and pitch opportunities based on your inputs.
						</p>
						<p className="text-xs text-slate-300">
							Any such use would need to comply with Google's policies and terms for the Gemini API,
							including the{' '}
							<a
								href="https://ai.google.dev/gemini-api/docs/usage-policies"
								target="_blank"
								rel="noreferrer"
								className="text-teal-300 hover:text-teal-200"
							>
								usage policies
							</a>{' '}
							and the{' '}
							<a
								href="https://ai.google.dev/gemini-api/terms"
								target="_blank"
								rel="noreferrer"
								className="text-teal-300 hover:text-teal-200"
							>
								Gemini API terms
							</a>
							.
						</p>
					</section>

					<section className="space-y-2">
						<h2 className="text-sm font-semibold text-slate-50">Data minimization</h2>
						<ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
							<li>
								Any future production version would be designed to collect only the minimum data needed to
								operate the product.
							</li>
							<li>Inputs would not be sold or shared for advertising without explicit consent.</li>
							<li>
								Access controls and logging would be used to protect any stored information in line with
								standard security practices.
							</li>
						</ul>
					</section>

					<section className="space-y-2">
						<h2 className="text-sm font-semibold text-slate-50">Prototype-only disclaimer</h2>
						<p className="text-xs text-slate-300">
							This interface is a design prototype for hackathon evaluation and does not create any legal
							relationship, warranty, or obligation between you and the creators of Hatchway.
						</p>
					</section>
				</CardContent>
			</Card>
		</div>
	)
}
