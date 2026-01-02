import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

				{/* Logo and Brand Name */}
				<div className="flex-shrink-0 flex items-center">
					<Link to="/" className="flex items-center gap-3">
						<img
							className="h-10 w-10 rounded-lg shadow-md shadow-sky-700/40"
							src="/favicon.png"
							alt="Hatchway Logo"
						/>
						<div className="flex flex-col leading-tight">
							<h1 className="text-lg font-semibold tracking-tight text-slate-50">Hatchway</h1>
							<p className="text-xs text-slate-400">Hatch a founder</p>
						</div>
					</Link>
				</div>

				{/* Navigation Links */}
				<nav className="flex items-center gap-5 text-sm font-medium">
					<Link
						to="/"
						className="text-slate-200 hover:text-sky-300 transition-colors"
					>
						Home
					</Link>
					<Link
						to="/try"
						className="inline-flex items-center rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-sm shadow-sky-500/50 transition-transform transition-colors hover:bg-sky-400 hover:-translate-y-0.5"
					>
						Try it
					</Link>
				</nav>
			</div>
		</header>
	);
}