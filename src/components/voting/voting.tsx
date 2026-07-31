import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { VotingConfirmDialog } from "@/components/voting/voting-confirm-dialog";

const votingOptions = [
	{ id: "A", title: "Pilih jika anda menyukai Tim A" },
	{ id: "B", title: "Pilih jika anda menyukai Tim B" },
	{ id: "C", title: "Pilih jika anda menyukai Tim C" },
	{ id: "D", title: "Pilih jika anda menyukai Tim D" },
	{ id: "E", title: "Pilih jika anda menyukai Tim E" },
];

export function VotingCard({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [selected, setSelected] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const selectedOption = votingOptions.find((o) => o.id === selected) ?? null;

	const handleSubmitClick = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selected) return;
		setDialogOpen(true);
	};

	const handleConfirm = async () => {
		setIsSubmitting(true);
		// TODO: submit vote logic
		await new Promise((r) => setTimeout(r, 1200)); // placeholder delay
		setIsSubmitting(false);
		setDialogOpen(false);
	};

	const handleCancel = () => {
		if (isSubmitting) return;
		setDialogOpen(false);
	};

	return (
		<>
			<div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
				<Card className="w-full">
					<CardHeader className="pb-4">
						<CardTitle
							className="text-3xl font-bold tracking-tight"
							style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
						>
							Juara Favorit Warga
						</CardTitle>
						<CardDescription className="text-base text-muted-foreground leading-relaxed mt-1">
							Silakan pilih nasi goreng favorit Anda berdasarkan kriteria Lomba
							Nasi Goreng Perumahan Nogotirto V. Pilih satu opsi di bawah.
						</CardDescription>
					</CardHeader>

					<CardContent className="pt-0">
						<form onSubmit={handleSubmitClick} suppressHydrationWarning>
							{/* 5-option voting grid */}
							<div className="grid grid-cols-1 sm:grid-cols-5 gap-5 mb-8">
								{votingOptions.map((option) => {
									const isSelected = selected === option.id;
									return (
										<button
											key={option.id}
											type="button"
											onClick={() => setSelected(option.id)}
											className={cn(
												"relative flex flex-col gap-4 p-6 min-h-44 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer select-none",
												"hover:shadow-xl hover:-translate-y-1.5",
												isSelected
													? "border-primary bg-primary/5 shadow-xl shadow-primary/20 ring-2 ring-primary/30"
													: "border-border bg-card hover:border-primary/40"
											)}
											aria-pressed={isSelected}
										>
											{/* Badge */}
											<span
												className={cn(
													"inline-flex items-center justify-center w-12 h-12 rounded-full text-base font-bold shrink-0 transition-colors duration-200",
													isSelected
														? "bg-primary text-primary-foreground"
														: "bg-muted text-muted-foreground"
												)}
											>
												{option.id}
											</span>

											{/* Title */}
											<span
												className={cn(
													"text-base font-semibold leading-snug transition-colors duration-200",
													isSelected ? "text-primary" : "text-foreground"
												)}
											>
												{option.title}
											</span>
										</button>
									);
								})}
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={!selected}
								className={cn(
									"w-full py-4 px-4 rounded-xl font-semibold text-base tracking-wide transition-all duration-200",
									selected
										? "bg-foreground text-background hover:bg-foreground/85 shadow-md cursor-pointer"
										: "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
								)}
							>
								Kirim Vote Saya
							</button>

							{/* Footer note */}
							<p className="mt-4 text-center text-xs text-muted-foreground">
								Satu suara per sesi • Anonim • Hasil real-time
							</p>
						</form>
					</CardContent>
				</Card>
			</div>

			{/* Confirm Dialog */}
			<VotingConfirmDialog
				open={dialogOpen}
				option={selectedOption}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
				isLoading={isSubmitting}
			/>
		</>
	);
}
