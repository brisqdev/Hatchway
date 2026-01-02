import { Scale } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Terms() {
	return (
		<div className="mx-auto max-w-4xl px-4 pb-12 pt-10 lg:pt-12">
			<Card className="border-slate-800/80 bg-slate-950/85">
				<CardHeader className="flex flex-row items-start gap-3">
					<div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
						<Scale className="h-4 w-4" />
					</div>
					<div>
						<CardTitle className="text-base font-semibold text-slate-50">Terms of Service</CardTitle>
						<CardDescription className="text-xs text-slate-400">
							Last updated: Jan 2, 2026
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="space-y-4 text-sm text-slate-200">
					<p>
						These Terms of Service apply to your use of the Hatchway prototype interface. Because this is an
							experimental project submitted to the Hacks for Hackers Hackathon, it is provided solely for
							exploration and feedback.
					</p>

					<section className="space-y-2">
						<h2 className="text-sm font-semibold text-slate-50">No production guarantees</h2>
						<ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
							<li>
								The prototype is provided "as is" without any warranty, support, or uptime commitment.
							</li>
							<li>
								You should not rely on the mock results to make financial, legal, or other high-impact
								decisions.
							</li>
							<li>
								Any future production service would ship with its own dedicated and more detailed terms.
							</li>
						</ul>
					</section>

					<section className="space-y-2">
						<h2 className="text-sm font-semibold text-slate-50">Use of AI services</h2>
						<p className="text-xs text-slate-300">
							The eventual product vision involves using{' '}
							<span className="font-semibold">Gemini 2.5 Flash</span> via the{' '}
							<span className="font-semibold">Google Gemini API</span> to suggest events and opportunities.
						</p>
						<p className="text-xs text-slate-300">
							Any such use would have to comply with Google's{' '}
							<a
								href="https://ai.google.dev/gemini-api/docs/usage-policies"
								target="_blank"
								rel="noreferrer"
								className="text-teal-300 hover:text-teal-200"
							>
								usage policies
							</a>{' '}
							and{' '}
							<a
								href="https://ai.google.dev/gemini-api/terms"
								target="_blank"
								rel="noreferrer"
								className="text-teal-300 hover:text-teal-200"
							>
								Gemini API terms
							</a>
							, and nothing in this prototype is intended to override those obligations.
						</p>
					</section>

					<section className="space-y-2">
						<h2 className="text-sm font-semibold text-slate-50">Your responsibilities</h2>
						<ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
							<li>You remain responsible for the content you choose to share or present about your app.</li>
							<li>
								You are solely responsible for complying with any event, venue, or local regulations when
								attending conferences or meetups surfaced by future versions of Hatchway.
							</li>
							<li>
								You agree not to use the prototype for unlawful, harmful, or abusive purposes.
							</li>
						</ul>
					</section>

					<section className="space-y-2">
						<h2 className="text-sm font-semibold text-slate-50">Limitation of liability</h2>
						<p className="text-xs text-slate-300">
							To the maximum extent permitted by applicable law, the creators of Hatchway are not liable for
							any loss or damage arising from your use of this prototype or reliance on its mock outputs.
						</p>
					</section>

					<section className="space-y-2">
						<h2 className="text-sm font-semibold text-slate-50">Prototype-only notice</h2>
						<p className="text-xs text-slate-300">
							This interface is not a commercial product. Participating in testing or providing feedback does
							not create any partnership, employment, or vendor relationship.
						</p>
					</section>
				</CardContent>
			</Card>
		</div>
	)
}
