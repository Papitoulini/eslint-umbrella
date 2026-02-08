export const value = 1;

export async function getValue(): Promise<number> {
	await Promise.resolve();
	return value;
}