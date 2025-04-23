import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { Navbar } from "./components/Navbar/index.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<main className="w-full min-h-screen">
			<div className="mx-auto max-w-6xl space-y-4 px-4 py-4 lg:px-0 pt-16 pb-16">
				<Navbar />
				<App />
			</div>
		</main>
	</StrictMode>,
);
